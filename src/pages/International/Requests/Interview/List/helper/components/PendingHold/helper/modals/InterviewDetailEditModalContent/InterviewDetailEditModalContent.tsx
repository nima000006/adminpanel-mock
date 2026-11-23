import { useEffect, useState } from "react";

import { Col, Form, Row } from "antd";
import { PiLink } from "react-icons/pi";

import CustomDatePicker from "@components/CustomInputs/CustomDatePicker/CustomDatePicker";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { dataPlaceHolder, selectDefaultValueGenerator } from "@infra/helpers/utils";
import {
  useLazyGetInterviewDetailQuery,
  useLazyGetInterviewDurationListQuery,
  useLazyGetInterviewerListQuery,
} from "@infra/states/redux/Apis/international/request/requestApi";
import { multiSelectGenerator } from "@pages/_shared/utils";
import { GetInterviewDetailResponse } from "@pages/International/Requests/Interview/Detail/@types/@interviewDetail";

import {
  GetInterviewDurationListResponse,
  GetInterviewerListResponse,
  InterviewDetailEditModalContentProps,
  InterviewerListType,
} from "./@types/@interviewDetailEditModalContent";

const InterviewDetailEditModalContent = ({
  form,
  id,
}: InterviewDetailEditModalContentProps) => {
  const [interviewerData, setInterviewerData] = useState<InterviewerListType[]>([]);
  const [durationData, setDurationData] = useState<InterviewerListType[]>([]);

  //? ================================  Api Calls ================================
  // get modal content
  const [getDetailData, { data, isFetching: isDetailDataLoading }] =
    useLazyGetInterviewDetailQuery();

  // get interviewer list
  const [getInterviewerList, { isFetching: InterviewerListLoading }] =
    useLazyGetInterviewerListQuery();

  // get interview duration list
  const [getInterviewDurationList, { isFetching: InterviewDurationListLoading }] =
    useLazyGetInterviewDurationListQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      getDetailData(id?.toString()).unwrap().then(getDetailDataSuccess);
    }
  }, [id]);

  useEffect(() => {
    getInterviewerList().unwrap().then(getInterviewerListIsSuccess);
    getInterviewDurationList().unwrap().then(getInterviewDurationListIsSuccess);
  }, []);

  //* ================================ Util Functions ================================
  //success
  const getDetailDataSuccess = async (value: GetInterviewDetailResponse) => {
    form?.setFieldsValue({
      datePicker: value?.interview?.interviewDate,
      interviewTime: value?.interview?.interviewTime,
      duration: value?.interview?.interviewDurationTime,
      link: value?.interview?.link,
      interviewers: selectDefaultValueGenerator(value?.interviewMembers),
    });
  };

  const getInterviewerListIsSuccess = (value: GetInterviewerListResponse) => {
    setInterviewerData(value);
  };

  const getInterviewDurationListIsSuccess = (value: GetInterviewDurationListResponse) => {
    setDurationData(value);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="flex flex-col gap-6">
      <CustomAlert
        type="warning"
        showIcon
        description={
          "با توجه به اینکه تعویض زمان و تاریخ مصاحبه می‌تواند برای متقاضی ایجاد نارضایتی کند، خواهشمندیم در انتخاب زمان و تاریخ مصاحبه دقت لازم را داشته باشید."
        }
        closable
      />
      <Div loading={isDetailDataLoading}>
        <Form form={form}>
          <Row gutter={[16, 16]}>
            <Col lg={8} md={12} sm={24} xs={24}>
              <CustomDatePicker
                label="تاریخ مصاحبه"
                placeholder="انتخاب کنید"
                name="datePicker"
                form={form}
              />
            </Col>

            <Col lg={8} md={12} sm={24} xs={24}>
              <CustomInput type="text" label="زمان مصاحبه" name="interviewTime" />
            </Col>

            <Col lg={8} md={12} sm={24} xs={24}>
              <CustomSelect
                name="duration"
                placeholder="انتخاب کنید"
                options={durationData}
                form={form}
                label="مدت مصاحبه"
                loading={InterviewDurationListLoading}
              />
            </Col>

            <Col span={24}>
              <CustomInput
                label="لینک مصاحبه"
                name="link"
                suffix={<PiLink size={18} className="text-neutral-10" />}
              />
            </Col>

            <SingleVerticalWithCol
              xl={8}
              lg={8}
              label="مسئولین مصاحبه"
              value={dataPlaceHolder({
                data: data?.interviewAdmins,
                callBack: multiSelectGenerator,
              })}
            />

            <Col lg={8} md={12} sm={24} xs={24}>
              <CustomSelect
                name="interviewers"
                placeholder="انتخاب کنید"
                options={interviewerData}
                form={form}
                label="مصاحبه کنندگان"
                mode="multiple"
                loading={InterviewerListLoading}
              />
            </Col>
          </Row>
        </Form>
      </Div>
    </div>
  );
};

export default InterviewDetailEditModalContent;
