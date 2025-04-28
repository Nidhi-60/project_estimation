import { Select } from "antd";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
const { Option } = Select;

const DropdownHTML = (props) => {
  const {
    name,
    value,
    onChange,
    data,
    label,
    errorMessage,
    disabled,
    className,
    required,
    id,
    selectText,
  } = props;
  const [t, _] = useTranslation("global");

  return (
    <>
      {label && <label htmlFor={id}>{label}</label>}{" "}
      {required && <span className="text-error"> *</span>}
      <Select
        name={name}
        id={id}
        value={value !== undefined ? value : ""}
        onChange={onChange}
        className={className ? className : "form-control mr-2 select-box"}
        disabled={disabled}
      >
        <Option value="">{selectText || t("labels.selectoption")}</Option>
        {data &&
          data?.map((d, index) => {
            return (
              <Fragment key={index}>
                <Option value={d._id} key={index} name={d.name}>
                  {d.name}
                </Option>
              </Fragment>
            );
          })}
      </Select>
      <span className="text-error">{errorMessage}</span>
    </>
  );
};

export default DropdownHTML;
