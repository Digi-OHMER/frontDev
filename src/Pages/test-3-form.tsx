import "./scss/test-3.scss";
import { Row, Col, Form, Input, Select, Button, DatePicker, Radio } from "antd";
import moment from "moment";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const { Item } = Form;
const { Option } = Select;

interface dataTypeForm {
  key: number;
  prefix: string;
  firstName: string;
  lastName: string;
  birthday: string;
  nationality: string;
  citizen1: string;
  citizen2: string;
  citizen3: string;
  citizen4: string;
  citizen5: string;
  gender: string;
  phone1: string;
  phone2: string;
  passport: string;
  salary: string;
}

interface FormInputProps {
  onFinish: (values: dataTypeForm) => void;
  editInfo?: dataTypeForm;
}

const FormInput = ({ onFinish, editInfo }: FormInputProps) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  useEffect(() => {
    if (editInfo) {
      const formatData = {
        ...editInfo,
        birthday: moment(editInfo.birthday),
      };

      form.setFieldsValue(formatData);
    }
  }, [form, editInfo]);

  const isOnFinish = (values: dataTypeForm) => {
    onFinish(values);
    form.resetFields();
  };

  return (
    <Form form={form} onFinish={isOnFinish}>
      <Row gutter={[16, 16]}>
        <Col span={4}>
          <Item name="key" style={{ display: "none" }}>
            <Input />
          </Item>
          <Item label={t("prefix")} name="prefix" rules={[{ required: true }]}>
            <Select placeholder={t("prefix")}>
              <Option value="mr">{t("mr")}</Option>
              <Option value="mrs">{t("mrs")}</Option>
            </Select>
          </Item>
        </Col>
        <Col span={10}>
          <Item
            label={t("firstName")}
            name="firstName"
            rules={[{ required: true }]}
          >
            <Input />
          </Item>
        </Col>
        <Col span={10}>
          <Item
            label={t("lastName")}
            name="lastName"
            rules={[{ required: true }]}
          >
            <Input />
          </Item>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Item
            label={t("birthday")}
            name="birthday"
            rules={[{ required: true }]}
          >
            <DatePicker placeholder={t("dd_mm_yy")} format="MM DD YYYY" />
          </Item>
        </Col>
        <Col span={10}>
          <Item
            label={t("nationality")}
            name="nationality"
            rules={[{ required: true }]}
          >
            <Select placeholder={t("plx_select")}>
              <Option value="TH">{t("TH")}</Option>
              <Option value="EN">{t("EN")}</Option>
              <Option value="CH">{t("CH")}</Option>
              <Option value="IN">{t("IN")}</Option>
            </Select>
          </Item>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={20}>
          <Row justify="start" align="top" gutter={[16, 16]}>
            <Col span={6}>
              <Item label={t("citizen")} name="citizen1">
                <Input
                  type="text"
                  pattern="[0-9]*"
                  minLength={1}
                  maxLength={1}
                />
              </Item>
            </Col>
            -
            <Col span={5}>
              <Item name="citizen2">
                <Input
                  type="text"
                  pattern="[0-9]*"
                  minLength={4}
                  maxLength={4}
                />
              </Item>
            </Col>
            -
            <Col span={5}>
              <Item name="citizen3">
                <Input
                  type="text"
                  pattern="[0-9]*"
                  minLength={5}
                  maxLength={5}
                />
              </Item>
            </Col>
            -
            <Col span={4}>
              <Item name="citizen4">
                <Input
                  type="text"
                  pattern="[0-9]*"
                  minLength={2}
                  maxLength={2}
                />
              </Item>
            </Col>
            -
            <Col span={2}>
              <Item name="citizen5">
                <Input
                  type="text"
                  pattern="[0-9]*"
                  minLength={1}
                  maxLength={1}
                />
              </Item>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={20}>
          <Item label={t("gender")} name="gender" rules={[{ required: true }]}>
            <Radio.Group>
              <Radio value={"M"}>{t("male")}</Radio>
              <Radio value={"F"}>{t("female")}</Radio>
              <Radio value={"None"}>{t("undefined")}</Radio>
            </Radio.Group>
          </Item>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={15}>
          <Row justify="start" align="top" gutter={[16, 16]}>
            <Col span={10}>
              <Item
                label={t("phone")}
                name="phone1"
                rules={[{ required: true }]}
              >
                <Select placeholder={t("plx_select")}>
                  <Option value="+61">+61</Option>
                  <Option value="+66">+66</Option>
                  <Option value="+67">+67</Option>
                  <Option value="+88">+88</Option>
                </Select>
              </Item>
            </Col>
            -
            <Col span={12}>
              <Item name="phone2">
                <Input
                  type="text"
                  pattern="[0-9]*"
                  minLength={10}
                  maxLength={10}
                />
              </Item>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={10}>
          <Item label={t("passport")} name="passport">
            <Input />
          </Item>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={10}>
          <Item label={t("salary")} name="salary" rules={[{ required: true }]}>
            <Input />
          </Item>
        </Col>

        <Col
          span={3}
          offset={4}
          style={{
            display: editInfo && editInfo.key ? "none" : "block",
          }}
        >
          <Item>
            <Button htmlType="reset">{t("clearData")}</Button>
          </Item>
        </Col>
        <Col>
          <Item>
            <Button type="primary" htmlType="submit">
              {t("sentData")}
            </Button>
          </Item>
        </Col>
      </Row>
    </Form>
  );
};

export default FormInput;
