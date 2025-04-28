import { useTranslation } from "react-i18next";
import DashboardCount from "../../components/DashboardCount";

const Dashboard = () => {
  const [t, _] = useTranslation("global");

  return (
    <>
      <div className="">
        <p className="page-header">{t("labels.dashboard")}</p>
      </div>
      <div>
        <DashboardCount />
      </div>
    </>
  );
};

export default Dashboard;
