import { useState } from "react";

import { Button, Form, Input, InputNumber, Switch } from "antd";
import { AiOutlineArrowUp } from "react-icons/ai";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";

import { PADDING_40 } from "../../../infrastructure/VARS/globalStyles/globalStyles";
import CustomCard from "../../CustomCard/CustomCard";
import "./_apartmentCreationInfo.scss";

type DataType = {
  key: React.Key;
  id: React.Key;
  dormCount: string;
  floorCount: string;
  isNew?: boolean;
};
interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text";
  record: DataType;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  // record,
  // index,
  children,
  ...restProps
}: any) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const ApartmentCreationInfo = () => {
  const [dataSource, setDataSource] = useState<any[]>([
    {
      key: 1,
      id: 1,
      dormCount: 1,
      floorCount: 1,
    },
  ]);
  const [editingKey, setEditingKey] = useState<any>("");
  const [form] = Form.useForm();

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
      width: "10%",
      editable: true,
    },
    {
      title: "تعداد ساختمان",
      dataIndex: "dormCount",
      key: "dormCount",
      width: "30%",
      editable: true,
    },
    {
      title: "تعداد طبقات ساختمان‌ها",
      dataIndex: "floorCount",
      key: "floorCount",
      width: "30%",
      editable: true,
    },
    {
      title: "",
      dataIndex: "",
      render: (_: any, record: DataType) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <div onClick={() => save(record.key)} style={{ marginRight: 8 }}>
              Save
            </div>
            {/* <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm> */}
          </span>
        ) : (
          <div onClick={() => edit(record)}>Edit</div>
        );
      },
    },
  ];

  //* ================================ Util Functions ================================
  const isEditing = (record: DataType) => record.key === editingKey;
  const edit = (record: Partial<DataType> & { key: React.Key }) => {
    form.setFieldsValue({ name: "", age: "", address: "", ...record });
    setEditingKey(record?.key);
  };

  // const cancel = () => {
  //   setEditingKey("");
  // };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as DataType;

      const newData = [...dataSource];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setDataSource(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setDataSource(newData);
        setEditingKey("");
      }
    } catch (_) {
      /* empty */
    }
  };

  const handleAdd = () => {
    const newData: DataType = {
      key: dataSource?.[dataSource.length]?.id ?? 0,
      id: dataSource?.[dataSource.length]?.id ?? 0,
      dormCount: dataSource?.[dataSource.length]?.dormCount ?? 0,
      floorCount: dataSource?.[dataSource.length]?.floorCount ?? 0,
      isNew: true,
    };
    setDataSource([...dataSource, newData]);
    // setCount(count + 1);
  };
  // const createNewRecord = (record: any) => {};
  // const RemoveRecord = (id: any) => {};
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => {
        return {
          record,
          inputType: "text",
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(record),
        };
      },
    };
  });

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <CustomCard className="apartment-info-create-container" padding={PADDING_40}>
      <div className="description-title-container">
        <div className="apartment-info-label">ایجاد ساختمان</div>
        <div className="desc-enabler">
          <Switch checkedChildren="فعال" unCheckedChildren="غیرفعال" />
        </div>
      </div>
      <div className="table-container">
        <Form form={form} component={false}>
          <CustomTable
            dataSource={dataSource}
            columns={mergedColumns}
            bordered={true}
            size="small"
            components={{
              body: {
                cell: EditableCell,
              },
            }}
          />
        </Form>
        <Button type="primary" className="new-row-btn" onClick={handleAdd}>
          سطر جدید
          <AiOutlineArrowUp className="new-row-btn-icon" />
        </Button>
      </div>
    </CustomCard>
  );
};

export default ApartmentCreationInfo;
