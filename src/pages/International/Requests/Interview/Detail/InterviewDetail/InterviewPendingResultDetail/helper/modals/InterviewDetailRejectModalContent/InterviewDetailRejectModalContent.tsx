import { useEffect, useState } from "react";

import { Form } from "antd";

import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import { useLazyGetInterviewReasonsWithTypeIdQuery } from "@infra/states/redux/Apis/international/request/requestApi";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";

import {
  GetInterviewReasonsWithTypeIdResponse,
  InterviewDetailRejectModalContentProps,
  InterviewReasonsType,
} from "./@types/@interviewDetailRejectModalContent";

const rejectReason = "0"; // عدد 0 برای دریافت لیست دلایل رد است که این عدد از سمت بک اند مشخص شده

const InterviewDetailRejectModalContent = ({
  form,
}: InterviewDetailRejectModalContentProps) => {
  const [reasonList, setReasonList] = useState<InterviewReasonsType[]>([]);

  //? ================================  Api Calls ================================
  const [getInterviewReasonList, { isFetching: isInterviewReasonListLoading }] =
    useLazyGetInterviewReasonsWithTypeIdQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getInterviewReasonList(rejectReason).unwrap().then(getInterviewReasonListSuccess);
  }, []);

  //* ================================ Util Functions ================================
  const getInterviewReasonListSuccess = (
    value: GetInterviewReasonsWithTypeIdResponse
  ) => {
    setReasonList(value);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form form={form}>
      <CustomSelect
        name="reason"
        placeholder="انتخاب کنید"
        options={reasonList}
        form={form}
        label="دلایل رد"
        loading={isInterviewReasonListLoading}
        rules={[REQUIRED_RULE]}
        mode="multiple"
      />
    </Form>
  );
};
export default InterviewDetailRejectModalContent;
