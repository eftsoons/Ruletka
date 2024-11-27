import { Page } from "@/components/Page";
import { Store } from "@/redux";
import {
  openTelegramLink,
  retrieveLaunchParams,
} from "@telegram-apps/sdk-react";
import { Button, Caption, Snackbar } from "@telegram-apps/telegram-ui";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Channel({
  snackbar,
  setsnackbar,
}: {
  snackbar: JSX.Element;
  setsnackbar: Function;
}) {
  const channel = useSelector((data: Store) => data.channel);

  const dispatch = useDispatch();

  const launchParams = retrieveLaunchParams();

  const navigate = useNavigate();

  return (
    <Page
      back={false}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "1rem",
        justifyContent: "center",
        height: "90%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "1rem",
          justifyContent: "center",
        }}
      >
        <Caption
          weight={"2"}
          style={{
            fontSize: "1.5rem",
            textAlign: "center",
            marginBottom: "1rem",
            color: "black",
            lineHeight: "1.2",
          }}
        >
          Чтобы пользоваться нашим ботом бесплатно, подпишись на каналы наших
          замечательных спонсоров:
        </Caption>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: "10px",
          }}
        >
          {channel &&
            channel.map((data, index) => (
              <Button key={index} onClick={() => openTelegramLink(data.site)}>
                {data.name}
              </Button>
            ))}
        </div>
      </div>
      <Button
        style={{ position: "absolute", width: "95%", bottom: "1.5rem" }}
        onClick={() =>
          axios
            .post(`${import.meta.env.VITE_API_URL}/`, {
              initData: launchParams.initDataRaw,
            })
            .then((response) => {
              const data = response.data;

              if (data != "error" && data.type != "channel") {
                dispatch({ type: "SET_SEGMENTS", payload: data.ruletka });
                dispatch({ type: "SET_BULLET", payload: data.userinfo.bullet });

                navigate("/");
              } else if (data.type == "channel") {
                dispatch({ type: "SET_SNACKBAR", payload: true });
                if (!snackbar) {
                  setsnackbar(
                    <Snackbar
                      style={{ zIndex: "3" }}
                      onClose={() => {}}
                      duration={2000}
                    >
                      Вы не подписались на один из каналов
                    </Snackbar>
                  );

                  setTimeout(() => {
                    setsnackbar(null);
                  }, 2150);
                }
              }
            })
        }
      >
        Проверить подписку
      </Button>
    </Page>
  );
}
