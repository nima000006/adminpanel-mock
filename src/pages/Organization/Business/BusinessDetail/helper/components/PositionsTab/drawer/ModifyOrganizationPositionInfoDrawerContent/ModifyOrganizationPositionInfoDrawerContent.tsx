import { useState } from "react";

import { Col, Form, Row, TransferProps } from "antd";
import { RenderResult, TransferItem } from "antd/es/transfer";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import CustomTransfer from "@components/CustomInputs/CustomTransfer/CustomTransfer";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";

import { ModifyOrganizationPositionInfoDrawerContentProps } from "../@types/@viewOrganizationPositionInfoProps";
import "./_modifyOrganizationPositionInfoDrawerContent.scss";

type itemRenderer = (item: TransferItem) => RenderResult;

type DataSourceType = {
  id: number;
  title: string;
};

const dataSource = [
  { id: 1, title: "مدیر کل سیستم" },
  { id: 2, title: "2مدیر کل سیستم" },
  { id: 3, title: "3مدیر کل سیستم" },
  { id: 4, title: "4مدیر کل سیستم" },
];

const ModifyOrganizationPositionInfoDrawerContent = ({
  closeDrawerHandler,
  isModifyDrawerOpen,
}: ModifyOrganizationPositionInfoDrawerContentProps) => {
  const [form] = Form.useForm();
  const cancelBtnHandler = () => {
    closeDrawerHandler();
  };

  const submitHandler = () => {};

  const [targetKeys, setTargetKeys] = useState<TransferProps["targetKeys"]>();
  const [selectedKeys, setSelectedKeys] = useState<TransferProps["targetKeys"]>([]);

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

  const transferSourceCreator: (data?: DataSourceType[]) => TransferItem[] = (
    data?: DataSourceType[]
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
    <div className="modify-organization-position-drawer-content-container">
      <CustomDrawerHeader
        title={
          isModifyDrawerOpen?.id !== -1
            ? "ویرایش سمت سازمانی"
            : "افزودن اطلاعات سمت سازمانی"
        }
        closeDrawerHandler={closeDrawerHandler}
        leftSideContent={
          <div className="drawer-btns-wrapper">
            <CustomButton onClick={cancelBtnHandler} title="انصراف">
              انصراف
            </CustomButton>
            <CustomButton type="primary" onClick={submitHandler}>
              {isModifyDrawerOpen?.id !== -1 ? "ثبت تغییرات" : "ثبت اطلاعات"}
            </CustomButton>
          </div>
        }
      />

      <div className="unit-type-allocation-drawer-content-wrapper">
        <div>
          <CustomDivider text={"اطلاعات سمت سازمانی"} />

          <Row gutter={[16, 16]}>
            <Col lg={12} md={12} sm={12} xs={24}>
              <CustomSelect
                name="positionType"
                label="نوع سمت"
                form={form}
                placeholder="انتخاب کنید"
                // isLoading={}
                options={[]}
                rules={[REQUIRED_RULE]}
              />
            </Col>
            <Col lg={12} md={12} sm={12} xs={24}>
              <CustomInput
                type="text"
                label="عنوان سمت"
                name="positionTitle"
                placeholder="به عنوان مثال مدیر کل"
                rules={[REQUIRED_RULE]}
              />
            </Col>
            <Col lg={24} sm={24} xs={24}>
              <CustomTextArea
                label="توضیحات "
                placeholder="توضیحات بیشتر در مورد اطلاعات سمت سازمانی"
                name="desc"
                maxLength={1024}
                showCount
              />
            </Col>
          </Row>
        </div>
        <div>
          <CustomDivider text={"ارائه دادن به واحدهای سازمانی"} />
          <CustomTransfer
            onChange={onChange}
            targetKeys={targetKeys}
            selectedKeys={selectedKeys}
            onSelectChange={onSelectChange}
            titles={["لیست واحدهای سازمانی", "لیست واحدهای سازمانی انتخاب شده"]}
            dataSource={transferSourceCreator(dataSource)}
            render={itemRenderer}
            pagination
            showSearch
          />
        </div>
      </div>
    </div>
  );
};
export default ModifyOrganizationPositionInfoDrawerContent;
