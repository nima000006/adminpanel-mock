import { useState } from "react";

import { Row, TransferProps } from "antd";
import { RenderResult, TransferItem } from "antd/es/transfer";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomTransfer from "@components/CustomInputs/CustomTransfer/CustomTransfer";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import {
  ALLOCATION_POSITION_TYPE_FIRST_ROW,
  ALLOCATION_POSITION_TYPE_SECOND_ROW,
} from "@pages/Organization/Business/BusinessDetail/helper/utils/businessDetailUtils";

import { UnitTypeAllocationDrawerContentProps } from "../@type/@unitTypeAllocationDrawerContentType";
import "./_positionTypeAllocationDrawerContent.scss";

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

const PositionTypeAllocationDrawerContent = ({
  closeDrawerHandler,
}: UnitTypeAllocationDrawerContentProps) => {
  // handler
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
    <div className="position-type-allocation-drawer-content-container">
      <CustomDrawerHeader
        title={"تخصیص نوع سمت به شعب"}
        closeDrawerHandler={closeDrawerHandler}
        leftSideContent={
          <div className="drawer-btns-wrapper">
            <CustomButton onClick={cancelBtnHandler} title="انصراف">
              انصراف
            </CustomButton>
            <CustomButton type="primary" onClick={submitHandler}>
              ثبت
            </CustomButton>
          </div>
        }
      />

      <div className="position-type-allocation-drawer-content-wrapper">
        <CustomAlert
          message="توضیحات"
          description={
            <div className="alert-desc">
              <p>{ALLOCATION_POSITION_TYPE_FIRST_ROW}</p>
              <p>{ALLOCATION_POSITION_TYPE_SECOND_ROW}</p>
            </div>
          }
          showIcon
          className="alert"
        />

        <Row gutter={[12, 12]}>
          <SingleVerticalWithCol span={24} label="نوع سمت" value={"ریاست"} />
        </Row>

        <div>
          <CustomDivider text={"ارائه نوع سمت انتخاب شده به شعب"} />
          <CustomTransfer
            onChange={onChange}
            targetKeys={targetKeys}
            selectedKeys={selectedKeys}
            onSelectChange={onSelectChange}
            titles={["لیست شعب تعریف شده", "لیست شعب انتخاب شده"]}
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
export default PositionTypeAllocationDrawerContent;
