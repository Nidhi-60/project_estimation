import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import global_en from "./translate/es/global.json";
import global_guj from "./translate/guj/global.json";
import { store } from "./redux/store";
import Layout from "./container/Layout";
import ThemeWrapper from "./config/ThemeWrapper";

const App = () => {
  const [defaultLanguage, setDefaultLanguage] = useState("en");
  let lang = "";

  if (typeof window !== "undefined") {
    if (JSON.parse(localStorage.getItem("lang")) !== null) {
      lang = JSON.parse(localStorage.getItem("lang"));
    } else {
      localStorage.setItem("lang", JSON.stringify("en"));
    }
  }

  useEffect(() => {
    if (lang !== "") {
      setDefaultLanguage(lang);
    }
  }, [lang]);

  i18next.init({
    interpolation: { escapeValue: false },
    lng: defaultLanguage,
    resources: {
      en: {
        global: global_en,
      },
      guj: {
        global: global_guj,
      },
    },
  });

  return (
    <I18nextProvider i18n={i18next}>
      <Provider store={store}>
        <ThemeWrapper />
      </Provider>
    </I18nextProvider>
  );
};

export default App;
