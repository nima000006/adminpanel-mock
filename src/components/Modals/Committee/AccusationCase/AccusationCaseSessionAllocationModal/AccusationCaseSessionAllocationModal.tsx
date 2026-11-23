import { useEffect, useState } from "react";

import { Button, Form, Modal, Upload } from "antd";
import { AiOutlineUpload } from "react-icons/ai";
import { toast } from "react-toastify";

import { AccusationCaseSessionAllocationModalProps } from "./@type/@typeAccusationCaseSessionAllocationModal";
import { dataPlaceHolder } from "../../../../../infrastructure/helpers/utils";
import { useLazyGetNoticesQuery } from "../../../../../infrastructure/states/redux/Apis/committee/committees/committees";
import {
  useAllocationPreliminaryMeetingMutation,
  useLazyGetOtherFilesQuery,
  useLazyGetPreliminaryMeetingQuery,
  useLazyGetPrimaryProviderQuery,
  useLazyGetSessionDurationQuery,
} from "../../../../../infrastructure/states/redux/Apis/committee/handleProcessing/handleProcessing";
import { PADDING_20 } from "../../../../../infrastructure/VARS/globalStyles/globalStyles";
import CustomCard from "../../../../CustomCard/CustomCard";
import CustomRadioGroup from "../../../../CustomInputs/CustomRadioGroup/CustomRadioGroup";
import CustomSelect from "../../../../CustomInputs/CustomSelect/CustomSelect";
import CustomSwitch from "../../../../CustomInputs/CustomSwitch/CustomSwitch";
import CustomTextArea from "../../../../CustomInputs/CustomTextArea/CustomTextArea";
import CustomDivider from "../../../../Renderers/CustomDivider/CustomDivider";
import Div from "../../../../Renderers/Div/Div";
import "./_accusationCaseSessionAllocationModal.scss";

const REGISTER_ALLOCATION_MEETING_SUCCESS_MSG = "تخصیص جلسه با موفقیت انجام شد.";

