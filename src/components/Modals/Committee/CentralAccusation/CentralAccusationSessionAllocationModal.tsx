import { useEffect, useState } from "react";

import { Col, Form, FormInstance, Row } from "antd";
import moment from "jalali-moment";

import { SendSessionAllocationFormDataType } from "@components/Committee/HandleProcessing/CentralAccusation/CentralAccusationListTable/@types/@centralAccusationListTable";
import { SESSION_CHANGE } from "@pages/Committee/RealizationList/CommitteeRealizationList/helper/components/RealizationListTable/RealizationListTableHelpers/RealizationListTableHelpers";

import CustomCard from "../../../../components/CustomCard/CustomCard";
import CustomRadioGroup from "../../../../components/CustomInputs/CustomRadioGroup/CustomRadioGroup";
import CustomSelect from "../../../../components/CustomInputs/CustomSelect/CustomSelect";
import CustomSwitch from "../../../../components/CustomInputs/CustomSwitch/CustomSwitch";
import CustomTextArea from "../../../../components/CustomInputs/CustomTextArea/CustomTextArea";
import { selectDefaultValueGenerator } from "../../../../infrastructure/helpers/utils";
import { GetCentralAccusationChangeMeetingModalAllDataResponse } from "../../../../infrastructure/models/modules/committee/handleProcessing/accusationCenteral/accusationCenteral";
import { useLazyGetNoticesQuery } from "../../../../infrastructure/states/redux/Apis/committee/committees/committees";
import {
  useGetCentralAccusationChangeMeetingModalAllDataMutation,
  useLazyGetCentralAccusationGetOtherFilesQuery,
  useLazyGetCentralAccusationSelectionMeetingQuery,
} from "../../../../infrastructure/states/redux/Apis/committee/handleProcessing/handleProcessing";
import { REQUIRED_RULE } from "../../../../infrastructure/validation/validationSchema";
import { PADDING_20 } from "../../../../infrastructure/VARS/globalStyles/globalStyles";
import CustomInput from "../../../CustomInputs/CustomInput/CustomInput";
import CustomDivider from "../../../Renderers/CustomDivider/CustomDivider";
import Div from "../../../Renderers/Div/Div";
import "./_centralAccusationSessionAllocationModal.scss";

// other file component
const OtherFilesContent = ({ id }: { id?: number }) => {
  //? ================================  Api Calls ================================
  const [
    CentralAccusationGetOtherFiles,
    { data: otherFilesData, isLoading: isOtherFilesLoading },
  ] = useLazyGetCentralAccusationGetOtherFilesQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      CentralAccusationGetOtherFiles({
        maxResults: 8,
        AssociationCentrulMeeting_id_EQ: id,
      });
    }
  }, [id]);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <CustomCard loading={isOtherFilesLoading} className="other-files-session">
      <CustomDivider text="پرونده‌های دیگر این جلسه" />
      <div className="others-file-wrapper">
        {otherFilesData?.data
          ? otherFilesData?.data.map((item) => (
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
                  <p className="others-file-data">{item?.centrulReviewPeriod}</p>
                </div>
              </div>
            ))
          : null}
      </div>
    </CustomCard>
  );
};

const CentralAccusationSessionAllocationModal = ({
  sessionForm,
  id,
  from,
}: {
  id?: number;
  sessionForm?: FormInstance<SendSessionAllocationFormDataType>;
  from?: string;
}) => {
  const [selectionSession, setSelectionSession] = useState<number>();

  //? ================================  Api Calls ================================
  const [
    getSelectionMeeting,
    { data: selectionMeetingData, isFetching: isSelectionMeetingLoading },
  ] = useLazyGetCentralAccusationSelectionMeetingQuery();

  // get the notices radio title from api
  const [getNotices, { data: noticesData, isFetching: isNoticesLoading }] =
    useLazyGetNoticesQuery();

  // get the all data from change modal
  const [getChangeModalAllData, { isLoading: isChangeModalAllDataLoading }] =
    useGetCentralAccusationChangeMeetingModalAllDataMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getSelectionMeeting({ firstResult: 0, maxResults: 8 });
    getNotices({ firstResult: 0, maxResults: 8 });
  }, []);

  useEffect(() => {
    if (id) {
      getChangeModalAllData({ _data_: { id: id?.toString() } })
        .unwrap()
        .then(onGetChangeModalAllDataSuccess);
    }
  }, [id]);

  //* ================================ Util Functions ================================
  const onGetChangeModalAllDataSuccess = async (
    response: GetCentralAccusationChangeMeetingModalAllDataResponse
  ) => {
    if (response.status === 200 && from === SESSION_CHANGE) {
      sessionForm?.setFieldsValue({
        understandingMeetingId: selectDefaultValueGenerator({
          id: response?.data?.AssociationCentrulMeeting?.id,
          title: response?.data?.AssociationCentrulMeeting?.topicMeeting,
        }),
        UnderstandingProvider: response?.data?.centrulProvider,
        understandingReviewPeriod: response?.data?.centrulReviewPeriod,
        understandingNotificationType: response?.data?.AssociationPrimaryNotification?.id,
        understandingNotificationMessage: response?.data?.primaryNotificationMessage,
      });
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div loading={isChangeModalAllDataLoading}>
      <Form
        className="central-accusation-session-allocation-modal-content-container"
        form={sessionForm}
      >
        <CustomCard padding={PADDING_20} className="custom-card-body">
          <div className="switch-row">
            <p className="switch-title">دعوت متهم در جلسه</p>
            <CustomSwitch valuePropName="needToBePresentUnderstanding" />
          </div>
          <div className="around-box">
            <CustomDivider text="اطلاعات جلسه" />
            <Row gutter={[16, 16]}>
              <Col lg={12} md={12} sm={24} xs={24}>
                <CustomSelect
                  label="جلسه انتخابی"
                  name="understandingMeetingId"
                  rules={[REQUIRED_RULE]}
                  form={sessionForm}
                  isLoading={isSelectionMeetingLoading}
                  options={selectionMeetingData?.data?.map((item) => {
                    return {
                      title: `${item?.topicMeeting} ${moment(
                        item?.meetingDate ?? new Date()
                      )
                        .locale("fa")
                        .format("YYYY/M/D")}`,
                      id: item?.id,
                    };
                  })}
                  // @ts-expect-error:next-line
                  onChange={(
                    _: number,
                    selectionMeetingData: { item: { topicMeeting: string; id: number } }
                  ) => {
                    setSelectionSession(selectionMeetingData?.item?.id);
                  }}
                />
              </Col>
            </Row>
          </div>
          {/* <div className="around-box">
          <CustomDivider text="پیوست ها"  />
          <Upload className="upload-container" listType="picture" multiple>
            <Button icon={<AiOutlineUpload />} className="custom-btn">
              بارگذاری تصاویر
            </Button>
          </Upload>
        </div> */}
        </CustomCard>
        <OtherFilesContent id={selectionSession} />
        <CustomCard padding={PADDING_20}>
          <CustomDivider text="اطلاعات تکمیلی" />
          <Row gutter={[16, 16]}>
            <Col lg={8} md={8} sm={12} xs={24}>
              <CustomInput label="زمان لازم(دقیقه)" name="understandingReviewPeriod" />
            </Col>
            <Col lg={8} md={8} sm={12} xs={24}>
              <CustomInput name="UnderstandingProvider" label="ارائه دهنده" />
            </Col>
          </Row>
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
    </Div>
  );
};
export default CentralAccusationSessionAllocationModal;
