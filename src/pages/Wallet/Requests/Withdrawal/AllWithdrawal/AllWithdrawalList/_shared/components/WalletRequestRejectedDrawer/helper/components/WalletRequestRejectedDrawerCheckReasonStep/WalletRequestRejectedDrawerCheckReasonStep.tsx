import { useEffect, useState } from "react";

import { FormInstance } from "antd";

import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import { useLazyGetRejectReasonSelectListQuery } from "@infra/states/redux/Apis/wallet/requests/requestsWithDrawalApi";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";

import { FormTypeWalletRequestRejectedDrawer } from "../../@types/@formTypeWalletRequestRejectedDrawer";
import { GetRejectReasonSelectListResponse } from "../../@types/@getRejectReasonSelectList";

const WalletRequestRejectedDrawerCheckReasonStep = ({
  form,
}: {
  form: FormInstance<FormTypeWalletRequestRejectedDrawer>;
}) => {
  const [rejectReasonOption, setRejectReasonOption] =
    useState<GetRejectReasonSelectListResponse>([]);
  //? ================================ Api ================================
  const [getRejectReasonSelect, { isFetching: isGetRejectReasonSelectLoading }] =
    useLazyGetRejectReasonSelectListQuery();
  //? ================================ Effects ================================

  useEffect(() => {
    getRejectReasonSelect().unwrap().then(getRejectReasonSelectOnSuccess);
  }, []);
  // ================================ Util functions ================================
  const getRejectReasonSelectOnSuccess = (res: GetRejectReasonSelectListResponse) => {
    setRejectReasonOption(res);
  };
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

  return (
    <div>
      <CustomSelect
        rules={[REQUIRED_RULE]}
        options={rejectReasonOption}
        label="انتخاب دلیل رد درخواست"
        placeholder="انتخاب کنید"
        name="reason"
        loading={isGetRejectReasonSelectLoading}
        form={form}
      />
      <CustomTextArea
        rules={[REQUIRED_RULE]}
        label="توضیحات"
        placeholder="توضیحات را وارد کنید"
        name="description"
      />
    </div>
  );
};
export default WalletRequestRejectedDrawerCheckReasonStep;
