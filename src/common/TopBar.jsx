import { Menu } from "antd";
import useHorizontal from "../helpers/useHorizontalTab";

const TopBar = () => {
  const horizontalMenu = useHorizontal();

  return (
    <Menu
      mode="horizontal"
      style={{ flex: 1, display: "flex", alignItems: "center" }}
      items={horizontalMenu}
      theme="light"
      className="custom-menu"
    />
  );
};

export default TopBar;
