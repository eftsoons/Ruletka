import type { JSX } from "react";

import { IndexPage } from "@/pages/IndexPage";
import { Ref } from "@/pages/Ref";
import { Vin } from "@/pages/Vin";

/*export const routes: Route[] = [
  {
    path: "/",
    element: () => <IndexPage snackbar={snackbar} setsnackbar={setsnackbar} />,
  },
  { path: "/ref", Component: Ref },
  { path: "/vin/:vin", Component: Vin },
];*/

import { TabBar } from "@/components/Tabbar";
import { Navigate, Route, Routes, Location } from "react-router-dom";

export default ({
  location,
  snackbar,
  setsnackbar,
}: {
  location: Location;
  snackbar: JSX.Element;
  setsnackbar: Function;
}) => {
  return (
    <Routes location={location}>
      <Route path="/" element={<TabBar />}>
        <Route
          path="/"
          element={<IndexPage snackbar={snackbar} setsnackbar={setsnackbar} />}
        />
        <Route path="/ref" Component={Ref} />
        <Route path="/vin/:vin" Component={Vin} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
};
