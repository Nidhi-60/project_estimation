import { useTranslation } from "react-i18next";

const EstimationSum = (props) => {
  const { handleToatalSum, handleMargin } = props;
  const [t, _] = useTranslation("global");

  const SUMMARY = [
    { key: "labels.totalSum", action: handleToatalSum() },
    { key: "labels.totalMargin", action: handleMargin() },
    { key: "labels.totalAmount", action: handleToatalSum() + handleMargin() },
  ];

  return (
    <div className="mt-20 mb-5">
      {SUMMARY.map((ele, index) => {
        return (
          <div className="d-flex justify-content-end" key={index}>
            <div className="text-2">{t(ele.key)} : </div>
            <div className="text-2">{ele.action}</div>
          </div>
        );
      })}
    </div>
  );
};

export default EstimationSum;
