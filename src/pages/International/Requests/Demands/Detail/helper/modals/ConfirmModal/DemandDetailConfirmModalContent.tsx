import { useEffect, useState } from "react";

import { Form } from "antd";

import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import { useLazyGetInternationalRequestReasonsQuery } from "@infra/states/redux/Apis/international/request/requestApi";
import { INTERNATIONAL_REASONS_ID } from "@pages/International/utils/internationalUtils";

import { DemandDetailConfirmModalContentProps } from "./@types/@demandDetailConfirmModalContent";
import {
  GetInternationalRequestReasonsResponse,
  InternationalRequestReasonsType,
} from "../../../@types/@demandDetail";

const DemandDetailConfirmModalContent = ({
  form,
}: DemandDetailConfirmModalContentProps) => {
  const [reasonList, setReasonList] = useState<InternationalRequestReasonsType[]>([]);

  //? ================================  Api Calls ================================
  const [getReasonList, { isFetching: isReasonDataLoading }] =
    useLazyGetInternationalRequestReasonsQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getReasonList(INTERNATIONAL_REASONS_ID?.confirmRequest)
      .unwrap()
      .then(getReasonListSuccess);
  }, []);

  //* ================================ Util Functions ================================
  const getReasonListSuccess = (value: GetInternationalRequestReasonsResponse) => {
    setReasonList(value);
  };
  return (
    <Form form={form}>
      <CustomSelect
        name="reason"
        placeholder="انتخاب کنید"
        options={reasonList}
        form={form}
        label="دلیل تایید درخواست"
        loading={isReasonDataLoading}
      />
    </Form>
  );
};

export default DemandDetailConfirmModalContent;
