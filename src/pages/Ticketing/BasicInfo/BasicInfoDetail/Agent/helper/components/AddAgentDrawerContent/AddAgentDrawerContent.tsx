import { useState } from "react";

import { Col, Form, Row, TransferProps } from "antd";
import { TransferItem } from "antd/es/transfer";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomTransfer from "@components/CustomInputs/CustomTransfer/CustomTransfer";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import { serviceOptions } from "@pages/Finance/Accountants/_shared/utils";

import {
  AddAgentDrawerContentProps,
  dataSourceTransferType,
  itemRenderer,
} from "./@types/@AddAgentDrawerContentProps";
import "./_addAgentDrawerContent.scss";

const dataSource: dataSourceTransferType[] = [
  { id: 1, title: " مشکل در ورود به سامانه" },
  { id: 2, title: "مشکل در ثبت سفارش غذا" },
  { id: 3, title: "مشکل در پرداخت آنلاین" },
  { id: 4, title: "دندان پزشکی" },
  { id: 5, title: "مشکلات مربوط به تحویل غذا" },
  { id: 6, title: "مشکلات مربوط به رزرو خوابگاه" },
  { id: 7, title: "مشکلات مربوط به تحویل کارت دانشجویی" },
  { id: 8, title: "مشکلات مربوط به تحویل غذا" },
];
const AddAgentDrawerContent = ({ closeDrawer }: AddAgentDrawerContentProps) => {
  const [targetKeys, setTargetKeys] = useState<TransferProps["targetKeys"]>();
  const [selectedKeys, setSelectedKeys] = useState<TransferProps["targetKeys"]>([]);
  const [form] = Form.useForm();
  //* ================================ Util Functions ================================

  const onChange: TransferProps["onChange"] = (nextTargetKeys) => {
    setTargetKeys(nextTargetKeys);
  };
  const onSelectChange: TransferProps["onSelectChange"] = (
    sourceSelectedKeys,
    targetSelectedKeys
  ) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };
  const itemRenderer: itemRenderer = (item: TransferItem) => {
    return {
      key: item?.key || undefined,
      label: <>{item?.title}</> || <>نامشخص</>,
      value: item?.key?.toString() || "",
    };
  };

  const transferSourceCreator: (data?: dataSourceTransferType[]) => TransferItem[] = (
    data?: dataSourceTransferType[]
  ) => {
    if (!data) return [];
    return data?.map((item) => {
      return {
        key: item?.id,
        title: item?.title,
        description: item?.id?.toString(),
      };
    });
  };
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

  return (
    <Form form={form}>
      <CustomDrawerHeader
        title="افزودن دسترسی"
        closeDrawerHandler={closeDrawer}
        leftSideContent={
          <div className="flex gap-3">
            <CustomButton onClick={closeDrawer}>انصراف</CustomButton>
            <CustomButton type="primary" htmlType="submit">
              ثبت و افزودن
            </CustomButton>
          </div>
        }
      />
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <CustomSelect
            className="mb-0!"
            form={form}
            rules={[REQUIRED_RULE]}
            label="سرویس‌ها"
            name="service"
            mode="multiple"
            options={serviceOptions}
            placeholder="انتخاب کنید"
          />
        </Col>
        <Col span={24}>
          <CustomTransfer
            className="add-agent-custom-transfer-container mt-5!"
            titles={["لیست موضوع مشکلات", "موضوع مشکلات تخصیص داده شده"]}
            onChange={onChange}
            targetKeys={targetKeys}
            selectedKeys={selectedKeys}
            onSelectChange={onSelectChange}
            dataSource={transferSourceCreator(dataSource)}
            render={itemRenderer}
            pagination
            showSearch
          />
        </Col>
      </Row>
    </Form>
  );
};

export default AddAgentDrawerContent;
