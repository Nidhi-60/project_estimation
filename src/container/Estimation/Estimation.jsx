import { Button, Space, Spin, Table } from "antd";
import {
  useDeleteEstimationMutation,
  useEstimationQuery,
} from "../../redux/services/estimation";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useEstimationColumns from "../../helpers/useEstimationColumns";
import CustomModel from "../../common/CustomModel";
import { useState } from "react";

const Estimation = () => {
  const [deleteId, setDeleteId] = useState("");
  const [model, setShowModel] = useState(false);
  const { data, isLoading } = useEstimationQuery();
  const navigate = useNavigate();
  const [t, _] = useTranslation("global");
  const columns = useEstimationColumns(
    model,
    setShowModel,
    deleteId,
    setDeleteId
  );

  const [deleteEstimation] = useDeleteEstimationMutation();

  const handleAddEstimation = () => {
    navigate("/estimation/add");
  };

  const handleDelete = () => {
    deleteEstimation({ id: deleteId });
    setShowModel(false);
  };

  const handleCancel = () => {
    setShowModel(false);
  };

  return (
    <>
      <CustomModel
        visible={model}
        handleOk={handleDelete}
        handleCancel={handleCancel}
      >
        {t("message.delete")}
      </CustomModel>

      {isLoading ? (
        <div className="loader">
          <Spin />
        </div>
      ) : (
        <div>
          <p className="page-header">{t("labels.estimation")}</p>
          <div className="text-end mb-25">
            <Button type="primary" onClick={handleAddEstimation}>
              {t("labels.addEstimation")}
            </Button>
          </div>
          <Table
            columns={columns}
            dataSource={data}
            scroll={{ x: "max-content" }}
          />
        </div>
      )}
    </>
  );
};

export default Estimation;
