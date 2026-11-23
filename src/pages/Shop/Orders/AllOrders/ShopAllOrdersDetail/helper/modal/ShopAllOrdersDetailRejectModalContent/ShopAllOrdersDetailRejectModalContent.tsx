import { Form } from "antd";

import { CustomSelect, CustomTextArea } from "@components/CustomInputs";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import { useGetRejectReasonsListQuery } from "@infra/states/redux/Apis/shop/orders/ordersApi";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import { ShopAllOrdersDetailRejectModalContentProps } from "@pages/Shop/Orders/AllOrders/ShopAllOrdersDetail/helper/modal/ShopAllOrdersDetailRejectModalContent/@types/@shopAllOrdersDetailRejectModalContent";

const ShopAllOrdersDetailRejectModalContent = ({
  form,
}: ShopAllOrdersDetailRejectModalContentProps) => {
  //? ================================  Api Calls ================================
  const { data: getRejectReasonsListData, isFetching: isGetRejectReasonsListLoading } =
    useGetRejectReasonsListQuery();

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form form={form} className="flex flex-col gap-4" layout="vertical">
      <CustomAlert
        type="warning"
        showIcon
        title="خریدار مبلغ این کالا را پرداخت کرده است. با رد کالا، مبلغ آن به کیف پول خریدار برگردانده می‌شود."
      />
      <CustomSelect
        name="rejectReason"
        label="علت رد"
        placeholder="انتخاب علت رد"
        options={getRejectReasonsListData || []}
        form={form}
        rules={[REQUIRED_RULE]}
        isLoading={isGetRejectReasonsListLoading}
      />
      <CustomTextArea
        name="rejectDescription"
        label="توضیحات رد"
        placeholder="توضیحات رد را بنویسید"
      />
    </Form>
  );
};

export default ShopAllOrdersDetailRejectModalContent;
