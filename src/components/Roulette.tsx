import WheelComponent from "./Route";
import { useSelector } from "react-redux";
import { Store } from "@/redux";

export function Roulette({ rotate }: { rotate: number }) {
  const segments = useSelector((data: Store) => data.segments);

  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "325px",
          height: "325px",
          borderRadius: "999px",
          backgroundColor: "black",
          border: `5px solid #ae2573`,
          flexDirection: "column",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-5px",
            zIndex: 1,
            height: 22,
            width: 44,
            clipPath: "polygon(20% 0, 100% 50%, 20% 100%, 0% 50%)",
            background:
              "linear-gradient(hsl(0, 3%, 0%) 0%, hsl(0, 3%, 0%) 50%, hsl(0, 3%, 20%) 50%, hsl(0, 3%, 20%) 100%)",
            rotate: "90deg",
          }}
        />
        <div
          style={{
            rotate: `${rotate}deg`,
            transition: "3s",
          }}
        >
          <WheelComponent segments={segments} />
        </div>
      </div>
    </div>
  );
}
