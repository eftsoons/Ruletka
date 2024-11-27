import { useLaunchParams } from "@telegram-apps/sdk-react";
import { List, Tabbar, Text } from "@telegram-apps/telegram-ui";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import style from "@/scss/header.module.scss";
import { useSelector } from "react-redux";
import { Store } from "@/redux";
import Add from "@/svg/add";
import Main from "@/svg/main";

export function TabBar() {
  const lp = useLaunchParams();

  const lastname = useSelector((data: Store) => data.last_name);
  const firstname = useSelector((data: Store) => data.first_name);
  const username = useSelector((data: Store) => data.username);
  const photourl = useSelector((data: Store) => data.photo_url);

  const navigate = useNavigate();
  const location = useLocation().pathname;

  return (
    <List
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        padding: "0",
        margin: "0",
        overflowX: "hidden",
      }}
    >
      <header className={style.header}>
        <img className={style.img} src={photourl} />
        <div className={style.headertext}>
          <Text style={{ color: "white" }} weight={"2"}>
            {firstname}
            {lastname && ` ${lastname}`}
          </Text>
          {username && <Text style={{ color: "white" }}>@{username}</Text>}
        </div>
      </header>

      <Outlet />

      <Tabbar
        style={{
          zIndex: "2",
          paddingBottom: ["macos", "ios"].includes(lp.platform)
            ? "1.5rem"
            : "0",
          position: "static",
        }}
      >
        <Tabbar.Item
          selected={location == "/"}
          onClick={() => navigate("/")}
          text={(<Main />) as any}
        />
        <Tabbar.Item
          selected={location == "/ref"}
          onClick={() => navigate("/ref")}
          text={(<Add />) as any}
        />
      </Tabbar>
    </List>
  );
}
