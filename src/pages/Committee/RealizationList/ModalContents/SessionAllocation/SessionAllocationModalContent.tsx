import { useEffect, useState } from "react";

import { Form, FormInstance } from "antd";
import moment from "jalali-moment";

import { SelectInputType } from "@pages/Committee/ConsultingCenter/ConsultingCenterDocuments/helper/components/DocumentsTable/@types/@documentsTable";

import {
  CommitteeRealizationOtherFile,
  NotifType,
} from "./@types/@sessionAllocationModalContent";
import CustomCard from "../../../../../components/CustomCard/CustomCard";
import CustomRadioGroup from "../../../../../components/CustomInputs/CustomRadioGroup/CustomRadioGroup";
import CustomSelect from "../../../../../components/CustomInputs/CustomSelect/CustomSelect";
import CustomSwitch from "../../../../../components/CustomInputs/CustomSwitch/CustomSwitch";
import CustomTextArea from "../../../../../components/CustomInputs/CustomTextArea/CustomTextArea";
import CustomDivider from "../../../../../components/Renderers/CustomDivider/CustomDivider";
import { selectDefaultValueGenerator } from "../../../../../infrastructure/helpers/utils";
import {
  useGetCommitteeRealizationAllDataChangeMeetingMutation,
  useLazyCommitteeRealizationGetOtherFilesQuery,
  useLazyGetCommitteeRealizationPresentationQuery,
  useLazyGetCommitteeRealizationSelectionMeetingQuery,
  useLazyGetCommitteeRealizationSessionDurationQuery,
  useLazyGetNoticesQuery,
} from "../../../../../infrastructure/states/redux/Apis/committee/committees/committees";
import { REQUIRED_RULE } from "../../../../../infrastructure/validation/validationSchema";
import { PADDING_20 } from "../../../../../infrastructure/VARS/globalStyles/globalStyles";
import { RealizationListAllocationFormData } from "../../CommitteeRealizationList/helper/components/RealizationListTable/@types/@realizationListTable";
import { SESSION_CHANGE } from "../../CommitteeRealizationList/helper/components/RealizationListTable/RealizationListTableHelpers/RealizationListTableHelpers";
import "./_sessionAllocationModalContent.scss";

// other file component
const OtherFilesContent = ({
  id,
  data,
  setData,
}: {
  id?: number;
  data?: CommitteeRealizationOtherFile[];
  setData: React.Dispatch<React.SetStateAction<CommitteeRealizationOtherFile[]>>;
}) => {
  //? ================================  Api Calls ================================
  // get the other files section
  const [
    committeeRealizationGetOtherFiles,
    { data: otherFilesData, isLoading: isOtherFilesLoading },
  ] = useLazyCommitteeRealizationGetOtherFilesQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      committeeRealizationGetOtherFiles({
        maxResults: 8,
        AssociationUnderstandingMeeting_id_EQ: id,
      });
    }
  }, [id]);

  useEffect(() => {
    if (otherFilesData?.status === 200 && otherFilesData?.data) {
      setData(otherFilesData?.data);
    }
  }, [otherFilesData?.status]);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <CustomCard loading={isOtherFilesLoading} className="other-files-session">
      <CustomDivider text="پرونده‌های دیگر این جلسه" />
      <div className="others-file-wrapper">
        {data
          ? data.map((item: CommitteeRealizationOtherFile) => (
              <div className="others-file-row" key={item?.id}>
                <div className="box-wrapper">
                  <p className="box-label">اتهام</p>
                  <p className="others-file-data">{item?.AssociationInfractions_title}</p>
                </div>
                <div className="box-wrapper">
                  <p className="box-label">شماره دانشجویی/پرسنلی متشاکی</p>
                  <p className="others-file-data">{item?.studentNumber}</p>
                </div>
                <div className="box-wrapper">
                  <p className="box-label">مدت</p>
                  <p className="others-file-data">{item?.understandingReviewPeriod}</p>
                </div>
              </div>
            ))
          : null}
      </div>
    </CustomCard>
  );
};

