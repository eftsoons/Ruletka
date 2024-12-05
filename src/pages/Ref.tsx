import { Page } from "@/components/Page";
import { copyToClipboard } from "@/function/copy";
import { Store } from "@/redux";
import Copy from "@/svg/copy";
import { openTelegramLink } from "@telegram-apps/sdk-react";
import { Button } from "@telegram-apps/telegram-ui";
import { useSelector } from "react-redux";

export const Ref = () => {
  const id = useSelector((data: Store) => data.id);

  return (
    <Page
      back={false}
      style={{
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <div
        style={{
          padding: "1rem 2.5rem",
          display: "flex",
          flexDirection: "column",
          //border: "3px solid black",
        }}
      >
        {/*<img
          style={{ width: "80%" }}
          src={!isDark ? "./frends.png" : "./frends2.png"}
        />
        <span
          className={style.reftext}
          style={{
            fontWeight: "600",
            color: "black",
          }}
        >
          приглашай
        </span>
        <span className={style.reftext} style={{ color: "rgb(49,49,49)" }}>
          друзей
        </span>
        <span className={style.reftext} style={{ color: "rgb(49,49,49)" }}>
          получай
        </span>
        <span
          className={style.reftext}
          style={{ fontWeight: "600", color: "black" }}
        >
          билеты
        </span>*/}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          gap: "0.5rem",
        }}
      >
        <Button
          stretched={true}
          onClick={() =>
            openTelegramLink(
              `https://t.me/share/url?url=Привет, я нашел классную рулетку WB, заходи скорее! https://t.me/${
                import.meta.env.VITE_API_USERNAMEBOT
              }?start=${id}`
            )
          }
        >
          Пригласить друга
        </Button>
        <Button
          style={{
            width: "20%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() =>
            copyToClipboard(
              `Привет, я нашел классную рулетку WB, заходи скорее! https://t.me/${
                import.meta.env.VITE_API_USERNAMEBOT
              }?start=${id}`
            )
          }
        >
          <Copy />
        </Button>
      </div>
    </Page>
  );
};
