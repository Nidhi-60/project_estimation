import { Bar } from "@ant-design/charts";
import { useState } from "react";

const DashboardChart = (props) => {
  const { count } = props;
  const [statusCounts, setStatusCounts] = useState(count);

  const chartData = Object.keys(statusCounts).map((status) => ({
    status,
    count: statusCounts[status],
  }));

  const config = {
    data: chartData,
    xField: "status",
    yField: "count",
    color: "#1890ff",
    label: {
      position: "top",
      style: {
        fill: "#000",
        fontSize: 12,
      },
    },
    barWidthRatio: 0.4,
  };
  return (
    <div className="graph-container">
      <Bar {...config} />
    </div>
  );
};

export default DashboardChart;
