import type { ComponentType, JSX } from "react";

import { IndexPage } from "@/pages/IndexPage";
import { Ref } from "@/pages/Ref";
import { Vin } from "@/pages/Vin";

interface Route {
  path: string;
  Component: ComponentType;
  title?: string;
  icon?: JSX.Element;
}

export const routes: Route[] = [
  { path: "/", Component: IndexPage },
  { path: "/ref", Component: Ref },
  { path: "/vin/:vin", Component: Vin },
];
