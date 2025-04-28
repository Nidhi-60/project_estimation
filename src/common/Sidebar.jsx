import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import useSidebar from "../helpers/useSidebar";
import { useDispatch } from "react-redux";
import { logout } from "../redux/Slice/authSlice";

const Sidebar = () => {
  const navigate = useNavigate();
  const SIDE_BAR = useSidebar();
  const dispatch = useDispatch();

  const handleMenuClick = (e) => {
    if (e.key === "logout") {
      dispatch(logout(false));
    } else {
      navigate(e.key);
    }
  };

  return (
    <Menu
      items={SIDE_BAR}
      style={{ width: 256 }}
      onClick={handleMenuClick}
      className="navbar side-menu"
      theme="light"
    />
  );
};

export default Sidebar;
