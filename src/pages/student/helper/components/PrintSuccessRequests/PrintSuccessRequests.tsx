import { useEffect, useState } from "react";

import { Button } from "antd";
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { AiOutlineFilter } from "react-icons/ai";
import DatePicker from "react-multi-date-picker";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
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
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";

import paginationConfig from "../../../../../infrastructure/helpers/TableHelpers/config/tableConfig";
import { StudentCardProps } from "../../../../../infrastructure/models/general.model";
import {
  GET_ALL,
  LOST_CODE,
  PACKET_GETTING_READY_CODE,
  PHYSICAL,
  POSTAL,
  PRINT_SUCCESS_CODE,
  READY_TO_DELIVER_CODE,
  READY_TO_PRINT_CODE,
} from "../../../../../infrastructure/models/studentStatus";
import GeneralStudentTable from "../../../../../infrastructure/models/tableModels/StudentTableModels/GeneralStudentTable/GeneralStudentTable";
import {
  useBulkStudentUpdateMutation,
  useGetAllStudentCardMutation,
} from "../../../../../infrastructure/states/redux/Apis/studentApi";
import {
  ARE_YOU_SURE,
  GENERAL_ERROR_MESSAGE,
} from "../../../../../infrastructure/VARS/globalToasts/globalToasts";

import "./_printSuccessRequests.scss";

