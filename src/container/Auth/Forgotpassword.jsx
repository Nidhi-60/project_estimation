import { useTranslation } from "react-i18next";
import useNotification from "../../helpers/useNotification";
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from "../../redux/services/auth";

const ForgotPassword = () => {
  const [notificationContainer, contextHolder] = useNotification();
  const [t, _] = useTranslation("global");
  const { data: users } = useGetUserQuery();
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const navigate = useNavigate();

  const onFinish = (value) => {
    console.log(value);
    let findedUser = users.find((ele) => ele.email !== value.email);

    console.log(users);

    if (findedUser) {
      notificationContainer("warning", `${t("message.emailNotExists")}`);
    } else {
      if (value.password !== value.confirmPassword) {
        notificationContainer("warning", `${t("message.passwordNotMatch")}`);
      } else {
        let find = users.find((ele) => ele.email === value.email);

        console.log("find", find);

        updateUser({ ...find, password: value.password });
        navigate("/signin");
      }
    }
  };

  return (
    <>
      <div className="form-container">
        {contextHolder}

        <div className="form-base">
          <div>
            <p className="header1">{t("labels.forgotPassword")}</p>
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
              rules={[
                { required: true, message: `${t("message.inputEmail")}` },
              ]}
              style={{
                width: "430px",
              }}
            >
              <Input placeholder={t("labels.email")} />
            </Form.Item>

            <Form.Item
              label={t("labels.password")}
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
              <Input.Password placeholder={t("labels.password")} />
            </Form.Item>

            <Form.Item
              label={t("labels.confirmpassword")}
              name="confirmPassword"
              rules={[
                { required: true, message: `${t("message.inputPassword")}` },
              ]}
              style={{
                width: "100%",
              }}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input.Password placeholder={t("labels.confirmpassword")} />
            </Form.Item>

            <Form.Item
              style={{
                width: "430px",
              }}
              label={false}
              colon={false}
            >
              <Button type="primary" htmlType="submit" block>
                {isLoading ? <Spin /> : t("labels.save")}
              </Button>

              <p className="text-center">
                <Link to={"/signin"}>{t("labels.login")}</Link>
              </p>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
