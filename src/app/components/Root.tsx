import { Outlet } from "react-router";
import { AlertProvider } from "../context/AlertContext";

export function Root() {
  return (
    <AlertProvider>
      <Outlet />
    </AlertProvider>
  );
}
