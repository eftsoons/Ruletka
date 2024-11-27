import { Button, Snackbar, Spinner } from "@telegram-apps/telegram-ui";

import { Page } from "@/components/Page.tsx";
import { Roulette } from "@/components/Roulette";
import { Bullet } from "@/components/Bullet";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "@/redux";
import { useEffect, useState } from "react";

import axios from "axios";
import { retrieveLaunchParams } from "@telegram-apps/sdk";
import { useNavigate } from "react-router-dom";

import style from "@/scss/spinner.module.scss";

export const IndexPage = ({
  snackbar,
  setsnackbar,
}: {
  snackbar: JSX.Element;
  setsnackbar: Function;
}) => {
  const [accepted, setAccepted] = useState(true);

  const segments = useSelector((data: Store) => data.segments);
  const bullet = useSelector((data: Store) => data.bullet);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [rotate, setrotate] = useState(0);

  const launchParams = retrieveLaunchParams();

  useEffect(() => {
    if (!accepted) {
      setTimeout(() => {
        setAccepted(true);
      }, 4000);
    }
  }, [accepted]);

  return (
    <Page back={false} style={{ padding: "1rem", height: "100%" }}>
      <Roulette rotate={rotate} />
      <br />
      <Bullet />
      <Button
        stretched={true}
        style={{ marginTop: "1rem" }}
        onClick={() => {
          if (accepted) {
            setAccepted(false);

            axios
              .post(`${import.meta.env.VITE_API_URL}/ruletka`, {
                initData: launchParams.initDataRaw,
              })
              .then((response) => {
                const data = response.data;

                if (data != "error" && data.type != "channel") {
                  const random = Number(data);

                  const vine =
                    360 * 2 + (255 - (360 / segments.length) * random);
                  //console.log(segments[random], random);
                  setrotate(vine);

                  dispatch({ type: "SET_BULLET", payload: bullet - 1 });

                  setTimeout(() => {
                    navigate(`/vin/${segments[random]}`);
                  }, 3100);
                } else if (data.type == "channel") {
                  navigate("/channel");
                  dispatch({
                    type: "SET_CHANNEL",
                    payload: data.channel,
                  });
                } else if (data == "error") {
                  setAccepted(true);
                  if (!snackbar) {
                    setsnackbar(
                      <Snackbar
                        style={{ zIndex: "3" }}
                        onClose={() => {}}
                        duration={2000}
                      >
                        Попыток нет, чтобы получить больше попыток - пригласите
                        друзей 💜
                      </Snackbar>
                    );

                    setTimeout(() => {
                      setsnackbar(null);
                    }, 2150);
                  }
                }
              });
          }
        }}
        before={!accepted && <Spinner className={style.spinner} size={"s"} />}
      >
        {!accepted ? "Подождите" : "Крутить рулетку"}
      </Button>
    </Page>
  );
};
