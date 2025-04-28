import { Space, Tag } from "antd";
import moment from "moment";
import { useTranslation } from "react-i18next";
import useUserGet from "./useUserGet";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { BADGE_COLOR } from "../constant";
import { useNavigate } from "react-router-dom";

const useProjectColumns = (model, setShowModel, deleteId, setDeleteId) => {
  const [t, _] = useTranslation("global");
  const [getCurrentUser] = useUserGet();
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/projects/edit/${id}`);
  };

  const handleDelete = (id) => {
    setShowModel(true);
    setDeleteId(id);
  };

  return [
    {
      title: `${t("labels.customer")}`,
      dataIndex: "customer",
      key: "customer",
      render: (_, record) => (
        <Space size="middle">
          {getCurrentUser(record?.customer)?.username}
        </Space>
      ),
    },
    {
      title: `${t("labels.referenceNumber")}`,
      dataIndex: "referenceNumber",
      key: "referenceNumber",
    },
    {
      title: `${t("labels.projectReference")}`,
      children: [
        {
          title: `${t("labels.projectName")}`,
          dataIndex: "projectName",
          key: "projectName",
        },
        {
          title: `${t("labels.projectNumber")}`,
          dataIndex: "projectNumber",
          key: "projectNumber",
        },
      ],
    },
    {
      title: `${t("labels.projectLocation")}`,
      children: [
        {
          title: `${t("labels.areaLocation")}`,
          dataIndex: "location",
          key: "location",
        },
        {
          title: `${t("labels.address")}`,
          dataIndex: "address",
          key: "address",
        },
      ],
    },

    {
      title: `${t("labels.dueDate")}`,
      dataIndex: "dueDate",
      key: "dueDate",
      render: (_, record) => (
        <Space size="middle">
          <>{moment(record.dueDate).format("DD/MM/YYYY")}</>
        </Space>
      ),
    },
    {
      title: `${t("labels.contact")}`,
      dataIndex: "contact",
      key: "contact",
    },
    {
      title: `${t("labels.assignTo")}`,
      children: [
        {
          title: `${t("labels.manager")}`,
          dataIndex: "manager",
          key: "manager",
          render: (_, record) => (
            <Space size="middle">
              {getCurrentUser(record?.manager)?.username}
            </Space>
          ),
        },
        {
          title: `${t("labels.staff")}`,
          dataIndex: "staff",
          key: "staff",
          render: (_, record) => (
            <Space size="middle">
              {getCurrentUser(record?.staff)?.username}
            </Space>
          ),
        },
      ],
    },

    {
      title: `${t("labels.status")}`,
      dataIndex: "status",
      key: "status",
      render: (_, record) => (
        <>
          <Tag color={BADGE_COLOR[record.status]}>{record.status}</Tag>
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <span
            onClick={() => handleEdit(record.id)}
            className="cursor-pointer"
          >
            <EditOutlined />
          </span>
          <span
            onClick={() => handleDelete(record.id)}
            className="cursor-pointer"
          >
            <DeleteOutlined />
          </span>
        </Space>
      ),
    },
  ];
};

export default useProjectColumns;
