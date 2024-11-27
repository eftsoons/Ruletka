import { useLocation, useNavigate } from "react-router-dom";
import { backButton } from "@telegram-apps/sdk-react";
import { CSSProperties, PropsWithChildren, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";
import { Store } from "@/redux";
import { Spinner } from "@telegram-apps/telegram-ui";

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

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          overflow: "auto",
          background:
            location != "/ref"
              ? 'url("/ruletka/background.png")'
              : 'url("/ruletka/background2.png")',
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundColor: location != "/ref" ? "black" : "white",
          margin: 0,
          ...style,
        }}
      >
        {segments ||
        (location == "/channel" && channel) ||
        location == "/ref" ? (
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
