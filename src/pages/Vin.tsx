import { Page } from "@/components/Page";
import { Button } from "@telegram-apps/telegram-ui";
import { useNavigate, useParams } from "react-router-dom";

export function Vin() {
  const { vin } = useParams();

  const navigate = useNavigate();

  return (
    <Page style={{ padding: "1rem", height: "100%" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "var(--tgui--surface_primary)",
          padding: "1rem",
          borderRadius: "1rem",
          gap: "2rem",
        }}
      >
        <span style={{ textAlign: "center", color: "black" }}>
          {Number(vin) == 0
            ? "Не расстраивайся! 💜\nСегодня удача была не на твоей стороне, но у тебя будет\nвозможность попробовать снова через 24 часа или пригласить друзей.\nВозвращайся завтра и испытай свою удачу снова!"
            : `Поздравляю 🥳, ты выиграл! Менеджер свяжется с тобой в течении 3 дней`}
        </span>
        <Button style={{ marginBottom: "1rem" }} onClick={() => navigate(-1)}>
          Назад
        </Button>
      </div>
    </Page>
  );
}
