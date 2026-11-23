import { useEffect, useState } from "react";

import { Button, Form, Modal } from "antd";
import { toast } from "react-toastify";

import {
  RejectSessionAllocationForm,
  SendSessionAllocationResponse,
  SessionAllocationModalType,
} from "./@types/@sessionAllocationModal";
import {
  useLazyGetOtherFilesQuery,
  useLazyGetSelectionMeetingQuery,
  useLazyGetSessionDurationQuery,
  useLazyGetSessionPresentationReasonQuery,
  useSendSessionAllocationMutation,
} from "../../../../infrastructure/states/redux/Apis/committee/handleProcessing/handleProcessing";
import { GENERAL_SUBMIT_SUCCESS } from "../../../../infrastructure/VARS/globalToasts/globalToasts";
import CustomCard from "../../../CustomCard/CustomCard";
import CustomSelect from "../../../CustomInputs/CustomSelect/CustomSelect";
import CustomSwitch from "../../../CustomInputs/CustomSwitch/CustomSwitch";
import CustomDivider from "../../../Renderers/CustomDivider/CustomDivider";
import "./_sessionAllocationModal.scss";

//! other files content component
const OtherFilesContent = ({ id }: { id?: number }) => {
  //! get the other files section data from api
  const [getOtherFiles, { data: otherFilesData, isLoading: isOtherFilesLoading }] =
    useLazyGetOtherFilesQuery();

  useEffect(() => {
    if (id) {
      getOtherFiles({ maxResults: 8, AssociationMeeting_id_EQ: id });
    }
  }, [id]);

  return (
    <CustomCard loading={isOtherFilesLoading} className="other-files-session">
      <CustomDivider text="پرونده‌های دیگر این جلسه" />
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
              <p className="others-file-data">{item.reviewPeriod}</p>
            </div>
            <Button danger className="delete-btn">
              حذف
            </Button>
          </div>
        ))}
      </div>
    </CustomCard>
  );
};

const SessionAllocationModal = ({
  isModalOpen,
  setIsModalOpen,
}: SessionAllocationModalType) => {
  const [form] = Form.useForm();
  const [selectionSession, setSelectionSession] = useState<number>();

  //! get the selection meeting filed data from api
  const [
    getSelectionMeeting,
    { data: selectionMeetingData, isLoading: isSelectionMeetingLoading },
  ] = useLazyGetSelectionMeetingQuery();

  //! get the session presentation filed data from api
  const [
    getSessionPresentationReason,
    {
      data: sessionPresentationReasonData,
      isLoading: isSessionPresentationReasonLoading,
    },
  ] = useLazyGetSessionPresentationReasonQuery();

  //! get the session duration filed from api
  const [
    getSessionDuration,
    { data: sessionDurationData, isLoading: isSessionDurationLoading },
  ] = useLazyGetSessionDurationQuery();

  //! send the session allocation modals data
  const [sendSessionAllocation, { isLoading: isSessionAllocationLoading }] =
    useSendSessionAllocationMutation();

  useEffect(() => {
    if (isModalOpen?.isOpen) {
      getSelectionMeeting({
        firstResult: 0,
        maxResults: 8,
        meetingDate_GTEQ: new Date().toISOString(),
      });
      getSessionPresentationReason({ firstResult: 0, maxResults: 8 });
      getSessionDuration({ firstResult: 0, maxResults: 8 });
    }
  }, [isModalOpen]);

  const sendSessionAllocationOnSuccess = async (value: SendSessionAllocationResponse) => {
    if (value?.status === 200) {
      setIsModalOpen({ isOpen: false, id: -1 });
      toast.success(GENERAL_SUBMIT_SUCCESS, { toastId: GENERAL_SUBMIT_SUCCESS });
      form.resetFields();
    }
  };

  //! register modal btn
  const registerSessionAllocation = (values: RejectSessionAllocationForm) => {
    sendSessionAllocation({
      form: "AllocationPreliminarySession",
      id: "dafdee9f6c3d4d9183de15c4f84f563a",
      _data_: {
        reviewPeriod: values?.reviewPeriod,
        needToBePresent: values?.needtobepresent ? values?.needtobepresent : false,
        id: isModalOpen?.id,
        meeting: +values?.meeting,
        ReasonPreliminaryMeeting: +values?.ReasonPreliminaryMeeting,
      },
    })
      .unwrap()
      .then(sendSessionAllocationOnSuccess);
  };

  const backBtnHandler = () => {
    setIsModalOpen({ isOpen: false, id: -1 });
  };

  return (
    <>
      {isModalOpen?.isOpen && (
        <Modal
          title="تخصیص جلسه"
          open={isModalOpen?.isOpen}
          onCancel={() => setIsModalOpen({ isOpen: false, id: -1 })}
          footer={null}
          width={1100}
          className="modal-session-allocation"
        >
          <Form
            className="modal-session-allocation-wrapper"
            onFinish={registerSessionAllocation}
            form={form}
          >
            <div className="switch-row">
              <p className="switch-title">دعوت در جلسه</p>
              <CustomSwitch valuePropName="needtobepresent" />
            </div>
            <CustomCard className="session-info-wrapper">
              <CustomDivider text="اطلاعات جلسه" />
              <div className="select-wrapper">
                <CustomSelect
                  label="جلسه انتخابی"
                  name="meeting"
                  isLoading={isSelectionMeetingLoading}
                  onChange={(_: any, selectionMeetingData: any) =>
                    setSelectionSession(selectionMeetingData?.item?.id)
                  }
                  options={selectionMeetingData?.data?.map((item: any) => {
                    return {
                      title: item?.topicMeeting,
                      id: item?.id,
                    };
                  })}
                  hasVerticalLabel={false}
                />
                <CustomSelect
                  label="دلیل برگزاری جلسه"
                  name="ReasonPreliminaryMeeting"
                  isLoading={isSessionPresentationReasonLoading}
                  options={sessionPresentationReasonData?.data}
                  hasVerticalLabel={false}
                />
                <CustomSelect
                  label="مدت جلسه"
                  name="reviewPeriod"
                  isLoading={isSessionDurationLoading}
                  options={sessionDurationData?.data?.map((item) => {
                    return {
                      title: item?.time,
                      id: item?.id,
                    };
                  })}
                  hasVerticalLabel={false}
                />
              </div>
            </CustomCard>
            <CustomCard className="upload-box">
              <CustomDivider text="پیوست ها" />
              {/* <Upload className="upload-container" listType="picture" multiple>
            <Button icon={<AiOutlineUpload />} className="custom-btn">
              بارگذاری تصاویر
            </Button>
          </Upload> */}
            </CustomCard>

            <OtherFilesContent id={selectionSession} />

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
        </Modal>
      )}
    </>
  );
};
export default SessionAllocationModal;
