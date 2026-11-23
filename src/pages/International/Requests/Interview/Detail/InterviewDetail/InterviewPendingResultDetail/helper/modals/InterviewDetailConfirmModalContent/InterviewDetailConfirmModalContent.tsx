import { useEffect, useState } from "react";

import { Form } from "antd";

import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import { useLazyGetInterviewReasonsWithTypeIdQuery } from "@infra/states/redux/Apis/international/request/requestApi";

import { InterviewDetailConfirmModalContentProps } from "./@types/@interviewDetailConfirmModalContent";
import {
  GetInterviewReasonsWithTypeIdResponse,
  InterviewReasonsType,
} from "../InterviewDetailRejectModalContent/@types/@interviewDetailRejectModalContent";

const acceptReason = "1"; // عدد 1 برای دریافت لیست دلایل تایید است که این عدد از سمت بک اند مشخص شده

const InterviewDetailConfirmModalContent = ({
  form,
}: InterviewDetailConfirmModalContentProps) => {
  const [reasonList, setReasonList] = useState<InterviewReasonsType[]>([]);

  //? ================================  Api Calls ================================
  const [getInterviewReasonList, { isFetching: isInterviewReasonListLoading }] =
    useLazyGetInterviewReasonsWithTypeIdQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    getInterviewReasonList(acceptReason).unwrap().then(getInterviewReasonListSuccess);
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
        label="دلیل تایید(اختیاری) "
        loading={isInterviewReasonListLoading}
      />
    </Form>
  );
};
export default InterviewDetailConfirmModalContent;
