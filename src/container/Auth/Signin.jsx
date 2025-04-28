import { Button, Form, Input, Spin } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import useNotification from "../../helpers/useNotification";
import { useSigninMutation } from "../../redux/services/auth";
import { useDispatch } from "react-redux";
import { login } from "../../redux/Slice/authSlice";

const Signin = () => {
  const [t, _] = useTranslation("global");
  const [signinData, setSigninData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [notificationContainer, contextHolder] = useNotification();
  const [signinDatas, { isLoading }] = useSigninMutation();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    let res = await signinDatas(values);
    if (res.data.length > 0) {
      notificationContainer("success", `${t("message.loginsuccess")}`);

      console.log(res);

      dispatch(
        login({
          isAuth: true,
          user: {
            email: res.data[0].email,
            id: res.data[0].id,
            username: res.data[0].username,
          },
        })
      );
      navigate("/dashboard");
    } else {
      notificationContainer("error", `${t("message.validcred")}`);
    }
  };

  const handleTextChange = (e) => {
    setSigninData({ ...signinData, [e.target.name]: e.target.value });
  };

  return (
    <div className="form-container">
      {contextHolder}

      <div className="form-base">
        <div>
          <p className="header1">{t("labels.loginAccount")}</p>
          <p className="header2">{t("message.accountToLogin")}</p>
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
              value={signinData.email}
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
              value={signinData.password}
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
              {isLoading ? <Spin /> : t("labels.signin")}
            </Button>

            <p className="text-center">
              {t("message.dontAccount")}{" "}
              <Link to={"/signup"}>{t("labels.createAccount")}</Link>
            </p>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Signin;
