import { useEffect, useState } from "react";

import { Form } from "antd";

import CustomRadioGroup from "@components/CustomInputs/CustomRadioGroup/CustomRadioGroup";
import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import { useLazyGetReceivePaymentTypeQuery } from "@infra/states/redux/Apis/dorm/requests/dormRequestsApi";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";

import {
  GetReceivePaymentTypeResponse,
  ManualRegistrationConfirmBedAllocationModalContentProps,
} from "./@types/@manualRegistrationConfirmBedAllocationModalContent";
import "./_manualRegistrationConfirmBedAllocationModalContent.scss";

const ManualRegistrationConfirmBedAllocationModalContent = ({
  form,
  admissionId,
}: ManualRegistrationConfirmBedAllocationModalContentProps) => {
  const [paymentMethodOptions, setPaymentMethodOptions] = useState<
    { label: string; value: string }[]
  >([]);
  //? ================================  Api Calls ================================
  const [getPaymentTypes, { isFetching: isPaymentTypeDataLoading }] =
    useLazyGetReceivePaymentTypeQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (admissionId) {
      getPaymentTypes(admissionId).unwrap().then(getPaymentTypesSuccess);
    }
  }, []);

  //* ================================ Util Functions ================================
  const getPaymentTypesSuccess = async (value: GetReceivePaymentTypeResponse) => {
    if (value?.status === 200) {
      setPaymentMethodOptions(
        value?.data?.map((item) => ({
          label: item?.AssociationPaymentType_title,
          value: item?.paymentTypeId?.toString(),
        }))
      );
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <Form
      className="manual-registration-confirmation-bed-allocation-modal-content-container"
      form={form}
    >
      <CustomRadioGroup
        name="paymentMethod"
        label="لطفاً نوع پرداخت را مشخص کنید."
        options={paymentMethodOptions}
        isLoading={isPaymentTypeDataLoading}
        rules={[REQUIRED_RULE]}
      />
      <p className="text">آیا از تخصیص این تخت از این اتاق به کاربر اطمینان دارید؟</p>
      <CustomTextArea label="توضیحات" name="description" showCount maxLength={100} />
    </Form>
  );
};

export default ManualRegistrationConfirmBedAllocationModalContent;