const AccusationCaseSessionAllocationModal = ({
  isModalOpen,
  closeModalHandler,
}: AccusationCaseSessionAllocationModalProps) => {
  const [selectionSession, setSelectionSession] = useState<number>();
  const [form] = Form.useForm();

  //? ================================  Api Calls ================================
  // selecting session
  const [
    getPreliminaryMeeting,
    { data: preliminaryMeetingData, isLoading: isPreliminaryMeetingLoading },
  ] = useLazyGetPreliminaryMeetingQuery();

  //other sessions list
  const [
    getOtherSessions,
    { data: otherSessionsData, isLoading: isOtherSessionsLoading },
  ] = useLazyGetOtherFilesQuery();

  // session duration
  const [
    getSessionDuration,
    { data: sessionDurationData, isLoading: isSessionDurationLoading },
  ] = useLazyGetSessionDurationQuery();

  // primary provider
  const [
    getPrimaryProvider,
    { data: primaryProviderData, isLoading: isPrimaryProviderLoading },
  ] = useLazyGetPrimaryProviderQuery();

  // notification type
  const [getNoticesType, { data: noticesTypeData, isLoading: isNoticesTypeLoading }] =
    useLazyGetNoticesQuery();

  const [registerAllocationMeeting, { isLoading: isAllocationMeetingLoading }] =
    useAllocationPreliminaryMeetingMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    if (isModalOpen?.isOpen) {
      getPreliminaryMeeting();
      getSessionDuration({ firstResult: 0, maxResults: 8 });
      getPrimaryProvider();
      getNoticesType({ firstResult: 0, maxResults: 8 });
    }
  }, [isModalOpen?.isOpen]);

  // get other sessions list base on session id
  useEffect(() => {
    if (selectionSession) {
      getOtherSessions({ maxResults: 8, AssociationMeeting_id_EQ: selectionSession });
    }
  }, [selectionSession]);

  //* ================================ Util Functions ================================
  const registerAllocationMeetingOnSuccess = (value: any) => {
    if (value?.status === 200) {
      toast.success(REGISTER_ALLOCATION_MEETING_SUCCESS_MSG, {
        toastId: REGISTER_ALLOCATION_MEETING_SUCCESS_MSG,
      });
      closeModalHandler();
    }
  };

  // submit
  const sessionAllocationHandler = () => {
    const {
      needToBePresent,
      selectSession,
      reviewPeriod,
      provider,
      notificationType,
      notificationMessage,
    } = form.getFieldsValue();
    if (isModalOpen.id && +isModalOpen.id > 0) {
      registerAllocationMeeting({
        form: "AllocationPreliminaryMeeting",
        id: "bd98b974316c44a1a8d11f9a048d018b",
        _data_: {
          needToBePresent: needToBePresent ? true : false,
          meeting: selectSession?.value,
          reviewPeriod: reviewPeriod?.children,
          primaryProvider: provider?.children,
          primaryNotificationType: notificationType,
          primaryNotificationMessage: notificationMessage,
          id: +isModalOpen.id,
        },
      })
        .unwrap()
        .then(registerAllocationMeetingOnSuccess);
    }
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {isModalOpen?.isOpen && (
        <Modal
          title="تخصیص جلسه"
          open={isModalOpen?.isOpen}
          onCancel={closeModalHandler}
          footer={null}
          width={900}
          className="accusation-case-session-allocation-modal-container"
        >
          <Form form={form}>
            <div className="modal-body-container">
              <CustomCard padding={PADDING_20} className="custom-card-body">
                <CustomSwitch valuePropName="needToBePresent" label="دعوت متهم در جلسه" />
                <div className="around-box">
                  <CustomDivider text="اطلاعات جلسه" />
                  <div className="grid-cols-3">
                    <CustomSelect
                      label="جلسه انتخابی"
                      name="selectSession"
                      isLoading={isPreliminaryMeetingLoading}
                      onChange={(_: any, selectionMeetingData: any) =>
                        setSelectionSession(selectionMeetingData?.item?.id)
                      }
                      options={preliminaryMeetingData?.data?.map((item) => {
                        return {
                          title: item?.topicMeeting,
                          id: item?.id,
                        };
                      })}
                      form={form}
                      placeholder="انتخاب کنید"
                    />
                  </div>
                </div>
                <div className="around-box">
                  <CustomDivider text="پیوست ها" />
                  <Upload
                    className="upload-container"
                    listType="picture"
                    multiple
                    disabled
                  >
                    <Button icon={<AiOutlineUpload />} className="custom-btn" disabled>
                      بارگذاری تصاویر
                    </Button>
                  </Upload>
                </div>
              </CustomCard>
              <div className="other-files-session">
                <CustomDivider text="پرونده‌های دیگر این جلسه" />
                <Div className="others-file-wrapper" loading={isOtherSessionsLoading}>
                  {otherSessionsData?.data &&
                    otherSessionsData?.data?.map((item) => (
                      <div className="others-file-row" key={item?.id}>
                        <div className="box-wrapper">
                          <p className="box-label">اتهام</p>
                          <p className="others-file-data">
                            {dataPlaceHolder({
                              data: item?.AssociationInfractions_title,
                            })}
                          </p>
                        </div>
                        <div className="box-wrapper">
                          <p className="box-label">شماره دانشجویی/پرسنلی متشاکی</p>
                          <p className="others-file-data">
                            {dataPlaceHolder({
                              data: item?.studentNumber,
                            })}
                          </p>
                        </div>
                        <div className="box-wrapper">
                          <p className="box-label">مدت</p>
                          <p className="others-file-data">
                            {dataPlaceHolder({
                              data: item?.reviewPeriod,
                            })}
                          </p>
                        </div>
                      </div>
                    ))}
                </Div>
              </div>
              <CustomCard padding={PADDING_20}>
                <CustomDivider text="اطلاعات تکمیلی" />
                <div className="grid-cols-2">
                  <CustomSelect
                    label="زمان لازم(دقیقه)"
                    name="reviewPeriod"
                    isLoading={isSessionDurationLoading}
                    options={sessionDurationData?.data?.map((item) => {
                      return {
                        title: item?.time,
                        id: item?.id,
                      };
                    })}
                    form={form}
                    placeholder="انتخاب کنید"
                  />
                  <CustomSelect
                    label="ارائه دهنده"
                    name="provider"
                    isLoading={isPrimaryProviderLoading}
                    options={primaryProviderData?.data?.map((item) => {
                      return {
                        title: item?.title,
                        id: item?.id,
                      };
                    })}
                    form={form}
                    placeholder="انتخاب کنید"
                  />
                </div>
              </CustomCard>
              <CustomCard padding={PADDING_20}>
                <CustomDivider text="اطلاع رسانی" />
                <div className="grid-cols-2">
                  <CustomRadioGroup
                    name="notificationType"
                    label="نوع"
                    isLoading={isNoticesTypeLoading}
                    options={noticesTypeData?.data.map((item) => {
                      return {
                        label: item?.title,
                        value: item?.id,
                      };
                    })}
                    // rules={[REQUIRED_RULE]}
                    hasVerticalLabel={true}
                  />
                  <CustomTextArea
                    label="پیام ارسالی"
                    placeholder="توضیحات"
                    name="notificationMessage"
                    // rules={[REQUIRED_RULE]}
                  />
                </div>
              </CustomCard>
            </div>
            <div className="submit-buttons-container">
              <Button
                type="primary"
                htmlType="submit"
                className="custom-btn"
                onClick={sessionAllocationHandler}
                loading={isAllocationMeetingLoading}
              >
                ثبت نهایی
              </Button>
              <Button className="custom-btn" onClick={closeModalHandler}>
                بازگشت
              </Button>
            </div>
          </Form>
        </Modal>
      )}
    </>
  );
};
export default AccusationCaseSessionAllocationModal;
