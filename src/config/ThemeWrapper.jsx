import { ConfigProvider, theme } from "antd";
import { routes } from "../router/route";
import { useSelector } from "react-redux";
import { RouterProvider } from "react-router-dom";

const ThemeWrapper = () => {
  const { theme: themeMode } = useSelector((state) => state.globalConfig);

  return (
    <>
      <ConfigProvider
        theme={{
          algorithm:
            themeMode === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
        }}
      >
        <RouterProvider router={routes} />
      </ConfigProvider>
    </>
  );
};

export default ThemeWrapper;
