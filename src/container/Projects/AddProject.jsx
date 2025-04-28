import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Spin,
  Typography,
} from "antd";
import DropdownHTML from "../../common/Dropdown";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import {
  useAddProjectMutation,
  useGetProjectQuery,
  useUpdateProjectMutation,
} from "../../redux/services/projects";
import useNotification from "../../helpers/useNotification";
import { useNavigate, useParams } from "react-router-dom";
import { STATUS } from "../../constant";
import moment from "moment";
import { useGetUserQuery } from "../../redux/services/auth";
const { Title } = Typography;

const AddProject = () => {
  const { id } = useParams();
  const [t, _] = useTranslation("global");
  const [notificationContainer, contextHolder] = useNotification();
  const naviate = useNavigate();
  const { data: userData, isLoading } = useGetUserQuery();
  const { data: projectData, isLoading: projectGetIsLoading } =
    useGetProjectQuery(id, {
      skip: id === undefined,
    });
  const [addProjects, { isLoading: projectAddLoading }] =
    useAddProjectMutation();
  const [updateProject, { isLoading: projectUpdateLoading }] =
    useUpdateProjectMutation();

  const [users, setUsers] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (id) {
      setEditMode(true);
    }
  }, [id]);

  useEffect(() => {
    if (projectData) {
      form.setFieldsValue({
        ...projectData,
        dueDate: moment(projectData.dueDate),
        id: projectData.id,
      });
    }
  }, [projectData, form]);

  useEffect(() => {
    if (userData) {
      const formatted = userData.map((user) => ({
        _id: user.id,
        name: user.username,
      }));
      setUsers(formatted);
    }
  }, [userData]);

  const onFinish = (value) => {
    if (editMode) {
      updateProject({ ...value, id: projectData.id });
      notificationContainer("success", `${t("message.projectUpdatesuccess")}`);
    } else {
      addProjects({
        ...value,
        createdAt: moment(new Date()).format("DD-MM-YYYY"),
      });
      notificationContainer("success", `${t("message.projectAddsuccess")}`);
    }

    naviate("/projects");
  };

  const handleCancel = () => {
    naviate(-1);
  };

  return (
    <>
      {projectGetIsLoading ? (
        <>
          <Spin />
        </>
      ) : (
        <>
          <Title level={3}>
            {editMode ? t("labels.editProject") : t("labels.addProject")}
          </Title>
          {contextHolder}
          <div className="form-base bg-light">
            <Form
              layout="vertical"
              onFinish={onFinish}
              name="basic"
              autoComplete="off"
              form={form}
            >
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item
                    label={t("labels.customer")}
                    name="customer"
                    rules={[
                      {
                        required: true,
                        message: `${t("message.inputCustomer")}`,
                      },
                    ]}
                  >
                    <DropdownHTML data={!isLoading ? users : []} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label={t("labels.referenceNumber")}
                    name="referenceNumber"
                    rules={[
                      {
                        required: true,
                        message: `${t("message.inputReferenceNumber")}`,
                      },
                    ]}
                  >
                    <Input placeholder={t("labels.referenceNumber")} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label={t("labels.projectName")}
                    rules={[
                      {
                        required: true,
                        message: `${t("message.inputProjectName")}`,
                      },
                    ]}
                    name="projectName"
                  >
                    <Input placeholder={t("labels.projectName")} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item
                    label={t("labels.projectNumber")}
                    rules={[
                      {
                        required: true,
                        message: `${t("message.inputProjectNumber")}`,
                      },
                    ]}
                    name="projectNumber"
                  >
                    <Input placeholder={t("labels.projectNumber")} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label={t("labels.areaLocation")}
                    rules={[
                      {
                        required: true,
                        message: `${t("message.inputLocation")}`,
                      },
                    ]}
                    name="location"
                  >
                    <Input placeholder={t("labels.areaLocation")} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label={t("labels.address")}
                    rules={[
                      {
                        required: true,
                        message: `${t("message.inputAddress")}`,
                      },
                    ]}
                    name="address"
                  >
                    <Input placeholder={t("labels.address")} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item
                    label={t("labels.dueDate")}
                    rules={[
                      {
                        required: true,
                        message: `${t("message.inputDueDate")}`,
                      },
                    ]}
                    name="dueDate"
                  >
                    <DatePicker
                      placeholder="Select a date"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label={t("labels.contact")}
                    rules={[
                      {
                        required: true,
                        message: `${t("message.inputContact")}`,
                      },
                    ]}
                    name="contact"
                  >
                    <Input placeholder={t("labels.contact")} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label={t("labels.manager")}
                    rules={[
                      {
                        required: true,
                        message: `${t("message.inputManager")}`,
                      },
                    ]}
                    name="manager"
                  >
                    <DropdownHTML
                      placeholder={t("labels.manager")}
                      data={!isLoading ? users : []}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item
                    label={t("labels.staff")}
                    rules={[
                      { required: true, message: `${t("message.inputStaff")}` },
                    ]}
                    name="staff"
                  >
                    <DropdownHTML data={!isLoading ? users : []} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label={t("labels.status")}
                    rules={[
                      {
                        required: true,
                        message: `${t("message.inputStatus")}`,
                      },
                    ]}
                    name="status"
                  >
                    <DropdownHTML
                      placeholder={t("labels.status")}
                      data={STATUS}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label={t("labels.email")}
                    rules={[
                      { required: true, message: `${t("message.inputEmail")}` },
                    ]}
                    name="email"
                  >
                    <Input placeholder={t("labels.email")} />
                  </Form.Item>
                </Col>
              </Row>

              <div style={{ textAlign: "left", marginTop: 20 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ marginRight: 10 }}
                >
                  {projectAddLoading || projectUpdateLoading ? (
                    <Spin />
                  ) : editMode ? (
                    t("labels.update")
                  ) : (
                    t("labels.save")
                  )}
                </Button>
                <Button onClick={handleCancel}>{t("labels.cancel")}</Button>
              </div>
            </Form>
          </div>
        </>
      )}
    </>
  );
};

export default AddProject;
