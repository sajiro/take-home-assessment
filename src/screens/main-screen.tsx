import Header from "@/components/header";
import { Outlet } from "react-router-dom";

const MainScreen = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default MainScreen;