const SessionAllocationModalContent = ({
  sessionForm,
  id,
  data,
  setData,
  from,
}: {
  id?: number;
  sessionForm?: FormInstance<RealizationListAllocationFormData>;
  data?: CommitteeRealizationOtherFile[];
  setData: React.Dispatch<React.SetStateAction<CommitteeRealizationOtherFile[]>>;
  from?: string;
}) => {
  const [selectionSession, setSelectionSession] = useState<number>();

  //? ================================  Api Calls ================================
  // get the selection meeting filed data
  const [
    getSelectionMeeting,
    { data: selectionMeetingData, isLoading: isSelectionMeetingLoading },
  ] = useLazyGetCommitteeRealizationSelectionMeetingQuery();

  // get the session duration filed
  const [
    getSessionDuration,
    { data: sessionDurationData, isLoading: isSessionDurationLoading },
  ] = useLazyGetCommitteeRealizationSessionDurationQuery();

  // get the presentation filed
  const [getPresentation, { data: PresentationData, isLoading: isPresentationLoading }] =
    useLazyGetCommitteeRealizationPresentationQuery();

  // get the notices radio title
  const [getNotices, { data: noticesData, isLoading: isNoticesLoading }] =
    useLazyGetNoticesQuery();

  // get the all data from change modal
  const [
    getChangeModalAllData,
    {
      data: changeModalAllData,
      // isLoading: isChangeModalAllDataLoading,
    },
  ] = useGetCommitteeRealizationAllDataChangeMeetingMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getSessionDuration({ firstResult: 0, maxResults: 8 });
    getPresentation({ firstResult: 0, maxResults: 8 });
    getSelectionMeeting({ firstResult: 0, maxResults: 8 });
    getNotices({ firstResult: 0, maxResults: 8 });
  }, []);

  useEffect(() => {
    if (id) {
      getChangeModalAllData({ _data_: { id: id?.toString() } });
    }
  }, [id]);

  //  todo[shirin]: api is not ready
  useEffect(() => {
    if (changeModalAllData?.status === 200 && from === SESSION_CHANGE) {
      sessionForm?.setFieldsValue({
        understandingMeetingId: selectDefaultValueGenerator(
          changeModalAllData?.data?.AssociationUnderstandingMeeting
        ),
        UnderstandingProvider: selectDefaultValueGenerator(changeModalAllData?.data),
        understandingReviewPeriod: selectDefaultValueGenerator(changeModalAllData?.data),
        understandingNotificationType: changeModalAllData?.data
          ?.AssociationUnderstandingNotification as NotifType,
        // understandingNotificationMessage:changeModalAllData?.data?.
      });
    }
  }, [changeModalAllData?.status]);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Form
      className="realization-detail-session-allocation-modal-content-container"
      form={sessionForm}
    >
      <CustomCard padding={PADDING_20} className="custom-card-body">
        <div className="switch-row">
          <p className="switch-title">دعوت متهم در جلسه</p>
          <CustomSwitch valuePropName="needToBePresentUnderstanding" />
        </div>
        <div className="around-box">
          <CustomDivider text="اطلاعات جلسه" />
          <div className="grid-cols-3">
            <CustomSelect
              label="جلسه انتخابی"
              name="understandingMeetingId"
              rules={[REQUIRED_RULE]}
              form={sessionForm}
              isLoading={isSelectionMeetingLoading}
              options={selectionMeetingData?.data?.map((item) => {
                return {
                  title: `${item?.topicMeeting} ${moment(item?.meetingDate ?? new Date())
                    .locale("fa")
                    .format("YYYY/M/D")}`,
                  id: item?.id,
                };
              })}
              // @ts-expect-error:next-line
              onChange={(_: string, selectionMeetingData: SelectInputType) => {
                setSelectionSession(selectionMeetingData?.item?.id);
              }}
            />
          </div>
        </div>
        {/* <div className="around-box">
          <CustomDivider  text="پیوست ها" />
          <Upload className="upload-container" listType="picture" multiple>
            <Button icon={<AiOutlineUpload />} className="custom-btn">
              بارگذاری تصاویر
            </Button>
          </Upload>
        </div> */}
      </CustomCard>
      <OtherFilesContent id={selectionSession} data={data} setData={setData} />
      <CustomCard padding={PADDING_20}>
        <CustomDivider text="اطلاعات تکمیلی" />
        <div className="grid-cols-3">
          <CustomSelect
            form={sessionForm}
            label="زمان لازم(دقیقه)"
            name="understandingReviewPeriod"
            isLoading={isSessionDurationLoading}
            options={sessionDurationData?.data?.map((item) => {
              return {
                title: item?.time,
                id: item?.id,
              };
            })}
          />
          <CustomSelect
            name="UnderstandingProvider"
            label="ارائه دهنده"
            isLoading={isPresentationLoading}
            options={PresentationData?.data?.map((item) => {
              return {
                title: `${item?.firstName} ${item?.lastName}`,
                id: item?.id,
              };
            })}
            form={sessionForm}
          />
        </div>
      </CustomCard>
      <CustomCard padding={PADDING_20}>
        <CustomDivider text="اطلاع رسانی" />
        <div className="notification-inputs-container">
          <CustomRadioGroup
            name="understandingNotificationType"
            label="نوع"
            isLoading={isNoticesLoading}
            options={noticesData?.data.map((item) => {
              return {
                label: item?.title,
                value: item?.id,
              };
            })}
            rules={[REQUIRED_RULE]}
            hasVerticalLabel={true}
          />
          <CustomTextArea
            label="پیام ارسالی"
            placeholder="توضیحات"
            name="understandingNotificationMessage"
            rules={[REQUIRED_RULE]}
          />
        </div>
      </CustomCard>
    </Form>
  );
};

export default SessionAllocationModalContent;
