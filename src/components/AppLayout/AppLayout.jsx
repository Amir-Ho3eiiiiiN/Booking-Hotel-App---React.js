import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

function AppLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default AppLayout;
