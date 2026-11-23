import { useEffect, useState } from "react";

import { Button, Modal } from "antd";
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker from "react-multi-date-picker";
import { toast } from "react-toastify";

import { StudentResponseModalProps } from "./@types/@massiveResponseModal";
import { READY_TO_DELIVER_CODE } from "../../../../infrastructure/models/studentStatus";
import { useBulkStudentUpdateMutation } from "../../../../infrastructure/states/redux/Apis/studentApi";
import { GENERAL_ERROR_MESSAGE } from "../../../../infrastructure/VARS/globalToasts/globalToasts";
import CustomDivider from "../../../Renderers/CustomDivider/CustomDivider";

const StudentResponseModal = ({
  studentResponseModal,
  setStudentResponseModal,
  title,
  mainModalCloseHandler,
}: StudentResponseModalProps) => {
  const [datePickerValue, setDatePickerValue] = useState("");
  const [groupUnitName, setGroupUnitName] = useState("");
  const [groupCollegeName, setGroupCollegeName] = useState("");
  const [groupAdminName, setGroupAdminName] = useState("");

  //? ================================  Api Calls ================================
  const [
    updateStudentStatus,
    { data: updateStudentStatusData, isLoading: isStudentStatusLoading },
  ] = useBulkStudentUpdateMutation();

  //* ================================ Util Functions ================================
  const modalCloseHandler = () => {
    setStudentResponseModal({ isOpen: false, studentId: -1 });
  };

  const adminGroupGeneratedText = () => {
    return `دانشجوی گرامی، کارت دانشجویی شما آماده می باشد. لطفا برای دریافت کارت در تاریخ ${datePickerValue} به دانشکده ${groupCollegeName} واحد ${groupUnitName} مراجعه نمایید. نام کارشناس ${groupAdminName}`;
  };

  const groupDeliverPrintSuccessHandler = () => {
    if (studentResponseModal?.studentId < 1)
      return toast.error(GENERAL_ERROR_MESSAGE, { toastId: GENERAL_ERROR_MESSAGE });
    updateStudentStatus({
      statusId: READY_TO_DELIVER_CODE,
      studentCardIds: [studentResponseModal?.studentId],
      comment: adminGroupGeneratedText(),
    });
  };

  //? ================================ Effects ================================
  useEffect(() => {
    if (studentResponseModal?.isOpen && updateStudentStatusData?.status === 200) {
      setStudentResponseModal({ isOpen: false, studentId: -1 });
      setGroupAdminName("");
      setGroupCollegeName("");
      setGroupUnitName("");
      mainModalCloseHandler();
    }
  }, [updateStudentStatusData?.status]);

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {studentResponseModal?.isOpen && (
        <Modal
          title={title}
          centered
          open={studentResponseModal?.isOpen}
          //   onOk={() => closeModalHandler()}
          onCancel={modalCloseHandler}
          width={1000}
          //   className="student-card-modal"
          footer={null}
          confirmLoading={isStudentStatusLoading}
        >
          <div className="group-deliver-modal-container">
            <CustomDivider text="" />
            <div className="input-section-container">
              <div className="date-pick-container">
                <div className="date-picker-label">تاریخ</div>
                <DatePicker
                  value={datePickerValue}
                  onChange={(date: DateObject) => {
                    if (!date) return setDatePickerValue("");
                    return setDatePickerValue(date.format());
                  }}
                  locale={persian_fa}
                  calendar={persian}
                  className="date-picker"
                  placeholder="تاریخ مورد نظر را انتخاب کنید"
                />
              </div>
              <div className="inputs facility-name-container">
                <div className="label">دانشکده</div>
                <input
                  type="text"
                  className="input"
                  name="collegeName"
                  placeholder="دانشکده"
                  onChange={(e) => setGroupCollegeName(e.target.value)}
                />
              </div>
              <div className="inputs unit-name-container">
                <div className="label">واحد</div>
                <input
                  type="text"
                  className="input"
                  name="unitName"
                  placeholder="واحد"
                  onChange={(e) => setGroupUnitName(e.target.value)}
                  value={groupUnitName}
                />
              </div>

              <div className="inputs admin-name-container">
                <div className="label">نام کامل کارشناس</div>
                <input
                  type="text"
                  name="adminName"
                  className="input"
                  placeholder="نام کامل"
                  // value={groupAdminName}
                  onChange={(e) => setGroupAdminName(e.target.value)}
                />
              </div>
            </div>
            <div className="msg-preview-container">
              <div className="msg-preview-title">پیام ارسالی</div>

              <textarea
                className="msg-preview"
                disabled
                value={adminGroupGeneratedText()}
                // value={`دانشجوی گرامی، کارت دانشجویی شما آماده می باشد. لطفا برای دریافت کارت در تاریخ ${datePickerValue} به دانشکده ${groupCollegeName} واحد ${groupUnitName} مراجعه نمایید. نام کارشناس ${groupAdminName}`}
              />
            </div>
            <CustomDivider text="" />
            <div className="btns-container">
              <Button type="primary" onClick={groupDeliverPrintSuccessHandler}>
                آماده تحویل
              </Button>
              <Button type="default" onClick={modalCloseHandler}>
                برگشت
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default StudentResponseModal;
