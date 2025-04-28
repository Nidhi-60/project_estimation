import { Card, Col, Row } from "antd";
import { useProjectsQuery } from "../redux/services/projects";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BADGE_COLOR } from "../constant";
import {
  CarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  PauseCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { Line } from "@ant-design/charts";

const DashboardCount = () => {
  const { data, isLoading } = useProjectsQuery();
  const [projectsCount, setProjectCount] = useState({
    transit: 0,
    onHold: 0,
    completed: 0,
    processing: 0,
    rejected: 0,
  });
  const [counts, setCount] = useState({});
  const [t, _] = useTranslation("global");

  useEffect(() => {
    if (data) {
      let obj = {};

      data.forEach((ele) => {
        if (obj[ele.status]) {
          [ele.status] = obj[ele.status] + 1;
        } else {
          obj[ele.status] = 1;
        }
      });

      setCount(obj);
    }
  }, [data]);

  const ICON = {
    transit: <CarOutlined />,
    onHold: <PauseCircleOutlined />,
    completed: <CheckCircleOutlined />,
    processing: <SyncOutlined />,
    rejected: <ClockCircleOutlined />,
  };

  return (
    <>
      <Row>
        <h3>{t("labels.projects")}</h3>
      </Row>
      <Row gutter={[16, 16]}>
        {Object.keys(projectsCount).map((ele) => {
          return (
            <Col xs={24} sm={12} md={4}>
              <Card
                bordered={false}
                style={{
                  textAlign: "center",
                  background: `${BADGE_COLOR[ele]}20`,
                  color: BADGE_COLOR[ele],
                  height: "180px",
                }}
              >
                <h3>{t(`labels.${ele}`)}</h3>
                <span>{ICON[ele]}</span>
                <p style={{ fontSize: "24px", fontWeight: "bold" }}>
                  {counts[ele] || 0}
                </p>
              </Card>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default DashboardCount;
