import { useState } from "react";

import { Form } from "antd";

import { CustomSelect, CustomTextArea } from "@components/CustomInputs";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import { useGetShopAllProductsRequestRejectReasonsQuery } from "@infra/states/redux/Apis/shop/products/productsApi";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";

import { ShopAllProductsRequestDetailRejectModalContentProps } from "./@types/@shopAllProductsRequestDetailRejectModalContent";

const ShopAllProductsRequestDetailRejectModalContent = ({
  form,
}: ShopAllProductsRequestDetailRejectModalContentProps) => {
  const [isRejectReasonOptionsOpen, setIsRejectReasonOptionsOpen] = useState(false);

  //? ================================  Api Calls ================================
  const {
    data: getShopAllProductsRequestRejectReasonsData,
    isFetching: isGetShopAllProductsRequestRejectReasonsLoading,
  } = useGetShopAllProductsRequestRejectReasonsQuery(undefined, {
    skip: !isRejectReasonOptionsOpen,
    refetchOnMountOrArgChange: true,
  });

  //* ================================ Util Functions ================================
  const rejectReasonOptions =
    getShopAllProductsRequestRejectReasonsData?.map((item) => ({
      id: item.name,
      title: item.title,
    })) ?? [];

  const onRejectReasonOptionsOpenChange = (visible: boolean) => {
    setIsRejectReasonOptionsOpen(visible);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form form={form} className="flex flex-col gap-4" layout="vertical">
      <CustomAlert
        type="warning"
        showIcon
        title="دلیل رد در صفحه درخواست به فروشنده نمایش داده می‌شود."
      />
      <CustomSelect
        form={form}
        name="rejectReason"
        label="علت رد"
        placeholder="انتخاب علت رد"
        options={rejectReasonOptions}
        isLoading={isGetShopAllProductsRequestRejectReasonsLoading}
        rules={[REQUIRED_RULE]}
        onOpenChange={onRejectReasonOptionsOpenChange}
      />
      <CustomTextArea
        name="rejectDescription"
        label="توضیحات رد"
        placeholder="توضیحات رد را بنویسید"
        autoSize={{ minRows: 3, maxRows: 5 }}
      />
    </Form>
  );
};

export default ShopAllProductsRequestDetailRejectModalContent;
