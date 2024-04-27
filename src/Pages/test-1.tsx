import { useState } from "react";
import "./scss/test-1.scss";
import { Row, Col, Divider, Typography } from "antd";
import { useTranslation } from "react-i18next";
const { Text } = Typography;

const Test1 = () => {
  const { t } = useTranslation();
  const [onTopDown, setOnTopDown] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [divMathFigure, setDivMathFigure] = useState([
    <div key="0" className="squareBox"></div>,
    <div key="1" className="circle"></div>,
    <div key="2" className="oval"></div>,
    <div key="3" className="trapezoid"></div>,
    <div key="4" className="rectangle"></div>,
    <div key="5" className="parallelogram"></div>,
  ]);

  const clickTopDown = () => {
    setOnTopDown(!onTopDown);
  };

  const switchArray = (cLeft: boolean) => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex + (cLeft ? 1 : -1) + divMathFigure.length) %
        divMathFigure.length
    );
  };

  const randomArray = () => {
    const switchaArr = [...divMathFigure];
    for (let i = switchaArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [switchaArr[i], switchaArr[j]] = [switchaArr[j], switchaArr[i]];
    }
    setDivMathFigure(switchaArr);
  };

  const RowTop = (
    <Row justify="center" align="top" className="RowBox" gutter={16}>
      <Col span={6} offset={6}>
        <div className="ColBox" onClick={randomArray}>
          {!onTopDown
            ? divMathFigure[(currentIndex + 0) % divMathFigure.length]
            : divMathFigure[(currentIndex + 3) % divMathFigure.length]}
        </div>
      </Col>
      <Col span={6}>
        <div className="ColBox" onClick={randomArray}>
          {!onTopDown
            ? divMathFigure[(currentIndex + 1) % divMathFigure.length]
            : divMathFigure[(currentIndex + 4) % divMathFigure.length]}
        </div>
      </Col>
      <Col span={6}>
        <div className="ColBox" onClick={randomArray}>
          {!onTopDown
            ? divMathFigure[(currentIndex + 2) % divMathFigure.length]
            : divMathFigure[(currentIndex + 5) % divMathFigure.length]}
        </div>
      </Col>
    </Row>
  );

  const RowDown = (
    <Row justify="center" align="top" className="RowBox" gutter={16}>
      <Col span={6} offset={0}>
        <div className="ColBox" onClick={randomArray}>
          {!onTopDown
            ? divMathFigure[(currentIndex + 3) % divMathFigure.length]
            : divMathFigure[(currentIndex + 0) % divMathFigure.length]}
        </div>
      </Col>
      <Col span={6}>
        <div className="ColBox" onClick={randomArray}>
          {!onTopDown
            ? divMathFigure[(currentIndex + 4) % divMathFigure.length]
            : divMathFigure[(currentIndex + 1) % divMathFigure.length]}
        </div>
      </Col>
      <Col span={6}>
        <div className="ColBox" onClick={randomArray}>
          {!onTopDown
            ? divMathFigure[(currentIndex + 5) % divMathFigure.length]
            : divMathFigure[(currentIndex + 2) % divMathFigure.length]}
        </div>
      </Col>
    </Row>
  );

  return (
    <div className="Test1">
      <Row justify="center" align="top" gutter={16} className="RowBox">
        <Col span={6}>
          <div className="ColBox" onClick={() => switchArray(true)}>
            <div className="triangle-left"></div>
          </div>
        </Col>
        <Col span={12}>
          <div className="ColBox" onClick={clickTopDown}>
            <Col className="ColSubBox" span={12}>
              <div className="triangle-up"></div>
            </Col>
            <Col className="ColSubBox" span={12}>
              <div className="triangle-down"></div>
            </Col>
          </div>
        </Col>
        <Col span={6}>
          <div className="ColBox" onClick={() => switchArray(false)}>
            <div className="triangle-right"></div>
          </div>
        </Col>

        <Row justify="center" align="top" gutter={16} className="RowSubBox">
          <Col className="RowColSubBox" span={6}>
            <Text className="TitleBox"> {t("move_shape")} </Text>
          </Col>
          <Col className="RowColSubBox" span={12}>
            <Text className="TitleBox"> {t("move_position")} </Text>
          </Col>
          <Col className="RowColSubBox" span={6}>
            <Text className="TitleBox"> {t("move_shape")} </Text>
          </Col>
        </Row>
      </Row>
      <Divider />
      {!onTopDown ? (
        <>
          {RowTop}
          {RowDown}
        </>
      ) : (
        <>
          {RowDown}
          {RowTop}
        </>
      )}
    </div>
  );
};

export default Test1;
