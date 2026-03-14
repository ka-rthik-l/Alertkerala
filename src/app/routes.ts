import { createBrowserRouter } from "react-router";
import { Landing } from "./components/Landing";
import { CivilianAlert } from "./components/CivilianAlert";
import { ReportMissing } from "./components/ReportMissing";
import { AuthorityDashboard } from "./components/AuthorityDashboard";
import { BroadcastAnimation } from "./components/BroadcastAnimation";
import { SubmitSighting } from "./components/SubmitSighting";
import { ResponsePanel } from "./components/ResponsePanel";
import { Root } from "./components/Root";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Landing },
      { path: "alert/:id", Component: CivilianAlert },
      { path: "report", Component: ReportMissing },
      { path: "dashboard", Component: AuthorityDashboard },
      { path: "broadcast/:id", Component: BroadcastAnimation },
      { path: "sighting/:id", Component: SubmitSighting },
      { path: "response/:id", Component: ResponsePanel },
    ],
  },
]);
