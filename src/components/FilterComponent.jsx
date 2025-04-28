import { Button, DatePicker, Popover, Tag } from "antd";
import { useTranslation } from "react-i18next";
import { STATUS } from "../constant";
import { CloseCircleOutlined } from "@ant-design/icons";

const FilterComponent = (props) => {
  const [t, _] = useTranslation("global");
  const { handleFilter, filters, handleClearFilter } = props;

  const content = (
    <div>
      {STATUS.map((ele) => {
        return (
          <Tag
            onClick={() => handleFilter(ele._id, "tag")}
            color={filters.status.includes(ele._id) ? "blue" : ""}
          >
            {ele.name}
          </Tag>
        );
      })}
    </div>
  );

  return (
    <div className="d-flex">
      <div className="me-3">
        <DatePicker onChange={(e) => handleFilter(e, "date")} />
      </div>
      <div className="me-3">
        <Popover content={content} title="Select Status" trigger="click">
          <Button>{t("labels.status")}</Button>
        </Popover>
      </div>
      {filters?.createdAt !== "" ||
        (filters.status.length > 0 && (
          <div>
            <Button onClick={handleClearFilter}>
              <span>{t("labels.reset")}</span>
              <span>
                <CloseCircleOutlined />
              </span>
            </Button>
          </div>
        ))}
    </div>
  );
};

export default FilterComponent;
