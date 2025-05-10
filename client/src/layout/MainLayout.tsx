import { Outlet } from "react-router";
import { ToastContainer, Zoom } from "react-toastify";
import Header from "../components/Header";

const MainLayout = () => {
  return (
    <section className="max-w-4xl mx-auto py-3  max-sm:px-2">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Zoom}
      />
      <Header />
      <div className=" max-w-xl mx-auto pt-2">
        <Outlet />
      </div>
    </section>
  );
};

export default MainLayout;
