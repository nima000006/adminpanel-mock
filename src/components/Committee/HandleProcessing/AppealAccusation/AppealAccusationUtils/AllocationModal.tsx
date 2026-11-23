import { useEffect, useState } from "react";

import { Button, Col, Form, Modal, Row } from "antd";
import { toast } from "react-toastify";

import {
  GetAppealMeetingSessionAllocationModalResponse,
  RegisterSessionAllocationFormData,
  SendAppealMeetingSessionAllocationModalResponse,
  SessionAllocationModalPropsType,
} from "./@types/@allocationModal";
import { selectDefaultValueGenerator } from "../../../../../infrastructure/helpers/utils";
import { useLazyGetNoticesQuery } from "../../../../../infrastructure/states/redux/Apis/committee/committees/committees";
import {
  useGetAppealMeetingSessionAllocationModalMutation,
  useLazyGetAppealMeetingOtherFilesQuery,
  useLazyGetAppealMeetingSelectSessionListQuery,
  useSendAppealMeetingSessionAllocationModalMutation,
} from "../../../../../infrastructure/states/redux/Apis/committee/handleProcessing/handleProcessing";
import { CUSTOM_REQUIRED_RULE } from "../../../../../infrastructure/validation/validationSchema";
import { PADDING_20 } from "../../../../../infrastructure/VARS/globalStyles/globalStyles";
import { GENERAL_SUBMIT_SUCCESS } from "../../../../../infrastructure/VARS/globalToasts/globalToasts";
import CustomCard from "../../../../CustomCard/CustomCard";
import CustomInput from "../../../../CustomInputs/CustomInput/CustomInput";
import CustomRadioGroup from "../../../../CustomInputs/CustomRadioGroup/CustomRadioGroup";
import CustomSelect from "../../../../CustomInputs/CustomSelect/CustomSelect";
import CustomSwitch from "../../../../CustomInputs/CustomSwitch/CustomSwitch";
import CustomTextArea from "../../../../CustomInputs/CustomTextArea/CustomTextArea";
import CustomDivider from "../../../../Renderers/CustomDivider/CustomDivider";
import Div from "../../../../Renderers/Div/Div";
import "./_allocationModal.scss";

// other files content component
const OtherFilesContent = ({ id }: { id?: number }) => {
  //? ================================  Api Calls ================================
  const [getOtherFiles, { data: otherFilesData, isFetching: isOtherFilesLoading }] =
    useLazyGetAppealMeetingOtherFilesQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      getOtherFiles(id);
    }
  }, [id]);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <CustomCard
      loading={isOtherFilesLoading}
      padding={PADDING_20}
      className="other-files-session"
    >
      <CustomDivider text="پرونده های دیگر این جلسه" />
      <div className="others-file-wrapper">
        {otherFilesData?.data.map((item) => (
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
              <p className="others-file-data">{item.appealReviewPeriod}</p>
            </div>
          </div>
        ))}
      </div>
    </CustomCard>
  );
};

