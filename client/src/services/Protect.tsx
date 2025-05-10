import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAppSelector } from "../store/hooks";

const Protect = ({ children }: { children: ReactNode }) => {
  const { userInfo } = useAppSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) navigate("/login", { replace: true });
  }, [userInfo, navigate]);

  return <>{children}</>;
};

export default Protect;
