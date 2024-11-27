import { Button } from "@telegram-apps/telegram-ui";

import { Page } from "@/components/Page.tsx";
import { Roulette } from "@/components/Roulette";
import { Bullet } from "@/components/Bullet";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "@/redux";
import { useState } from "react";

import axios from "axios";
import { retrieveLaunchParams } from "@telegram-apps/sdk";
import { useNavigate } from "react-router-dom";

export const IndexPage = () => {
  const segments = useSelector((data: Store) => data.segments);
  const bullet = useSelector((data: Store) => data.bullet);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [rotate, setrotate] = useState(0);

  const launchParams = retrieveLaunchParams();

  return (
    <Page back={false} style={{ padding: "1rem", height: "100%" }}>
      <Roulette rotate={rotate} />
      <br />
      <Bullet />
      <Button
        stretched={true}
        style={{ marginTop: "1rem" }}
        onClick={() => {
          axios
            .post(`${import.meta.env.VITE_API_URL}/ruletka`, {
              initData: launchParams.initDataRaw,
            })
            .then((response) => {
              const data = response.data;

              if (data != "error" && data.type != "channel") {
                const random = Number(data);

                const vine = 360 * 2 + (255 - (360 / segments.length) * random);
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
              }
            });
        }}
      >
        Крутить рулетку
      </Button>
    </Page>
  );
};
