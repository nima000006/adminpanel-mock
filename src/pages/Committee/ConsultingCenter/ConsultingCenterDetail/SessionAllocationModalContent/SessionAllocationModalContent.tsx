import { useEffect } from "react";

import { Form, FormInstance } from "antd";

import {
  GetConsultingCenterChangeSessionResponse,
  NotifType,
} from "./@types/@sessionAllocationModalContent";
import CustomCard from "../../../../../components/CustomCard/CustomCard";
import CustomDatePicker from "../../../../../components/CustomInputs/CustomDatePicker/CustomDatePicker";
import CustomInput from "../../../../../components/CustomInputs/CustomInput/CustomInput";
import CustomRadioGroup from "../../../../../components/CustomInputs/CustomRadioGroup/CustomRadioGroup";
import CustomSelect from "../../../../../components/CustomInputs/CustomSelect/CustomSelect";
import CustomTextArea from "../../../../../components/CustomInputs/CustomTextArea/CustomTextArea";
import CustomDivider from "../../../../../components/Renderers/CustomDivider/CustomDivider";
import { selectDefaultValueGenerator } from "../../../../../infrastructure/helpers/utils";
import {
  useGetConsultingCenterChangeSessionMutation,
  useLazyGetConsultantQuery,
  useLazyGetMeetingPlaceQuery,
  useLazyGetNotificationTypeQuery,
  useLazyGetTypeMeetingQuery,
} from "../../../../../infrastructure/states/redux/Apis/committee/consultingCenter/consultingCenterApi";
import { PADDING_20 } from "../../../../../infrastructure/VARS/globalStyles/globalStyles";
import { SelectInputType } from "../../ConsultingCenterDocuments/helper/components/DocumentsTable/@types/@documentsTable";
import { SESSION_CHANGE } from "../ConsultingCenterDetail/ConsultingCenterDetailHelpers/ConsultingCenterDetailHelpers";
import "./_sessionAllocationModalContent.scss";

