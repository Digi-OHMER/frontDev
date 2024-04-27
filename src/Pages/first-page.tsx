import "../App.scss";
import { Typography } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
const { Text } = Typography;

const FirstPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const toPage = (route: string) => {
    navigate(route);
  };

  return (
    <div className="App">
      <div className="Box" onClick={() => toPage("./Test1")}>
        <Text className="BoldText">{t("test_1")}</Text>
        <Text>{t("test_detail_1")}</Text>
      </div>
      <div className="BoxDisabled">
        <Text className="BoldText">{t("test_2")}</Text>
        <Text>{t("test_detail_2")}</Text>
      </div>
      <div className="Box" onClick={() => toPage("./Test3")}>
        <Text className="BoldText">{t("test_3")}</Text>
        <Text>{t("test_detail_3")}</Text>
      </div>
    </div>
  );
};

export default FirstPage;
