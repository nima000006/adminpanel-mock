import { useEffect, useState } from "react";

import { Button } from "antd";
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { AiOutlineFilter } from "react-icons/ai";
import DatePicker from "react-multi-date-picker";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import ConfirmationModal from "@components/Modals/GeneralModals/ConfirmationModal/ConfirmationModal";
import MassiveModal from "@components/Modals/MassiveModal/MassiveModal";
import StatusHistoryModal from "@components/Modals/StudentModule/StatusHistory/StatusHistoryModal";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import StudentCardModal from "@components/StudentCardModal/StudentCardModal";
import {
  BulkStudentUpdateResponse,
  getAllStudentCardResponse,
} from "@components/StudentModules/@types/@requests";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { StudentCardProps } from "@infra/models/general.model";
import {
  GET_ALL,
  LOST_CODE,
  READY_TO_DELIVER_CODE,
  RETURNED_CODE,
} from "@infra/models/studentStatus";
import GeneralStudentTable from "@infra/models/tableModels/StudentTableModels/GeneralStudentTable/GeneralStudentTable";
import {
  useBulkStudentUpdateMutation,
  useGetAllStudentCardMutation,
} from "@infra/states/redux/Apis/studentApi";
import { GENERAL_ERROR_MESSAGE } from "@infra/VARS/globalToasts/globalToasts";
import "./_returnedRequests.scss";

