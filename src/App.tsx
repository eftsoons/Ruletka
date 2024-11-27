import {
  useLaunchParams,
  miniApp,
  useSignal,
  initData,
  postEvent,
} from "@telegram-apps/sdk-react";
import { AppRoot } from "@telegram-apps/telegram-ui";
import { Navigate, Route, Routes, Router } from "react-router-dom";
import { TabBar } from "@/components/Tabbar";

import { routes } from "@/navigation/routes.tsx";
import { useEffect, useLayoutEffect, useMemo } from "react";

import { initNavigator, retrieveLaunchParams } from "@telegram-apps/sdk";
import { useIntegration } from "@telegram-apps/react-router-integration";

import { Provider } from "react-redux";
import store from "@/redux";

import axios from "axios";
import axiosRetry from "axios-retry";
import { Channel } from "./pages/Channel";

axiosRetry(axios, {
  retries: Infinity,
  retryDelay: axiosRetry.exponentialDelay,
});

export function App() {
  const lp = useLaunchParams();
  const isDark = useSignal(miniApp.isDark);

  const navigator = useMemo(() => initNavigator("RULETKAWB"), []);
  const [location, reactNavigator] = useIntegration(navigator);

  const launchParams = retrieveLaunchParams();

  const initDataState = useSignal(initData.state);

  useLayoutEffect(() => {
    if (initDataState && initDataState.user) {
      const id = initDataState.user.id;
      const photo = initDataState.user.photoUrl;
      const username = initDataState.user.username;
      const lastname = initDataState.user.lastName;
      const firstname = initDataState.user.firstName;

      store.dispatch({ type: "SET_ID", payload: id });
      store.dispatch({ type: "SET_PHOTO", payload: photo });
      store.dispatch({ type: "SET_USERNAME", payload: username });
      store.dispatch({ type: "SET_LASTNAME", payload: lastname });
      store.dispatch({ type: "SET_FIRSTNAME", payload: firstname });
    }
  });

  useEffect(() => {
    miniApp.ready();

    postEvent("web_app_expand");
    postEvent("web_app_expand");
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--tg-theme-button-color",
      "#ae2573"
    );

    document.documentElement.style.setProperty(
      "--tg-theme-link-color",
      "#ae2573"
    );
  }, [isDark]);

  useEffect(() => {
    axios
      .post(`${import.meta.env.VITE_API_URL}/`, {
        initData: launchParams.initDataRaw,
      })
      .then((response) => {
        const data = response.data;

        if (data != "error" && data.type != "channel") {
          store.dispatch({ type: "SET_SEGMENTS", payload: data.ruletka });
          store.dispatch({ type: "SET_BULLET", payload: data.userinfo.bullet });
          reactNavigator.push("/");
        } else if (data.type == "channel") {
          reactNavigator.push("/channel");
          store.dispatch({
            type: "SET_CHANNEL",
            payload: data.channel,
          });
        }
      });
  }, []);

  return (
    <AppRoot
      appearance={"light"}
      platform={["macos", "ios"].includes(lp.platform) ? "ios" : "base"}
      style={{ height: "100%" }}
    >
      <Provider store={store}>
        <Router location={location} navigator={reactNavigator}>
          {location.pathname != "/channel" ? (
            <Routes location={location}>
              <Route path="/" element={<TabBar />}>
                {routes.map((route) => (
                  <Route key={route.path} {...route} />
                ))}
                <Route path="*" element={<Navigate to="/" />} />
              </Route>
            </Routes>
          ) : (
            <Channel />
          )}
        </Router>
      </Provider>
    </AppRoot>
  );
}
