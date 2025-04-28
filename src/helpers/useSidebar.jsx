import {
  DashboardOutlined,
  LogoutOutlined,
  ProjectOutlined,
  RiseOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const useSidebar = () => {
  const [t, _] = useTranslation("global");

  return [
    {
      key: "/dashboard",
      label: t("labels.dashboard"),
      icon: <DashboardOutlined />,
    },
    {
      key: "/projects",
      label: t("labels.projects"),
      icon: <ProjectOutlined />,
    },
    {
      key: "/estimation",
      label: t("labels.estimation"),
      icon: <RiseOutlined />,
    },
    {
      key: "logout",
      label: t("labels.logout"),
      icon: <LogoutOutlined />,
      className: "menu-logout",
    },
  ];
};

export default useSidebar;
