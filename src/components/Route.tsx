import { useEffect } from "react";

const WheelComponent = ({ segments }: { segments: Array<string> }) => {
  let canvasContext: CanvasRenderingContext2D | null = null;
  const dpi = window.devicePixelRatio;

  const centerX = 300 * dpi;
  const centerY = 150 * dpi;

  const WIDTH = 600;
  const HEIGHT = 300;

  const size = 150 * dpi;

  useEffect(() => {
    initCanvas();
    wheelDraw();
  }, []);

  const initCanvas = () => {
    let canvas = document.getElementById("canvas") as HTMLCanvasElement;
    canvas.width = WIDTH * dpi;
    canvas.height = HEIGHT * dpi;
    canvas.style.width = `${WIDTH}px`;
    canvas.style.height = `${HEIGHT}px`;

    if (canvas) {
      canvasContext = canvas.getContext("2d");
    }
  };

  const wheelDraw = () => {
    const ctx = canvasContext;
    if (ctx) {
      ctx.clearRect(0, 0, 1000, 800);
      drawWheel();
    }
  };

  const drawSegment = (key: number, lastAngle: number, angle: number) => {
    const ctx = canvasContext;
    const value = `${segments[key]}₽`;
    if (ctx) {
      ctx.save();
      ctx.beginPath();

      ctx.moveTo(centerX, centerY);

      ctx.arc(centerX, centerY, size, lastAngle, angle, false);
      ctx.lineTo(centerX, centerY);
      ctx.closePath();
      ctx.fillStyle = "#ae2573";
      ctx.fill();
      ctx.stroke();
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate((lastAngle + angle) / 2);
      ctx.fillStyle = "white";
      ctx.font = `${16 * dpi}px bold Montserrat`;
      ctx.fillText(value.slice(0, 21), size / 2 + 20, 0);
      ctx.restore();
    }
  };

  const drawWheel = () => {
    const ctx = canvasContext;
    let lastAngle = 0;
    const len = segments.length;
    const PI2 = Math.PI * 2;
    if (ctx) {
      ctx.lineWidth = 1;
      ctx.strokeStyle = "black";
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      ctx.font = "1em";

      for (let i = 1; i <= len; i++) {
        const angle = PI2 * (i / len);
        drawSegment(i - 1, lastAngle, angle);
        lastAngle = angle;
      }

      ctx.beginPath();
      ctx.arc(centerX, centerY, 20, 0, PI2, false);
      ctx.closePath();
      ctx.fillStyle = "black";
      ctx.lineWidth = 10;
      ctx.strokeStyle = "#ae2573";
      ctx.fill();
      ctx.stroke();
    }
  };

  return (
    <div id="wheel">
      <canvas id="canvas" width="600" height="300" />
    </div>
  );
};
export default WheelComponent;
