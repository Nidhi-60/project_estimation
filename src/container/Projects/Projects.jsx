import { Table, Tag, Space, Spin, Button, DatePicker } from "antd";
import {
  useDeleteProjectMutation,
  useProjectsQuery,
} from "../../redux/services/projects";
import { useNavigate } from "react-router-dom";
import useProjectColumns from "../../helpers/useProjectColumns";
import { useTranslation } from "react-i18next";
import FilterComponent from "../../components/FilterComponent";
import { useState } from "react";
import moment from "moment";
import CustomModel from "../../common/CustomModel";

const Projects = () => {
  const [deleteId, setDeleteId] = useState("");
  const [model, setShowModel] = useState(false);
  const columns = useProjectColumns(model, setShowModel, deleteId, setDeleteId);
  const navigate = useNavigate();
  const [t, _] = useTranslation("global");
  const [filters, setFilter] = useState({ createdAt: "", status: [] });
  const { data, isLoading } = useProjectsQuery(filters);
  const [deleteProject] = useDeleteProjectMutation();

  const handleAddProject = () => {
    navigate("/projects/add");
  };

  console.log(deleteId, model);

  const handleFilter = (e, key) => {
    if (key === "date") {
      setFilter({ createdAt: moment(e).format() });
    } else {
      if (filters.status.includes(e)) {
        setFilter({
          ...filters,
          status: filters.status.filter((ele) => ele !== e),
        });
      } else {
        setFilter({
          ...filters,
          status: [...filters.status, e],
        });
      }
    }
  };

  const handleClearFilter = () => {
    setFilter({ status: [], createdAt: "" });
  };

  const handleDelete = () => {
    deleteProject({ id: deleteId });
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
        <div className="">
          <p className="page-header">{t("labels.projects")}</p>
          <div className="d-flex justify-content-between">
            <div className="">
              <FilterComponent
                handleFilter={handleFilter}
                filters={filters}
                handleClearFilter={handleClearFilter}
              />
            </div>
            <div className="text-end mb-25">
              <Button type="primary" onClick={handleAddProject}>
                {t("labels.addProject")}
              </Button>
            </div>
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

export default Projects;
