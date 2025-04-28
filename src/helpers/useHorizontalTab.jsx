import { useDispatch, useSelector } from "react-redux";
import DropdownHTML from "../common/Dropdown";
import { LANGUAGE } from "../constant";
import i18next from "i18next";
import { changeLanguage, changeTheme } from "../redux/Slice/configSlice";
import { Avatar, Switch } from "antd";
import {
  MoonOutlined,
  RadarChartOutlined,
  SunOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { logout } from "../redux/Slice/authSlice";

const useHorizontal = () => {
  const dispatch = useDispatch();
  const { lang, theme } = useSelector((state) => state.globalConfig);
  const { user } = useSelector((state) => state.auth);

  const handleLanguageChange = (e) => {
    i18next.changeLanguage(e);
    dispatch(changeLanguage(e));
  };

  const handleThemeChange = () => {
    dispatch(changeTheme(theme === "dark" ? "light" : "dark"));
  };

  return [
    {
      key: "logo",
      label: <RadarChartOutlined style={{ fontSize: "24px", color: "blue" }} />,
    },

    {
      key: "language",
      label: (
        <div className="" style={{ marginLeft: "auto" }}>
          <DropdownHTML
            data={LANGUAGE}
            onChange={handleLanguageChange}
            value={lang}
          />
        </div>
      ),
    },
    {
      key: "user",
      label: (
        <div className="d-flex">
          <div className="me-3">
            <Avatar size={"large"} style={{ color: "blue" }}>
              <UserOutlined />
            </Avatar>
          </div>
          <div>{user.username}</div>
        </div>
      ),
    },
    {
      key: "theme",
      label: (
        <div style={{ marginLeft: "16px" }}>
          <span onClick={handleThemeChange}>
            {theme === "dark" ? (
              <SunOutlined style={{ fontSize: "24px", color: "black" }} />
            ) : (
              <MoonOutlined style={{ fontSize: "24px", color: "black" }} />
            )}
          </span>
        </div>
      ),
    },
  ];
};

export default useHorizontal;
