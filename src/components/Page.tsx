import { useLocation, useNavigate } from "react-router-dom";
import { backButton } from "@telegram-apps/sdk-react";
import { CSSProperties, PropsWithChildren, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";
import { Store } from "@/redux";
import { Spinner } from "@telegram-apps/telegram-ui";

import stylescss from "@/scss/page.module.scss";

export function Page({
  children,
  back = true,
  style,
}: PropsWithChildren<{
  /**
   * True if it is allowed to go back from this page.
   */
  back?: boolean;
  style?: CSSProperties;
}>) {
  const navigate = useNavigate();

  useEffect(() => {
    if (back) {
      backButton.show();
      return backButton.onClick(() => {
        navigate(-1);
      });
    }
    backButton.hide();
  }, [back]);

  const segments = useSelector((data: Store) => data.segments);
  const channel = useSelector((data: Store) => data.channel);

  const location = useLocation().pathname;

  const [isBackgroundLoaded, setIsBackgroundLoaded] = useState(false);
  const [isBackgroundLoaded2, setIsBackgroundLoaded2] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = "/Ruletka/background.png";
    img.onload = () => {
      setIsBackgroundLoaded(true);
    };

    const img2 = new Image();
    img2.src = "/Ruletka/background2.png";
    img2.onload = () => {
      setIsBackgroundLoaded2(true);
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className={stylescss.main}
        style={{
          overflow: "auto",
          background:
            location != "/ref"
              ? location == "/"
                ? isBackgroundLoaded
                  ? 'url("/Ruletka/background.png")'
                  : ""
                : ""
              : isBackgroundLoaded2
              ? 'url("/Ruletka/background2.png")'
              : "",
          margin: 0,
          overflowX: "hidden",
          ...style,
        }}
      >
        {(isBackgroundLoaded && segments) ||
        (location == "/channel" && channel) ||
        (location == "/ref" && isBackgroundLoaded2) ? (
          children
        ) : (
          <div
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Spinner size="l" />
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
