import { useEffect, useState } from "react";

import { Form } from "antd";

import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import { useLazyGetInternationalRequestReasonsQuery } from "@infra/states/redux/Apis/international/request/requestApi";
import { CUSTOM_REQUIRED_RULE } from "@infra/validation/validationSchema";
import { INTERNATIONAL_REASONS_ID } from "@pages/International/utils/internationalUtils";

import { DemandDetailRejectModalContentProps } from "./@types/@demandDetailRejectModalContent";
import {
  GetInternationalRequestReasonsResponse,
  InternationalRequestReasonsType,
} from "../../../@types/@demandDetail";

const DemandDetailRejectModalContent = ({
  form,
}: DemandDetailRejectModalContentProps) => {
  const [reasonList, setReasonList] = useState<InternationalRequestReasonsType[]>([]);

  //? ================================  Api Calls ================================
  const [getReasonList, { isFetching: isReasonDataLoading }] =
    useLazyGetInternationalRequestReasonsQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getReasonList(INTERNATIONAL_REASONS_ID?.rejectRequest)
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
        label="دلایل رد درخواست"
        loading={isReasonDataLoading}
        mode="multiple"
        rules={[CUSTOM_REQUIRED_RULE("لطفاً حداقل یک دلیل رد شدن را انتخاب نمایید.")]}
        maxTagCount="responsive"
      />
    </Form>
  );
};

export default DemandDetailRejectModalContent;
