import { useEffect, useState } from "react";

import { Form } from "antd";

import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import { useLazyGetInternationalRequestReasonsQuery } from "@infra/states/redux/Apis/international/request/requestApi";
import { CUSTOM_REQUIRED_RULE } from "@infra/validation/validationSchema";
import { INTERNATIONAL_REASONS_ID } from "@pages/International/utils/internationalUtils";

import { DemandDetailEditModalContentProps } from "./@types/@demandDetailEditModalContent";
import {
  GetInternationalRequestReasonsResponse,
  InternationalRequestReasonsType,
} from "../../../@types/@demandDetail";

const DemandDetailEditModalContent = ({ form }: DemandDetailEditModalContentProps) => {
  const [reasonList, setReasonList] = useState<InternationalRequestReasonsType[]>([]);

  //? ================================  Api Calls ================================
  const [getReasonList, { isFetching: isReasonDataLoading }] =
    useLazyGetInternationalRequestReasonsQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getReasonList(INTERNATIONAL_REASONS_ID?.editRequest)
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
        label="دلایل اصلاح درخواست"
        loading={isReasonDataLoading}
        mode="multiple"
        rules={[
          CUSTOM_REQUIRED_RULE("لطفاً حداقل یک دلیل اصلاح درخواست را انتخاب نمایید."),
        ]}
      />
    </Form>
  );
};

export default DemandDetailEditModalContent;
