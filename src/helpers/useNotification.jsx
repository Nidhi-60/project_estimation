import { notification } from "antd";

const useNotification = () => {
  const [api, contextHolder] = notification.useNotification();

  const notificationContainer = (type, message) => {
    api[type]({
      message: message,
    });
  };

  return [notificationContainer, contextHolder];
};

export default useNotification;
