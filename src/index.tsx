import ReactDOM from "react-dom/client";
import { StrictMode } from "react";

import { App } from "@/App.tsx";

import "@telegram-apps/telegram-ui/dist/styles.css";
import "@/scss/index.scss";

import {
  backButton,
  init,
  initData,
  miniApp,
  themeParams,
} from "@telegram-apps/sdk-react";

const root = ReactDOM.createRoot(document.getElementById("root")!);

init();

backButton.mount();
miniApp.mount();
themeParams.mount();
initData.restore();

miniApp.bindCssVars();
themeParams.bindCssVars();

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
