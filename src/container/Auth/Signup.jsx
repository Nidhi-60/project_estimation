import { Button, Form, Input, Spin } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import {
  useCreateUserMutation,
  useGetUserQuery,
} from "../../redux/services/auth";
import useNotification from "../../helpers/useNotification";

const Signup = () => {
  const [t, _] = useTranslation("global");
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [createUser, { isLoading }] = useCreateUserMutation();
  const { data: users } = useGetUserQuery();
  const navigate = useNavigate();
  const [notificationContainer, contextHolder] = useNotification();

  const onFinish = (values) => {
    let findedUser = users.find(
      (ele) => ele.email === values.email && ele.username === values.username
    );

    if (findedUser) {
      notificationContainer("warning", `${t("message.emailExists")}`);
    } else {
      createUser({ ...values, _id: uuidv4() });
      navigate("/signin");
    }
  };

  const handleTextChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  return (
    <div className="form-container">
      {contextHolder}

      <div className="form-base">
        <div>
          <p className="header1">{t("labels.createAccount")}</p>
          <p className="header2">{t("message.accountToContinue")}</p>
        </div>
        <Form
          name="basic"
          onFinish={onFinish}
          autoComplete="off"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 24 }}
          style={{ maxWidth: 600 }}
          layout="vertical"
        >
          <Form.Item
            label={t("labels.email")}
            name="email"
            rules={[{ required: true, message: `${t("message.inputEmail")}` }]}
            style={{
              width: "430px",
            }}
          >
            <Input
              onChange={handleTextChange}
              name="email"
              value={signupData.email}
            />
          </Form.Item>
          <Form.Item
            label={t("labels.username")}
            name="username"
            rules={[
              { required: true, message: `${t("message.inputUsername")}` },
            ]}
            style={{
              width: "430px",
            }}
          >
            <Input
              onChange={handleTextChange}
              name="username"
              value={signupData.username}
            />
          </Form.Item>
          <Form.Item
            label={
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>{t("labels.password")}</span>
                <Link
                  to="/forgot-password"
                  style={{ fontSize: "12px", marginLeft: "256px" }}
                >
                  {t("message.forgotPassword")}
                </Link>
              </div>
            }
            name="password"
            rules={[
              { required: true, message: `${t("message.inputPassword")}` },
            ]}
            style={{
              width: "100%",
            }}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input.Password
              onChange={handleTextChange}
              name="password"
              value={signupData.password}
            />
          </Form.Item>

          <Form.Item
            style={{
              width: "430px",
            }}
            label={false}
            colon={false}
          >
            <Button type="primary" htmlType="submit" block>
              {isLoading ? <Spin /> : t("labels.signup")}
            </Button>

            <p className="text-center">
              {t("message.alreadyAccount")}{" "}
              <Link to={"/signin"}>{t("labels.login")}</Link>
            </p>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
