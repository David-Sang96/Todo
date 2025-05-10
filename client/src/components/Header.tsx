import { Link, NavLink, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { clearUserInfo } from "../slices/auth";
import { useLogoutMutation } from "../slices/userApi";
import { useAppDispatch, useAppSelector } from "../store/hooks";

const Header = () => {
  const userInfo = useAppSelector((store) => store.auth.userInfo);
  const dispatch = useAppDispatch();
  const [logout, { isLoading }] = useLogoutMutation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const payload = await logout({}).unwrap();
      dispatch(clearUserInfo());
      toast.success(payload.message);
      navigate("/login", { replace: true });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <nav className="flex justify-between items-center pb-3">
      <Link to={"/"} className="text-2xl font-medium">
        Simple-Share
      </Link>
      {userInfo ? (
        <div className="space-x-3">
          <NavLink
            to={"/profile"}
            className={({ isActive }) =>
              isActive
                ? "text-white bg-green-500 py-1.5 px-2 rounded-sm border"
                : "hover:underline hover:underline-offset-4"
            }
          >
            Profile
          </NavLink>
          <button
            className="bg-red-500 text-white  p-1 px-2 rounded-md hover:cursor-pointer"
            onClick={handleLogout}
            disabled={isLoading}
          >
            Logout
          </button>
        </div>
      ) : (
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
      )}
    </nav>
  );
};

export default Header;
