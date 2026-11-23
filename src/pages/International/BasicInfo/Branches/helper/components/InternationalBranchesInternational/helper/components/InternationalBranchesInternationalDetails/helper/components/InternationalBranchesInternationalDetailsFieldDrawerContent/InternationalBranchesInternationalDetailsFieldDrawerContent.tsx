import { useState } from "react";

import { Form, Row } from "antd";
import { TransferItem, TransferProps } from "antd/es/transfer";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomTransfer from "@components/CustomInputs/CustomTransfer/CustomTransfer";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";

import { dataSourceTransferType } from "./@types/@dataSourceTransferType";
import { InternationalBranchesInternationalDetailsFieldDrawerContentPropsTypes } from "./@types/@internationalBranchesInternationalDetailsFieldDrawerContentPropsTypes";
import { itemRenderer } from "./@types/@itemRenderer";

const dataSource: dataSourceTransferType[] = [
  { id: 1, title: "مهندسی کامپیوتر" },
  { id: 2, title: "مهندسی صنایع" },
  { id: 3, title: "پزشکی" },
  { id: 4, title: "دندان پزشکی" },
  { id: 5, title: "داروسازی" },
  { id: 6, title: "سینما" },
  { id: 7, title: "مهندسی هوافضا" },
  { id: 8, title: "ریاضیات پایه" },
];
const InternationalBranchesInternationalDetailsFieldDrawerContent = ({
  closeDrawerHandler,
}: InternationalBranchesInternationalDetailsFieldDrawerContentPropsTypes) => {
  const [targetKeys, setTargetKeys] = useState<TransferProps["targetKeys"]>();
  const [selectedKeys, setSelectedKeys] = useState<TransferProps["targetKeys"]>([]);
  const [form] = Form.useForm<TransferItem>();
  //? ================================ Util functions  ================================
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
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

  return (
    <Form form={form} className="">
      <CustomDrawerHeader
        title="افزودن رشته"
        closeDrawerHandler={closeDrawerHandler}
        leftSideContent={<CustomButton type="primary">ثبت رشته ها</CustomButton>}
      />
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol
          xl={12}
          lg={12}
          md={12}
          xs={12}
          label="نام واحد"
          value="واحد تهران جنوب"
        />
      </Row>
      <CustomAlert
        showIcon
        message="راهنما"
        description={
          <>
            برای افزودن رشته‌های تحصیلی به این واحد بین‌الملل، لطفا مراحل زیر را دنبال
            نمایید:{" "}
            <ol className="list-decimal! p-6!">
              <li>
                انتخاب رشته‌ها: از لیست رشته‌های تحصیلی موجود در سمت راست، رشته‌هایی که
                می‌خواهید به این واحد بین‌الملل اضافه کنید را انتخاب نمایید.
              </li>
              <li>
                انتقال رشته‌ها: پس از انتخاب رشته‌های مورد نظر، با استفاده از دکمه یا فلشی
                که معمولاً برای انتقال موارد بین دو لیست در نظر گرفته شده است، رشته‌های
                انتخابی را به سمت چپ منتقل کنید. این بخش نشان‌دهنده لیستی از رشته‌های
                تحصیلی است که به این واحد بین‌الملل تعلق دارند.
              </li>
            </ol>
          </>
        }
        type="info"
        className="m-7! border-dashed! pb-6!"
      />
      <CustomTransfer
        titles={["رشته‌های تحصیلی", "رشته‌های تحصیلی انتخاب شده"]}
        onChange={onChange}
        targetKeys={targetKeys}
        selectedKeys={selectedKeys}
        onSelectChange={onSelectChange}
        dataSource={transferSourceCreator(dataSource)}
        render={itemRenderer}
        pagination
        showSearch
      />
    </Form>
  );
};
export default InternationalBranchesInternationalDetailsFieldDrawerContent;
