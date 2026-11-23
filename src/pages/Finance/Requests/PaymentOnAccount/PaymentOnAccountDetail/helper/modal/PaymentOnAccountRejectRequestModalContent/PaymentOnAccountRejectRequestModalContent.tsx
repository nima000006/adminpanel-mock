import { useEffect } from "react";

import { Form, FormInstance } from "antd";

import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import { useLazyGetRejectReasonSelectListQuery } from "@infra/states/redux/Apis/wallet/requests/requestsApi";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";

import { PaymentOnAccountReasonRejectModalFormType } from "./@type/@paymentOnAccountRejectRequestModalContent";

const PaymentOnAccountRejectRequestModalContent = ({
  form,
}: {
  form: FormInstance<PaymentOnAccountReasonRejectModalFormType>;
}) => {
  //? ================================  Api Calls ================================
  // reject reason
  const [
    getRejectReason,
    { data: rejectReasonData, isFetching: rejectReasonDataIsLoading },
  ] = useLazyGetRejectReasonSelectListQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getRejectReason();
  }, []);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form form={form}>
      <CustomSelect
        label="دلیل رد درخواست"
        name="reasonReject"
        options={rejectReasonData}
        form={form}
        loading={rejectReasonDataIsLoading}
        rules={[REQUIRED_RULE]}
        {...{ placeholder: "انتخاب کنید" }}
      />
    </Form>
  );
};
export default PaymentOnAccountRejectRequestModalContent;
