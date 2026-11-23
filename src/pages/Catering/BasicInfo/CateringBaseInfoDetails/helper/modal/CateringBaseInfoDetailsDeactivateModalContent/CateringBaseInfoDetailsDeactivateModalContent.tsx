import { Form } from "antd";

import { dataPlaceHolder } from "@infra/helpers/utils";

import { CateringBaseInfoDetailsDeactivateModalContentProps } from "./@types/@cateringBaseInfoDetailsDeactivateModalContent";

/* //todo [nima] remove when api will be ready */
// const deactivateReasonOptions = [
//   { id: 1, title: "تعطیلی" },
//   { id: 2, title: "عدم نیاز" },
//   { id: 3, title: "سایر" },
// ];

const CateringBaseInfoDetailsDeactivateModalContent = ({
  form,
  record,
  productCategoryTitle,
}: CateringBaseInfoDetailsDeactivateModalContentProps) => {
  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form form={form} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1 text-sm text-(--app-text)">
        <p>{`از غیرفعال‌کردن این ${productCategoryTitle} مطمئن هستید؟`}</p>
        <p>{dataPlaceHolder({ data: record?.title })}</p>
      </div>
      {/* //todo [nima] uncomment when api will be ready */}
      {/* <CustomSelect
        name="deactivateReason"
        label="علت غیر فعالسازی"
        placeholder="انتخاب کنید"
        options={deactivateReasonOptions}
        isLoading={false}
        form={form}
        rules={[REQUIRED_RULE]}
      /> */}
    </Form>
  );
};

export default CateringBaseInfoDetailsDeactivateModalContent;
