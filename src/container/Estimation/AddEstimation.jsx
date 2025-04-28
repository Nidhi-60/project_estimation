import { Button, Input, Spin, Typography } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useNotification from "../../helpers/useNotification";

import EstimationBlock from "../../components/EstimationBlock";
import useEstimation from "../../helpers/useEstimation";
import EstimationSum from "../../components/EstimationSum";
import {
  useAddEstimationMutation,
  useGetEstimationQuery,
  useUpdateEstimationMutation,
} from "../../redux/services/estimation";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
const { Title } = Typography;

const AddEstimation = () => {
  const { id } = useParams();
  const [editMode, setEditMode] = useState(false);
  const [t, _] = useTranslation("global");
  const navigate = useNavigate();
  const [notificationContainer, contextHolder] = useNotification();
  const { data: estimationData, isLoading: estimationGetIsLoading } =
    useGetEstimationQuery(id, { skip: id === undefined });

  const [estimationBlock, setEstimationBlock] = useState({
    title: "",
    estimationData: [
      {
        selectionName: "",
        items: [
          {
            title: "",
            description: "",
            unit: "",
            quantity: "",
            price: "",
            margin: "",
          },
        ],
      },
    ],
  });
  const [
    handleAddSection,
    handleAddItem,
    handleRemoveItem,
    handleParentTextChange,
    handleChildTextChange,
    handleChildNumberChange,
    handleItemCount,
    handleTotalCount,
    handleToatalSum,
    handleMargin,
  ] = useEstimation(estimationBlock, setEstimationBlock);
  const [addEstimations, { isLoading }] = useAddEstimationMutation();
  const [updateEstimations, { isLoading: updateIsLoading }] =
    useUpdateEstimationMutation();

  useEffect(() => {
    if (id !== undefined) {
      setEditMode(true);
    }
  }, [id]);

  useEffect(() => {
    if (estimationData) {
      setEstimationBlock(estimationData);
    }
  }, [estimationData]);

  const handleAddEstimation = () => {
    if (editMode) {
      updateEstimations(estimationBlock);
      notificationContainer(
        "success",
        `${t("message.estimationUpdatesuccess")}`
      );
    } else {
      addEstimations({
        ...estimationBlock,
        createdAt: moment(new Date()).format("DD-MM-YYYY"),
      });

      notificationContainer("success", `${t("message.estimationAddsuccess")}`);
    }
    navigate("/estimation");
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleRootText = (e) => {
    setEstimationBlock({
      ...estimationBlock,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      {estimationGetIsLoading ? (
        <Spin />
      ) : (
        <>
          <Title level={3}>
            {editMode ? t("labels.editEstimation") : t("labels.addEstimation")}
          </Title>
          {contextHolder}

          <div className="form-base bg-light">
            <div className="mb-5">
              <Input
                placeholder={t("labels.title")}
                name="title"
                onChange={handleRootText}
                value={estimationBlock.title}
              />
            </div>

            {estimationBlock.estimationData.map((ele, parentIndex) => {
              return (
                <>
                  <EstimationBlock
                    ele={ele}
                    parentIndex={parentIndex}
                    handleAddItem={handleAddItem}
                    handleAddSection={handleAddSection}
                    handleChildTextChange={handleChildTextChange}
                    handleParentTextChange={handleParentTextChange}
                    handleRemoveItem={handleRemoveItem}
                    handleChildNumberChange={handleChildNumberChange}
                    handleItemCount={handleItemCount}
                    handleTotalCount={handleTotalCount}
                  />
                </>
              );
            })}
            <EstimationSum
              handleToatalSum={handleToatalSum}
              handleMargin={handleMargin}
            />

            <div style={{ textAlign: "right" }}>
              <Button
                type="primary"
                style={{ marginRight: 10 }}
                onClick={handleAddEstimation}
              >
                {isLoading || updateIsLoading ? (
                  <Spin />
                ) : editMode ? (
                  t("labels.update")
                ) : (
                  t("labels.save")
                )}
              </Button>
              <Button onClick={handleBack}>{t("labels.cancel")}</Button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AddEstimation;