const SessionAllocationModalContent = ({
  id,
  assignForm,
  from,
}: {
  id: number;
  assignForm: FormInstance<{
    sessionType: SelectInputType;
    datePicker: string;
    startTime: string;
    endTime: string;
    sessionLocation: SelectInputType;
    consultant: SelectInputType;
    description: string;
    fatherName: string;
    fatherPhone: string;
    motherName: string;
    motherPhone: string;
    notification: NotifType;
    sendMessage: string;
  }>;
  from: string;
}) => {
  //? ================================  Api Calls ================================
  // get the type meeting filed data f
  const [getTypeMeeting, { data: TypeMeetingData, isLoading: isTypeMeetingLoading }] =
    useLazyGetTypeMeetingQuery();

  // get the meeting place filed data from api
  const [getMeetingPlace, { data: MeetingPlaceData, isLoading: isMeetingPlaceLoading }] =
    useLazyGetMeetingPlaceQuery();

  // get the consulter filed data from api
  const [getConsultant, { data: consultantData, isLoading: isConsultantLoading }] =
    useLazyGetConsultantQuery();

  // get the notification type from api
  const [
    getNotificationType,
    { data: NotificationTypeData, isLoading: isNotificationTypeLoading },
  ] = useLazyGetNotificationTypeQuery();

  // get data from api for default CustomSelect filed.
  const [getDefaultData, { isLoading: isDefaultDataLoading }] =
    useGetConsultingCenterChangeSessionMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getTypeMeeting({ firstResult: 0, maxResults: 50 });
    getMeetingPlace({ firstResult: 0, maxResults: 50 });
    getConsultant({ firstResult: 0, maxResults: 50 });
    getNotificationType({ firstResult: 0, maxResults: 50 });
  }, []);

  useEffect(() => {
    if (id) {
      getDefaultData({ _data_: { id: id?.toString() } })
        .unwrap()
        .then(onGetDefaultSuccess);
    }
  }, [id]);

  //* ================================ Util Functions ================================
  // this function runs if (getDefaultData) request is success.
  const onGetDefaultSuccess = async (value: GetConsultingCenterChangeSessionResponse) => {
    if (value?.status === 200 && from === SESSION_CHANGE) {
      assignForm?.setFieldsValue({
        sessionType: selectDefaultValueGenerator(value?.data?.AssociationMeetingType),
        datePicker: value?.data?.meetingDate,
        startTime: value?.data?.meetingStartTime,
        endTime: value?.data?.meetingEndTime,
        sessionLocation: selectDefaultValueGenerator(
          value?.data?.AssociationMeetingPlace
        ),
        consultant: selectDefaultValueGenerator(value?.data?.AssociationConsultant),
        description: value?.data?.desc,
        fatherName: value?.data?.fatherName,
        fatherPhone: value?.data?.fatherPhoneNumber,
        motherName: value?.data?.motherName,
        motherPhone: value?.data?.motherPhoneNumber,
        notification: value?.data?.AssociationNotificationType as NotifType,
        sendMessage: value?.data?.sentMessage,
      });
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <CustomCard
      padding={PADDING_20}
      className="committee-session-allocation-modal-container"
      loading={isDefaultDataLoading}
    >
      <Form form={assignForm}>
        <div className="session-info-wrapper">
          <CustomDivider text="اطلاعات جلسه" />
          <div className="select-wrapper">
            <CustomSelect
              form={assignForm}
              label="نوع جلسه"
              name="sessionType"
              isLoading={isTypeMeetingLoading}
              options={TypeMeetingData?.data}
              placeholder="انتخاب کنید/ فردی ، خانوادگی"
            />
            <CustomDatePicker
              form={assignForm}
              label="تاریخ جلسه"
              // className="date-picker"
              placeholder="انتخاب کنید"
              name="datePicker"
              // rules={[REQUIRED_RULE]}
              defaultValue={assignForm.getFieldsValue().datePicker}
              key={assignForm.getFieldsValue().datePicker}
            />
            <CustomInput
              type="text"
              label="ساعت شروع"
              name="startTime"
              placeholder="عنوان"
            />
            <CustomInput
              type="text"
              label="ساعت پایان"
              name="endTime"
              placeholder="ساعت"
            />
            <CustomSelect
              form={assignForm}
              label="مکان جلسه"
              name="sessionLocation"
              isLoading={isMeetingPlaceLoading}
              options={MeetingPlaceData?.data}
              placeholder="انتخاب کنید"
            />
            <CustomSelect
              form={assignForm}
              label="مشاور"
              name="consultant"
              isLoading={isConsultantLoading}
              options={consultantData?.data}
              placeholder="انتخاب کنید"
            />
          </div>
          <CustomTextArea label="توضیحات" name="description" placeholder="توضیحات" />
        </div>

        {/* <div className="attachment-container">
              <CustomDivider  text="پیوست‌ها" />
          <Upload className="upload-container" listType="picture" multiple>
            <Button icon={<AiOutlineUpload />} className="custom-btn">
              بارگذاری تصاویر
            </Button>
          </Upload>
        </div> */}
        <div className="family-info-wrapper">
          <CustomDivider text="اطلاعات خانواده" />
          <div className="family-info-inputs-wrapper">
            <CustomInput
              type="text"
              label="نام و نام خانوادگی پدر"
              name="fatherName"
              placeholder="پدر"
            />
            <CustomInput
              type="text"
              label="شماره موبایل پدر"
              name="fatherPhone"
              placeholder="شماره موبایل پدر"
            />
            <CustomInput
              type="text"
              label="نام و نام خانوادگی مادر"
              name="motherName"
              placeholder="مادر"
            />
            <CustomInput
              type="text"
              label="شماره موبایل مادر"
              name="motherPhone"
              placeholder="شماره موبایل مادر"
            />
          </div>
        </div>
        <div className="notices-wrapper">
          <CustomDivider text=" اطلاع رسانی" />
          <div className="notices-content-wrapper">
            <CustomRadioGroup
              name="notification"
              label="نوع"
              isLoading={isNotificationTypeLoading}
              options={NotificationTypeData?.data.map((item) => {
                return {
                  label: item.title,
                  value: item.id,
                };
              })}
              hasVerticalLabel={true}
            />
            <CustomTextArea
              label="پیام ارسالی"
              name="sendMessage"
              placeholder="توضیحات"
            />
          </div>
        </div>
      </Form>
    </CustomCard>
  );
};
export default SessionAllocationModalContent;