const SessionAllocationModal = ({
  isModalOpen,
  setIsModalOpen,
  accusationType,
}: SessionAllocationModalPropsType) => {
  const [selectionSession, setSelectionSession] = useState<number>();
  const [form] = Form.useForm();

  //? ================================  Api Calls ================================
  const [
    getSelectionMeeting,
    { data: selectionMeetingData, isFetching: isSelectionMeetingLoading },
  ] = useLazyGetAppealMeetingSelectSessionListQuery();

  const [getNoticesType, { data: noticesTypeData, isFetching: isNoticesTypeLoading }] =
    useLazyGetNoticesQuery();

  const [getSessionAllocation, { isLoading: isGetSessionAllocationLoading }] =
    useGetAppealMeetingSessionAllocationModalMutation();

  const [sendSessionAllocation, { isLoading: isSessionAllocationLoading }] =
    useSendAppealMeetingSessionAllocationModalMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (isModalOpen?.isOpen) {
      getSelectionMeeting();
      getNoticesType({ firstResult: 0, maxResults: 8 });
      if (accusationType === 6) {
        getSessionAllocation({
          _data_: {
            id: `${isModalOpen?.id}`,
          },
        })
          .unwrap()
          .then(getSessionAllocationOnSuccess);
      }
    }
  }, []);

  //* ================================ Util Functions ================================
  const sendSessionAllocationOnSuccess = async (
    value: SendAppealMeetingSessionAllocationModalResponse
  ) => {
    if (value?.status === 200) {
      setIsModalOpen({ isOpen: false, id: -1 });
      toast.success(GENERAL_SUBMIT_SUCCESS, { toastId: GENERAL_SUBMIT_SUCCESS });
      form.resetFields();
    }
  };

  const registerSessionAllocation = (values: RegisterSessionAllocationFormData) => {
    sendSessionAllocation({
      form: "AllocationAppealMeeting",
      id: "ac3e1f0a07b047209177f4db4ae3179b",
      _data_: {
        appealMeeting: +values?.meeting?.key,
        appealNeedToBePresent: values?.needToBePresent,
        appealProvider: values?.provider,
        appealReviewPeriod: values?.period,
        id: isModalOpen?.id,
        primaryNotificationMessage: values?.sendingMessage,
        primaryNotificationType: +values?.notifType,
      },
    })
      .unwrap()
      .then(sendSessionAllocationOnSuccess);
  };

  const getSessionAllocationOnSuccess = async (
    value: GetAppealMeetingSessionAllocationModalResponse
  ) => {
    if (value?.status === 200) {
      form.setFieldsValue({
        meeting: selectDefaultValueGenerator(
          value?.data?.AssociationMeetingAppealsCommittee
        ),
        needToBePresent: value?.data?.appealNeedToBePresent,
        provider: value?.data?.appealProvider,
        period: value?.data?.appealReviewPeriod,
        sendingMessage: value?.data?.primaryNotificationMessage,
        notifType: value?.data?.primaryNotificationType,
      });
      setSelectionSession(value?.data?.AssociationMeetingAppealsCommittee?.id);
    }
  };

  const backBtnHandler = () => {
    setIsModalOpen({ isOpen: false, id: -1 });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {isModalOpen?.isOpen && (
        <Modal
          title={accusationType === 6 ? "تغییر جلسه" : "تخصیص جلسه"}
          open={isModalOpen?.isOpen}
          onCancel={() => setIsModalOpen({ isOpen: false, id: -1 })}
          footer={null}
          width={1100}
          className="modal-session-allocation"
        >
          <Div loading={accusationType === 6 ? isGetSessionAllocationLoading : false}>
            <Form
              className="modal-session-allocation-wrapper"
              onFinish={registerSessionAllocation}
              form={form}
            >
              <div className="switch-row">
                <p className="switch-title">دعوت در جلسه</p>
                <CustomSwitch valuePropName="needToBePresent" />
              </div>
              <CustomCard padding={PADDING_20}>
                <CustomDivider text="اطلاعات جلسه" />
                <div className="select-session-wrapper">
                  <CustomSelect
                    label="جلسه انتخابی"
                    name="meeting"
                    isLoading={isSelectionMeetingLoading}
                    // @ts-expect-error:next-line
                    onChange={(
                      _: number,
                      selectionMeetingData: { item: { topicMeeting: string; id: number } }
                    ) => setSelectionSession(selectionMeetingData?.item?.id)}
                    options={selectionMeetingData?.data?.map(
                      (item: { topicMeeting: string; id: number }) => {
                        return {
                          title: item?.topicMeeting,
                          id: item?.id,
                        };
                      }
                    )}
                    form={form}
                  />
                </div>
              </CustomCard>
              <CustomCard padding={PADDING_20}>
                <CustomDivider text="پیوست ها" />

                {/* //todo[Atefeh]:unCommit when api got ready */}
                {/* <Upload className="upload-container" listType="picture" multiple>
            <Button icon={<AiOutlineUpload />} className="custom-btn">
              بارگذاری تصاویر
            </Button>
          </Upload> */}
              </CustomCard>

              <OtherFilesContent id={selectionSession} />

              <CustomCard padding={PADDING_20}>
                <CustomDivider text="اطلاعات تکمیلی" />
                <Row gutter={[12, 12]}>
                  <Col lg={8} md={8} sm={12} xs={24}>
                    <CustomInput
                      name="period"
                      label="زمان لازم (دقیقه)"
                      placeholder="زمان لازم (دقیقه)"
                    />
                  </Col>
                  <Col lg={8} md={8} sm={12} xs={24}>
                    <CustomInput
                      name="provider"
                      label="ارائه دهنده"
                      placeholder="ارائه دهنده"
                    />
                  </Col>
                </Row>
              </CustomCard>

              <CustomCard padding={PADDING_20} loading={isNoticesTypeLoading}>
                <CustomDivider text=" اطلاع رسانی" />
                <Row gutter={[16, 16]}>
                  <Col lg={12} md={12} sm={24} xs={24}>
                    <CustomRadioGroup
                      name="notifType"
                      label="نوع"
                      options={noticesTypeData?.data.map((item) => {
                        return {
                          label: item?.title,
                          value: item?.id,
                        };
                      })}
                      rules={[CUSTOM_REQUIRED_RULE("انتخاب نوع اطلاع سانی الزامیست.")]}
                      hasVerticalLabel={true}
                    />
                  </Col>
                  <Col lg={12} md={12} sm={24} xs={24}>
                    <CustomTextArea
                      label="پیام ارسالی"
                      placeholder="پیام"
                      name="sendingMessage"
                      rules={[CUSTOM_REQUIRED_RULE("پیام ارسالی را وارد نمائید.")]}
                    />
                  </Col>
                </Row>
              </CustomCard>

              <div className="btn-container">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="return-btn"
                  loading={isSessionAllocationLoading}
                >
                  ثبت نهایی
                </Button>
                <Button onClick={backBtnHandler}>بازگشت</Button>
              </div>
            </Form>
          </Div>
        </Modal>
      )}
    </>
  );
};
export default SessionAllocationModal;
