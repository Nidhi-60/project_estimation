import { Space, Tag } from "antd";
import { useTranslation } from "react-i18next";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const useEstimationColumns = (model, setShowModel, deleteId, setDeleteId) => {
  const [t, _] = useTranslation("global");

  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/estimation/edit/${id}`);
  };

  const handleDelete = (id) => {
    setShowModel(true);
    setDeleteId(id);
  };

  return [
    {
      title: `${t("labels.title")}`,
      dataIndex: "title",
      key: "title",
    },
    {
      title: `${t("labels.createdAt")}`,
      key: "createdAt",
      render: (_, record) => (
        <Space size="middle">{moment(new Date()).format("DD-MM-YYYY")}</Space>
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

export default useEstimationColumns;
