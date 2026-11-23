import React, { useEffect, useRef, useState } from "react";

import { AiOutlineFilter } from "react-icons/ai";
import { useReactToPrint } from "react-to-print";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomSelect from "@components/CustomInputs/CustomSelect/CustomSelect";
import ConfirmationModal from "@components/Modals/GeneralModals/ConfirmationModal/ConfirmationModal";
import StatusHistoryModal from "@components/Modals/StudentModule/StatusHistory/StatusHistoryModal";
import StudentGroupCardToPrint from "@components/PrintingHelpers/StudentGroupCardToPrint/StudentGroupCardToPrint";
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
  PHYSICAL,
  POSTAL,
  PRINT_SUCCESS_CODE,
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

import "./_readyToPrintRequests.scss";

const ReadyToPrintRequests = () => {
  const studentGroupCardRef = useRef<HTMLDivElement>(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [confirmModal, setConfirmModal] = useState(false);
  const [dataSource, setDataSource] = useState<StudentCardProps[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<StudentCardProps[]>();
  const [cardRequestType, setCardRequestType] = useState<number>(POSTAL);
  const [studentModal, setStudentModal] = useState({ isOpen: false, id: -1 });
  const [historyModal, setHistoryModal] = useState({ id: -1, isOpen: false });

  //? ===============================  Api Calls ==============================
  const [getAllStudents, { isLoading: isGetAllStudentsLoading }] =
    useGetAllStudentCardMutation();

  // Request UPDATE STUDENT STATUS
  const [bulkStudentUpdate, { isLoading: isBulkUpdateLoading }] =
    useBulkStudentUpdateMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getAllStudentRequest();
  }, [cardRequestType]);

  //* ============================ Util Functions ============================
  const onGetAllStudentSuccess = async (response: getAllStudentCardResponse) => {
    if (response?.status === 200) {
      setDataSource(response?.data?.studentCardDtoList ?? []);
      resetModal();
    }
  };

  const getAllStudentRequest = () => {
    getAllStudents({
      status: READY_TO_PRINT_CODE,
      requestType: cardRequestType,
    })
      .unwrap()
      .then(onGetAllStudentSuccess);
  };

  // table's row selecting logic
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[], selectedRows: StudentCardProps[]) => {
      setSelectedRowKeys(selectedRowKeys);
      setSelectedUsers(selectedRows);
    },
  };
  // reset modal states to default
  const resetModal = () => {
    setConfirmModal(false);
    setSelectedUsers([]);
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
    if (selectedUsers.some((item) => !item.key)) {
      return toast.error(GENERAL_ERROR_MESSAGE, { toastId: GENERAL_ERROR_MESSAGE });
    }
    bulkStudentUpdate({
      statusId: PRINT_SUCCESS_CODE,
      studentCardIds: selectedUsers.map((item) => item?.key),
    })
      .unwrap()
      .then(onBulkStudentUpdateSuccess);
  };

  const onChangePostalType = (
    e: React.ChangeEvent<HTMLSelectElement>,
    status: number
  ) => {
    getAllStudents({ status, requestType: +(e.target as HTMLSelectElement).value });
  };

  const onStudentGroupChangeStatusToSuccessHandler = () => {
    setConfirmModal(true);
  };

  // group printing logic trigger
  const onStudentGroupCardPrintHandler = useReactToPrint({
    contentRef: studentGroupCardRef,
  });

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
        getListData={getAllStudentRequest}
      />
      <StatusHistoryModal historyModal={historyModal} setHistoryModal={setHistoryModal} />
      <div style={{ display: "none" }}>
        <StudentGroupCardToPrint ref={studentGroupCardRef} data={selectedUsers} />
      </div>
      <ConfirmationModal
        title=""
        closeModalHandler={() => setConfirmModal(false)}
        isModalOpen={confirmModal}
        onConfirmClickHandler={onConfirmClickHandler}
        msg={ARE_YOU_SURE}
      />
      <div className="ready-to-print-actions-container">
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
              className="advanced-filter-btn"
              // onClick={onClickHomeActionBarFilter}
            >
              فیلتر پیشرفته
            </CustomButton>
          }
          leftSide={
            <div className="action-bar-container">
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
                  // key={item.id}
                  onClick={() => {
                    onStudentGroupChangeStatusToSuccessHandler();
                  }}
                >
                  چاپ موفق
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
                    onStudentGroupCardPrintHandler();
                  }}
                >
                  چاپ گروهی
                </CustomButton>
              </div>
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
    </>
  );
};

export default ReadyToPrintRequests;
