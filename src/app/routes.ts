import { createBrowserRouter } from "react-router";
import { Landing } from "./components/Landing.js";
import { CivilianAlert } from "./components/CivilianAlert.js";
import { ReportMissing } from "./components/ReportMissing.js";
import { AuthorityDashboard } from "./components/AuthorityDashboard.js";
import { BroadcastAnimation } from "./components/BroadcastAnimation.js";
import { SubmitSighting } from "./components/SubmitSighting.js";
import { ResponsePanel } from "./components/ResponsePanel.js";
import { AiAnalysisPage } from "./components/AiAnalysisPage.js";
import { Root } from "./components/Root.js";

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
      { path: "analysis/:id", Component: AiAnalysisPage },
    ],
  },
]);