const PrintSuccessRequests = () => {
  const [dataSource, setDataSource] = useState<StudentCardProps[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<StudentCardProps[]>();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [datePickerValue, setDatePickerValue] = useState("");
  const [groupUnitName, setGroupUnitName] = useState("");
  const [groupCollegeName, setGroupCollegeName] = useState("");
  const [groupAdminName, setGroupAdminName] = useState("");
  const [studentModal, setStudentModal] = useState({ isOpen: false, id: -1 });
  const [historyModal, setHistoryModal] = useState({ id: -1, isOpen: false });
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    msg: string;
    target: number;
  }>({
    isOpen: false,
    msg: "",
    target: -1,
  });
  const [cardRequestType, setCardRequestType] = useState<number>(POSTAL);
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
    getListData();
  }, [cardRequestType]);

  //* ================================ Util Functions ================================
  const onGetAllStudentSuccess = async (response: getAllStudentCardResponse) => {
    if (response?.status === 200) {
      setDataSource(response?.data?.studentCardDtoList ?? []);
    }
  };

  const getListData = () => {
    getAllStudents({
      status: PRINT_SUCCESS_CODE,
      requestType: cardRequestType,
    })
      .unwrap()
      .then(onGetAllStudentSuccess);
  };

  const resetModal = () => {
    setConfirmModal({ isOpen: false, msg: "", target: -1 });
    setSelectedUsers([]);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[], selectedRows: StudentCardProps[]) => {
      setSelectedRowKeys(selectedRowKeys);
      setSelectedUsers(selectedRows);
    },
  };

  const onChangePostalType = (
    e: React.ChangeEvent<HTMLSelectElement>,
    status: number
  ) => {
    getAllStudents({ status, requestType: +(e.target as HTMLSelectElement).value });
  };

  const onBulkStudentUpdateSuccess = async (resp: BulkStudentUpdateResponse) => {
    if (resp?.status === 200) {
      resetModal();
      getListData();
    }
  };

  // Custom Text Generator
  const adminGroupGeneratedText = () => {
    return `دانشجوی گرامی، کارت دانشجویی شما آماده می باشد. لطفا برای دریافت کارت در تاریخ ${datePickerValue} به دانشکده ${groupCollegeName} واحد ${groupUnitName} مراجعه نمایید. نام کارشناس ${groupAdminName}`;
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

  const onConfirmClickHandler = () => {
    if (confirmModal?.target > 0 && selectedUsers) {
      return bulkStudentUpdate({
        statusId: confirmModal?.target,
        studentCardIds: selectedUsers.map((item) => item?.key),
        comment: "",
      })
        .unwrap()
        .then(onBulkStudentUpdateSuccess);
    } else {
      return toast.error(GENERAL_ERROR_MESSAGE, { toastId: GENERAL_ERROR_MESSAGE });
    }
  };

  const onSendBackToReadyForPrintHandler = (target: number) => {
    setConfirmModal({ isOpen: true, msg: ARE_YOU_SURE, target });
  };

  // Postal status update to PACKET_GETTING_READY_CODE (آماده سازی پاکت)
  const PrintSuccessPostalBulkStatusUpdateHandler = (target: number) => {
    setConfirmModal({ isOpen: true, msg: ARE_YOU_SURE, target });
  };

  // Physical status update to READY_TO_DELIVER_CODE (آماده تحویل)
  const PrintSuccessPhysicalBulkStatusUpdateHandler = () => {
    setMassiveModal({ isOpen: true, title: "آماده تحویل گروهی" });
  };

  //مفقود update
  const onBulkUpdateToLossHandler = (target: number) => {
    if (!selectedUsers)
      return toast.error(GENERAL_ERROR_MESSAGE, { toastId: GENERAL_ERROR_MESSAGE });
    setConfirmModal({
      isOpen: true,
      msg: `آیا از مفقودی ${selectedUsers.length} کارت مطمئن هستید؟`,
      target,
    });
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

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      <StudentCardModal
        studentModal={studentModal}
        setStudentModal={setStudentModal}
        getListData={getListData}
      />
      <StatusHistoryModal historyModal={historyModal} setHistoryModal={setHistoryModal} />

      <div className="print-success-screen-container">
        <ConfirmationModal
          title=""
          closeModalHandler={() =>
            setConfirmModal({ isOpen: false, target: -1, msg: "" })
          }
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
              <Button type="primary" onClick={groupDeliverPrintSuccessHandler}>
                آماده تحویل
              </Button>
              <Button
                type="default"
                onClick={() => setMassiveModal({ isOpen: false, title: "" })}
              >
                برگشت
              </Button>
            </div>
          </div>
        </MassiveModal>

        <ToolBox
          rightSide={
            <CustomSelect
              className="select"
              name="postalCardType"
              label="نوع کارت"
              placeholder="انتخاب کنید"
              options={[
                { title: "کارت (حضوری)", id: PHYSICAL },
                { title: "کارت (پستی)", id: POSTAL },
              ]}
              value={cardRequestType}
              skipFormOnChange
              onChange={(value) => {
                const numericValue = Number(value);
                setSelectedUsers([]);
                setSelectedRowKeys([]);
                setCardRequestType(numericValue);
                onChangePostalType(
                  {
                    target: { value: numericValue },
                  } as unknown as React.ChangeEvent<HTMLSelectElement>,
                  READY_TO_PRINT_CODE
                );
              }}
            />
          }
        />
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
            <div className="action-bar-container ready-to-print-action-bar-container">
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
                    onSendBackToReadyForPrintHandler(READY_TO_PRINT_CODE);
                  }}
                >
                  برگشت به آماده چاپ
                </CustomButton>
                <CustomButton
                  type="default"
                  className={`action-btn ${
                    !selectedUsers || selectedUsers?.length === 0
                      ? "action-btn-disabled"
                      : ""
                  }`}
                  size="middle"
                  disabled={!selectedUsers || selectedUsers?.length === 0}
                  // key={item.id}
                  onClick={() => {
                    if (cardRequestType === POSTAL || cardRequestType === GET_ALL) {
                      PrintSuccessPostalBulkStatusUpdateHandler(
                        PACKET_GETTING_READY_CODE
                      );
                    } else if (cardRequestType === PHYSICAL) {
                      PrintSuccessPhysicalBulkStatusUpdateHandler();
                    }
                  }}
                >
                  {cardRequestType === 0 ? "آماده تحویل" : "آماده سازی پاکت"}
                </CustomButton>
                <CustomButton
                  type="default"
                  className={` ${
                    !selectedUsers || selectedUsers?.length === 0
                      ? "action-btn-disabled"
                      : ""
                  }`}
                  danger
                  size="middle"
                  disabled={!selectedUsers || selectedUsers?.length === 0}
                  // key={item.id}
                  onClick={() => {
                    onBulkUpdateToLossHandler(LOST_CODE);
                  }}
                >
                  مفقود
                </CustomButton>
              </div>
            </div>
          }
        />

        <CustomTable
          loading={isGetAllStudentsLoading || isBulkUpdateLoading}
          dataSource={dataSource}
          columns={GeneralStudentTable({
            onCheckoutModalClick: onCheckoutModalClick,
            onStatusHistoryClickHandler: onStatusHistoryClickHandler,
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

export default PrintSuccessRequests;
