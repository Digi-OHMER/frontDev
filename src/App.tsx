import "./App.scss";
import { useState, useEffect } from "react";
import { Layout, Typography, Select, Button } from "antd";
import { useTranslation } from "react-i18next";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import FirstPage from "./Pages/first-page";
import Test1 from "./Pages/test-1";
import Test3 from "./Pages/test-3";
import ErrorPage from "./Pages/error-page";
const { Title } = Typography;
const { Option } = Select;

const App = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [name, setTitleName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const updateName = () => {
      if (location.pathname === "/Test1") {
        setTitleName("test_detail_1");
      } else if (location.pathname === "/Test3") {
        setTitleName("test_detail_3");
      } else {
        setTitleName("");
      }
    };

    updateName();
  }, [location.pathname]);

  return (
    <Layout className="App">
      <Title level={2} className="TitleName">
        {t(name)}
      </Title>
      <Select
        defaultValue={i18n.language}
        className="I18nSelect"
        onChange={(value) => {
          i18n.changeLanguage(value);
        }}
      >
        <Option value="en">EN</Option>
        <Option value="th">TH</Option>
      </Select>
      <Button
        onClick={() => navigate("/")}
        style={{ display: location.pathname === "/" ? "none" : "block" }}
        className="btnHome"
      >
        {t("home")}
      </Button>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/Test1" element={<Test1 />} />
        <Route path="/Test3" element={<Test3 />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </Layout>
  );
};

export default App;
