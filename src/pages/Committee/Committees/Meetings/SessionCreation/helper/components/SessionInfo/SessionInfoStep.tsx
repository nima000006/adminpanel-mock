import { useEffect } from "react";

import { Button, Form } from "antd";
import { useSearchParams } from "react-router";
import { toast } from "react-toastify";

import CustomDatePicker from "@components/CustomInputs/CustomDatePicker/CustomDatePicker";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import CustomTextArea from "@components/CustomInputs/CustomTextArea/CustomTextArea";
import CustomTimePicker from "@components/CustomInputs/CustomTimePicker/CustomTimePicker";
import Div from "@components/Renderers/Div/Div";
import {
  rawTimeConvertor,
  selectDefaultValueGenerator,
  timeDefaultValueGenerator,
} from "@infra/helpers/utils";
import {
  useAddSessionInformationMutation,
  useEditSessionInformationMutation,
  useGetSessionInformationMutation,
  useLazyGetPersonnelListQuery,
} from "@infra/states/redux/Apis/committee/committees/committees";
import { useLazyGetMeetingPlaceQuery } from "@infra/states/redux/Apis/committee/consultingCenter/consultingCenterApi";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";

import {
  AddSessionInformationResponse,
  GetSessionInformationResponse,
  SessionInfoDataType,
  SessionInfoStepProps,
} from "./@types/@sessionInfoStep";
import "./_sessionInfoStep.scss";

const SEND_INFORMATION_SUCCESS_MSG = "اطلاعات جلسه با موفقیت ثبت شد.";

const SessionInfoStep = ({ setCurrent }: SessionInfoStepProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { id } = Object.fromEntries([...searchParams]);
  const [sessionInfoForm] = Form.useForm();

  //? ================================  Api Calls ================================
  const [getPersonalData, { data: personalData, isLoading: isPersonalDataLoading }] =
    useLazyGetPersonnelListQuery();

  const [
    getMeetingPlaceData,
    { data: meetingPlaceData, isLoading: isMeetingPlaceDataLoading },
  ] = useLazyGetMeetingPlaceQuery();

  const [sendInformation, { isLoading: isInformationDataLoading }] =
    useAddSessionInformationMutation();

  const [sendEditInformation, { isLoading: isEditInformationDataLoading }] =
    useEditSessionInformationMutation();

  // edit mode
  const [getSessionInfo, { data: sessionInfoData, isLoading: isSessionInfoLoading }] =
    useGetSessionInformationMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (+id > 0) {
      getSessionInfo({
        _data_: {
          id: id,
        },
      })
        .unwrap()
        .then(getSessionInfoOnSuccess);
    }
  }, [id]);

  useEffect(() => {
    getPersonalData();
    getMeetingPlaceData({ firstResult: 0, maxResults: 50 });
  }, []);

  //* ================================ Util Functions ================================
  const getSessionInfoOnSuccess = (value: GetSessionInformationResponse) => {
    if (value?.status === 200) {
      sessionInfoForm.setFieldsValue({
        sessionTitle: value?.data?.topicMeeting,
        startTime: timeDefaultValueGenerator(value?.data?.meetingTime),
        endTime: timeDefaultValueGenerator(value?.data?.meetingEndTime),
        sessionLocation: selectDefaultValueGenerator(
          value?.data?.AssociationMeetingPlace
        ),
        sessionSecretary: selectDefaultValueGenerator(value?.data?.AssociationPersonnel),
        sessionDesc: value?.data?.desc,
        meetingDate: value?.data?.meetingDate,
      });
    }
  };

  const sessionInfoHandler = (event: SessionInfoDataType) => {
    const data = {
      form: "SessionInformation",
      id: "886fede1eb5e47948b0fb54e19804e7e",
      _data_: {
        topicMeeting: event.sessionTitle,
        meetingDate: event.meetingDate,
        meetingTime: rawTimeConvertor(event.startTime),
        meetingEndTime: rawTimeConvertor(event.endTime),
        placeMeeting: event.sessionLocation?.item?.id,
        secretary: event.sessionSecretary?.item?.id,
        desc: event.sessionDesc,
        id: id ? id : null,
      },
    };

    if (id) {
      data._data_.id = id;
      sendEditInformation(data).unwrap().then(sendInformationOnsuccess);
    } else {
      data._data_.id = null;
      sendInformation(data).unwrap().then(sendInformationOnsuccess);
    }
  };

  const sendInformationOnsuccess = (value: AddSessionInformationResponse) => {
    if (value.status === 200) {
      toast.success(SEND_INFORMATION_SUCCESS_MSG, {
        toastId: SEND_INFORMATION_SUCCESS_MSG,
      });
      setSearchParams({
        id: value?.data?.id?.toString(),
        step: "2",
      });
      setCurrent((prev) => (prev < 3 ? prev + 1 : 3));
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form
      className="committee-session-creation-session-info-step-container"
      onFinish={sessionInfoHandler}
      form={sessionInfoForm}
    >
      <Div className="border-round-box grid-cols-2" loading={isSessionInfoLoading}>
        <CustomInput
          type="text"
          label="عنوان جلسه"
          name="sessionTitle"
          placeholder="عنوان"
          rules={[REQUIRED_RULE]}
        />
        <CustomDatePicker
          label="تاریخ جلسه"
          // className="date-picker"
          placeholder="انتخاب کنید"
          name="meetingDate"
          rules={[REQUIRED_RULE]}
          form={sessionInfoForm}
          defaultValue={sessionInfoData?.data?.meetingDate}
          key={sessionInfoData?.data?.meetingDate}
        />
        <CustomTimePicker
          label="ساعت شروع"
          name="startTime"
          placeholder="ساعت"
          rules={[REQUIRED_RULE]}
        />
        <CustomTimePicker
          label="ساعت پایان"
          name="endTime"
          placeholder="ساعت"
          rules={[REQUIRED_RULE]}
        />
        <CustomSelect
          name="sessionLocation"
          label="مکان جلسه"
          options={meetingPlaceData?.data}
          isLoading={isMeetingPlaceDataLoading}
          form={sessionInfoForm}
          placeholder="انتخاب کنید"
          rules={[REQUIRED_RULE]}
        />
        <CustomSelect
          name="sessionSecretary"
          label="دبیر جلسه"
          options={personalData?.data}
          isLoading={isPersonalDataLoading}
          form={sessionInfoForm}
          placeholder="انتخاب کنید"
          rules={[REQUIRED_RULE]}
        />
        <div className="desc-wrapper">
          <CustomTextArea label="توضیحات" placeholder="توضیحات" name="sessionDesc" />
        </div>
      </Div>
      <div className="buttons-container">
        <Button
          type="primary"
          htmlType="submit"
          loading={isInformationDataLoading || isEditInformationDataLoading}
        >
          بعدی
        </Button>
      </div>
    </Form>
  );
};

export default SessionInfoStep;
