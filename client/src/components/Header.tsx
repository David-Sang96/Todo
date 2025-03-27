import { Link, NavLink } from "react-router";

const Header = () => {
  return (
    <nav className="flex justify-between items-center pb-3">
      <Link to={"/"} className="text-2xl font-medium">
        Simple-Share
      </Link>
      <div className="space-x-3">
        <NavLink
          to={"/login"}
          className={({ isActive }) =>
            isActive
              ? "text-white bg-green-500 py-1.5 px-2 rounded-sm border"
              : "hover:underline hover:underline-offset-4"
          }
        >
          Login
        </NavLink>
        <NavLink
          to={"/register"}
          className={({ isActive }) =>
            isActive
              ? "text-white bg-green-500 py-1  px-2 rounded-sm border"
              : "hover:underline hover:underline-offset-4"
          }
        >
          Register
        </NavLink>
      </div>
    </nav>
  );
};

export default Header;
