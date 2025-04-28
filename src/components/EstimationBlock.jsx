import { Input, InputNumber } from "antd";
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const EstimationBlock = (props) => {
  const {
    parentIndex,
    handleAddItem,
    handleAddSection,
    handleChildTextChange,
    handleParentTextChange,
    ele,
    handleRemoveItem,
    handleChildNumberChange,
    handleItemCount,
    handleTotalCount,
  } = props;
  const [t, _] = useTranslation("global");

  return (
    <div>
      <div key={parentIndex} className="d-flex justify-content-between mb-5">
        <div className="d-flex align-center">
          <span onClick={handleAddSection} className="me-20">
            <PlusCircleOutlined />
          </span>
          <Input
            name="selectionName"
            value={ele.selectionName}
            onChange={(e) => handleParentTextChange(e, parentIndex)}
            placeholder={t("labels.selectionName")}
          />
        </div>
        <div>
          <Input name="total" value={handleTotalCount(parentIndex)} />
        </div>
      </div>
      <div>
        {ele.items.map((eleItem, childIndex) => {
          return (
            <div key={childIndex} className="d-flex align-center mb-5">
              <div className="d-flex me-20">
                <div className="me-3">
                  <Input
                    name="title"
                    value={eleItem.title}
                    onChange={(e) =>
                      handleChildTextChange(e, parentIndex, childIndex)
                    }
                    placeholder={t("labels.title")}
                  />
                </div>
                <div className="me-3">
                  <Input
                    name="description"
                    value={eleItem.description}
                    onChange={(e) =>
                      handleChildTextChange(e, parentIndex, childIndex)
                    }
                    placeholder={t("labels.description")}
                  />
                </div>
                <div className="me-3">
                  <Input
                    name="unit"
                    value={eleItem.unit}
                    onChange={(e) =>
                      handleChildTextChange(e, parentIndex, childIndex)
                    }
                    placeholder={t("labels.unit")}
                  />
                </div>
                <div className="me-3">
                  <InputNumber
                    name="quantity"
                    value={eleItem.quantity}
                    onChange={(e) =>
                      handleChildNumberChange(
                        e,
                        parentIndex,
                        childIndex,
                        "quantity"
                      )
                    }
                    placeholder={t("labels.quantity")}
                  />
                </div>
                <div className="me-3">
                  <InputNumber
                    name="price"
                    value={eleItem.price}
                    onChange={(e) =>
                      handleChildNumberChange(
                        e,
                        parentIndex,
                        childIndex,
                        "price"
                      )
                    }
                    placeholder={t("labels.price")}
                  />
                </div>
                <div className="me-3">
                  <InputNumber
                    name="margin"
                    value={eleItem.margin}
                    onChange={(e) =>
                      handleChildNumberChange(
                        e,
                        parentIndex,
                        childIndex,
                        "margin"
                      )
                    }
                    placeholder={t("labels.margin")}
                  />
                </div>
                <div className="me-3">
                  <Input
                    name="total"
                    value={handleItemCount(parentIndex, childIndex)}
                    onChange={(e) =>
                      handleChildTextChange(e, parentIndex, childIndex)
                    }
                  />
                </div>
              </div>
              <div className="d-flex">
                <span
                  onClick={() => handleAddItem(parentIndex)}
                  className="me-20"
                >
                  <PlusCircleOutlined />
                </span>
                {childIndex !== 0 && (
                  <span
                    onClick={() => handleRemoveItem(parentIndex, childIndex)}
                  >
                    <MinusCircleOutlined />
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EstimationBlock;
