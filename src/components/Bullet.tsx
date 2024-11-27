import { Text } from "@telegram-apps/telegram-ui";

import style from "@/scss/bullet.module.scss";
import { useSelector } from "react-redux";
import { Store } from "@/redux";

export function Bullet() {
  const bullet = useSelector((data: Store) => data.bullet);
  return (
    <div className={style.main}>
      <span className={style.text}>ваши билеты:</span>
      <span className={style.bullettext}>{bullet}</span>
    </div>
  );
}
