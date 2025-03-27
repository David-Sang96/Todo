import { Outlet } from "react-router";
import Header from "../components/Header";

const MainLayout = () => {
  return (
    <section className="max-w-4xl mx-auto py-3  max-sm:px-2">
      <Header />
      <div className=" max-w-md mx-auto pt-2">
        <Outlet />
      </div>
    </section>
  );
};

export default MainLayout;