const ReturnedRequests = () => {
  const [selectedUsers, setSelectedUsers] = useState<StudentCardProps[]>();
  const [studentModal, setStudentModal] = useState({ isOpen: false, id: -1 });
  const [historyModal, setHistoryModal] = useState({ id: -1, isOpen: false });
  const [dataSource, setDataSource] = useState<StudentCardProps[]>([]);
  const [groupUnitName, setGroupUnitName] = useState("");
  const [groupCollegeName, setGroupCollegeName] = useState("");
  const [groupAdminName, setGroupAdminName] = useState("");
  const [datePickerValue, setDatePickerValue] = useState("");
  const [confirmModal, setConfirmModal] = useState<{
    target: number;
    isOpen: boolean;
    msg: string;
  }>({
    isOpen: false,
    target: -1,
    msg: "",
  });
  const [massiveModal, setMassiveModal] = useState({
    isOpen: false,
    title: "",
  });

  //? ================================  Api Calls ================================
  const [getAllStudents, { isLoading: isGetAllStudentsLoading }] =
    useGetAllStudentCardMutation();

  // Request UPDATE STUDENT STATUS
  const [bulkStudentUpdate, { isLoading: isBulkUpdateLoading }] =
    useBulkStudentUpdateMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getAllStudentRequest();
  }, []);

  //* ============================= Util Functions ===========================
  const onGetAllStudentSuccess = async (response: getAllStudentCardResponse) => {
    if (response?.status === 200) {
      setDataSource(response?.data?.studentCardDtoList ?? []);
      resetModal();
    }
  };

  const getAllStudentRequest = () => {
    getAllStudents({
      status: RETURNED_CODE,
      requestType: GET_ALL,
    })
      .unwrap()
      .then(onGetAllStudentSuccess);
  };

  const onBulkStudentUpdateSuccess = async (response: BulkStudentUpdateResponse) => {
    if (response?.status === 200) {
      getAllStudentRequest();
      resetModal();
    }
  };

  // modal requests for bulk update
  const onConfirmClickHandler = () => {
    if (!selectedUsers) {
      return toast.error(GENERAL_ERROR_MESSAGE, { toastId: GENERAL_ERROR_MESSAGE });
    }
    if (selectedUsers?.some((item) => !item.key)) {
      return toast.error(GENERAL_ERROR_MESSAGE, { toastId: GENERAL_ERROR_MESSAGE });
    }
    if (confirmModal?.target < 1) {
      return toast.error(GENERAL_ERROR_MESSAGE, { toastId: GENERAL_ERROR_MESSAGE });
    }

    bulkStudentUpdate({
      statusId: confirmModal?.target,
      studentCardIds: selectedUsers.map((item) => item?.key),
    })
      .unwrap()
      .then(onBulkStudentUpdateSuccess);
  };

  // reset modal states to default
  const resetModal = () => {
    setConfirmModal({ isOpen: false, msg: "", target: -1 });
    setSelectedUsers([]);
  };

  // On row check box selection change
  const rowSelection = {
    onChange: (_: React.Key[], selectedRows: StudentCardProps[]) => {
      setSelectedUsers(selectedRows);
    },
  };

  // Custom Text Generator
  const adminGroupGeneratedText = () => {
    return `دانشجوی گرامی، کارت دانشجویی شما آماده می باشد. لطفا برای دریافت کارت در تاریخ ${datePickerValue} به دانشکده ${groupCollegeName} واحد ${groupUnitName} مراجعه نمایید. نام کارشناس ${groupAdminName}`;
  };

  const onCheckoutModalClick = (key: number) => {
    if (key > 0) {
      return setStudentModal({ isOpen: true, id: key });
    } else {
      toast.error(GENERAL_ERROR_MESSAGE, { toastId: GENERAL_ERROR_MESSAGE });
    }
  };

  const onStatusHistoryClickHandler = (key: number) => {
    if (key > 0) {
      setHistoryModal({ isOpen: true, id: key });
    } else {
      toast.error(GENERAL_ERROR_MESSAGE, { toastId: GENERAL_ERROR_MESSAGE });
    }
  };

  const groupDeliverPrintSuccessHandler = () => {
    if (!selectedUsers)
      return toast.error(GENERAL_ERROR_MESSAGE, { toastId: GENERAL_ERROR_MESSAGE });
    bulkStudentUpdate({
      statusId: READY_TO_DELIVER_CODE,
      studentCardIds: selectedUsers.map((item) => item?.key),
      comment: adminGroupGeneratedText(),
    })
      .unwrap()
      .then(onBulkStudentUpdateSuccess);
    setMassiveModal({ isOpen: false, title: "" });
    setGroupAdminName("");
    setGroupCollegeName("");
    setGroupUnitName("");
  };

  // Physical status update to READY_TO_DELIVER_CODE (آماده تحویل)
  const PrintSuccessPhysicalBulkStatusUpdateHandler = () => {
    setMassiveModal({
      isOpen: true,
      title: "آماده تحویل گروهی",
    });
  };

  // مفقود update
  const onBulkUpdateToLossHandler = (target: number) => {
    if (!selectedUsers)
      return toast.error(GENERAL_ERROR_MESSAGE, { toastId: GENERAL_ERROR_MESSAGE });
    setConfirmModal({
      isOpen: true,
      msg: `آیا از مفقودی ${selectedUsers.length} کارت مطمئن هستید؟`,
      target,
    });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      <StudentCardModal
        studentModal={studentModal}
        setStudentModal={setStudentModal}
        getListData={getAllStudentRequest}
      />
      <StatusHistoryModal historyModal={historyModal} setHistoryModal={setHistoryModal} />
      <ConfirmationModal
        title=""
        closeModalHandler={() => setConfirmModal({ isOpen: false, target: -1, msg: "" })}
        isModalOpen={confirmModal?.isOpen}
        onConfirmClickHandler={onConfirmClickHandler}
        msg={confirmModal?.msg}
      />
      <MassiveModal
        isModalOpen={massiveModal?.isOpen}
        closeModalHandler={() => setMassiveModal({ isOpen: false, title: "" })}
        title={massiveModal?.title}
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
            />
          </div>
          <CustomDivider text="" />
          <div className="btns-container">
            <CustomButton type="primary" onClick={groupDeliverPrintSuccessHandler}>
              آماده تحویل
            </CustomButton>
            <CustomButton
              type="default"
              onClick={() => setMassiveModal({ isOpen: false, title: "" })}
            >
              برگشت
            </CustomButton>
          </div>
        </div>
      </MassiveModal>
      <div className="student-returned-container">
        <div className="action-bar-container ready-to-print-action-bar-container">
          <ToolBox
            rightSide={
              <CustomButton
                type="primary"
                icon={<AiOutlineFilter />}
                size="middle"
                // onClick={onClickHomeActionBarFilter}
              >
                فیلتر پیشرفته
              </CustomButton>
            }
            leftSide={
              <div className="action-bar-btns-left-side-container">
                <CustomButton
                  type="default"
                  className={`action-btn ${
                    !selectedUsers || selectedUsers?.length === 0
                      ? "action-btn-disabled"
                      : ""
                  }`}
                  size="middle"
                  disabled={!selectedUsers || selectedUsers?.length === 0}
                  onClick={() => {
                    PrintSuccessPhysicalBulkStatusUpdateHandler();
                  }}
                >
                  آماده تحویل حضوری
                </CustomButton>
                <Button
                  type="default"
                  danger
                  className={`${
                    !selectedUsers || selectedUsers?.length === 0
                      ? "action-btn-disabled"
                      : ""
                  }`}
                  size="middle"
                  disabled={!selectedUsers || selectedUsers?.length === 0}
                  onClick={() => {
                    onBulkUpdateToLossHandler(LOST_CODE);
                  }}
                >
                  مفقود
                </Button>
              </div>
            }
          />
        </div>
        <CustomTable
          loading={isGetAllStudentsLoading || isBulkUpdateLoading}
          dataSource={dataSource}
          columns={GeneralStudentTable({
            onCheckoutModalClick,
            onStatusHistoryClickHandler,
          })}
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          pagination={paginationConfig}
          {...TABLE_PROPS(dataSource?.length)}
        />
      </div>
    </>
  );
};

export default ReturnedRequests;
