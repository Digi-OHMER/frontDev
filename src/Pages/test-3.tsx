import { useTranslation } from "react-i18next";
import "./scss/test-3.scss";
import {
  Row,
  Col,
  Button,
  Table,
  Divider,
  Typography,
  Checkbox,
  Layout,
  Modal,
} from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";
import { addData, deleteData, editData } from "../provider/dataSlice";
import { RootState } from "../provider/store";
import FormInput from "./test-3-form";
import { useState } from "react";

const { Text } = Typography;

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

const Test3 = () => {
  const { t } = useTranslation();
  const [alreadySelectedRows, setAlreadySelectedRows] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<dataTypeForm>();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);

  const dispatch = useDispatch();

  const onFinish = (values: dataTypeForm) => {
    const addTable = {
      ...values,
      birthday: values.birthday
        ? new Date(values.birthday).toLocaleDateString("en-US")
        : "",
    };
    if (values?.key) {
      dispatch(editData(addTable));
      setIsModalOpen(false);
    } else {
      const key =
        (JSON.parse(localStorage.getItem("data") || "[]").pop()?.key ?? 0) + 1;
      dispatch(
        addData({
          ...addTable,
          key,
        })
      );
    }
  };

  const columns = [
    {
      title: t("name_only"),
      dataIndex: "name",
      key: "name",
      width: 250,
      render: (_text: Text, record: dataTypeForm) => (
        <Text>{`${t(record?.prefix)} ${record?.firstName} ${
          record?.lastName
        }`}</Text>
      ),
      sorter: (a: dataTypeForm, b: dataTypeForm) => {
        const nameA = `${t(a.prefix)} ${a.firstName} ${
          a.lastName
        }`.toLowerCase();
        const nameB = `${t(b.prefix)} ${b.firstName} ${
          b.lastName
        }`.toLowerCase();
        return nameA.localeCompare(nameB);
      },
    },
    {
      title: t("gender"),
      dataIndex: "gender",
      key: "gender",
      width: 250,
      render: (_text: Text, record: dataTypeForm) => (
        <Text>
          {record.gender === "M"
            ? t("male")
            : record.gender === "F"
            ? t("female")
            : t("undefined")}
        </Text>
      ),
      sorter: (a: dataTypeForm, b: dataTypeForm) =>
        a.gender.localeCompare(b.gender),
    },
    {
      title: t("phone"),
      dataIndex: "phone",
      key: "phone",
      width: 600,
      render: (_text: Text, record: dataTypeForm) => (
        <Text>{`${record.phone1}${record.phone2}`}</Text>
      ),
      sorter: (a: dataTypeForm, b: dataTypeForm) => {
        const phoneA = `${a.phone1}${a.phone2}`;
        const phoneB = `${b.phone1}${b.phone2}`;
        return phoneA.localeCompare(phoneB);
      },
    },
    {
      title: t("nationality"),
      dataIndex: "nationality",
      key: "nationality",
      width: 250,
      render: (_text: Text, record: dataTypeForm) => (
        <Text>{t(record.nationality)}</Text>
      ),
      sorter: (a: dataTypeForm, b: dataTypeForm) =>
        t(a.nationality).localeCompare(t(b.nationality)),
    },

    {
      title: t("manage"),
      key: "manage",
      render: (_text: string, record: dataTypeForm) => (
        <Row justify="center" align="middle" gutter={[8, 8]}>
          <Col className="ColIcon" span={12}>
            <EditOutlined
              onClick={() => {
                editRow(record);
              }}
              className="Icon"
            />
          </Col>
          <Col className="ColIcon" span={12}>
            <DeleteOutlined
              onClick={() => {
                dispatch(deleteData(record.key));
              }}
              className="Icon"
            />
          </Col>
        </Row>
      ),
      width: 250,
    },
  ];

  const dataTable = useSelector((state: RootState) => state.data);
  const updatedDataExample = dataTable.map((item: dataTypeForm) => {
    return {
      ...item,
      name: `${item.prefix} ${item.firstName} ${item.lastName}`,
    };
  });

  const rmAll = () => {
    const selectedItems = dataTable.filter((item) =>
      alreadySelectedRows.includes(item.key)
    );
    selectedItems.map((item) => dispatch(deleteData(item.key)));
    setSelectAll(false);
  };

  const tableSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    const keys = checked ? updatedDataExample.map((item) => item.key) : [];
    setAlreadySelectedRows(keys);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const editRow = (record: dataTypeForm) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  return (
    <Layout className="Test3">
      <Row justify="center" align="bottom" className="RowLayoutBox">
        <Col span={24} className="CoxBox">
          <FormInput onFinish={onFinish} />
        </Col>
      </Row>
      <Row justify="center" align="top">
        <Col span={22}>
          <Divider />
          <Row justify="start" align="middle" className="RowCheckBox">
            <Checkbox
              checked={selectAll}
              onChange={(e) => tableSelectAll(e.target.checked)}
            >
              {t("select_all")}
            </Checkbox>
            <Button onClick={rmAll}>{t("delete_all")}</Button>
          </Row>
          <Table
            dataSource={updatedDataExample}
            columns={columns}
            rowSelection={{
              type: "checkbox",
              selectedRowKeys: alreadySelectedRows,
              onChange: (keys) =>
                setAlreadySelectedRows(keys.map((key) => Number(key))),
            }}
            pagination={{
              locale: {
                items_per_page: `/ ${t("page")}`,
              },
              current: page,
              pageSize: pageSize,
              total: updatedDataExample.length,
              pageSizeOptions: [3, 5, 10, 50],
              showSizeChanger: true,
              onShowSizeChange: (current, size) => {
                setPage(current);
                setPageSize(size);
              },
              onChange: (page, pageSize) => {
                setPage(page);
                setPageSize(pageSize);
              },
            }}
          />
          <Modal
            title={t("edit_information")}
            width={1152}
            open={isModalOpen}
            footer={null}
            centered
            onCancel={handleCancel}
          >
            <FormInput editInfo={selectedRecord} onFinish={onFinish} />
          </Modal>
          ;
        </Col>
      </Row>
    </Layout>
  );
};

export default Test3;
