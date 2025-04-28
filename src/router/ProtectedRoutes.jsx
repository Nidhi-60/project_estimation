import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = (props) => {
  const { children } = props;
  const { isAuth } = useSelector((state) => state.auth);

  if (!isAuth) {
    return <Navigate to={"/signin"} />;
  }

  return <>{children}</>;
};

export default ProtectedRoutes;
