import { useEffect, useRef, useState } from "react";

import { AiOutlineFilter } from "react-icons/ai";
import { useReactToPrint } from "react-to-print";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import ConfirmationModal from "@components/Modals/GeneralModals/ConfirmationModal/ConfirmationModal";
import StatusHistoryModal from "@components/Modals/StudentModule/StatusHistory/StatusHistoryModal";
import StudentGroupPacketToPrint from "@components/PrintingHelpers/studentGroupPacketToPrint/studentGroupPacketToPrint";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import StudentCardModal from "@components/StudentCardModal/StudentCardModal";
import {
  BulkStudentUpdateResponse,
  getAllStudentCardResponse,
} from "@components/StudentModules/@types/@requests";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import {
  DELIVERED_TO_POST_CODE,
  GET_ALL,
  LOST_CODE,
  READY_TO_POST_CODE,
} from "@infra/models/studentStatus";
import GeneralStudentTable from "@infra/models/tableModels/StudentTableModels/GeneralStudentTable/GeneralStudentTable";
import {
  useBulkStudentUpdateMutation,
  useGetAllStudentCardMutation,
} from "@infra/states/redux/Apis/studentApi";

import { StudentCardProps } from "../../../../../infrastructure/models/general.model";
import {
  ARE_YOU_SURE,
  GENERAL_ERROR_MESSAGE,
} from "../../../../../infrastructure/VARS/globalToasts/globalToasts";

import "./_readyToPostRequests.scss";

const ReadyToPostRequests = () => {
  const studentGroupPacketRef = useRef<HTMLDivElement>(null);
  const [selectedUsers, setSelectedUsers] = useState<StudentCardProps[]>();
  const [studentModal, setStudentModal] = useState({ isOpen: false, id: -1 });
  const [historyModal, setHistoryModal] = useState({ id: -1, isOpen: false });
  const [dataSource, setDataSource] = useState<StudentCardProps[]>([]);
  const [confirmModal, setConfirmModal] = useState<{
    target: number;
    isOpen: boolean;
    msg: string;
  }>({
    isOpen: false,
    target: -1,
    msg: "",
  });

  //? ================================  Api Calls ================================
  const [
    getAllStudents,
    { data: getAllStudentData, isLoading: isGetAllStudentsLoading },
  ] = useGetAllStudentCardMutation();

  // Request UPDATE STUDENT STATUS
  const [bulkStudentUpdate, { isLoading: isBulkUpdateLoading }] =
    useBulkStudentUpdateMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getListData();
  }, []);

  // On student get all request status change below things 👇 happens
  useEffect(() => {
    // it has to change to to if getAllStudentData's status is equal to 200
    setDataSource(getAllStudentData?.data?.studentCardDtoList ?? []);
    //todo [saman]: Add error handling in the case of request status other than 200
    // else {
    //   toast.error(GETTING_DATA_ERROR_MESSAGE, { toastId: GETTING_DATA_ERROR_MESSAGE });
    // }
  }, [getAllStudentData?.status]);

  //* ================================ Util Functions ================================
  const onGetAllStudentSuccess = async (response: getAllStudentCardResponse) => {
    if (response?.status === 200) {
      setDataSource(response?.data?.studentCardDtoList ?? []);
      resetModal();
    }
  };

  const getListData = () => {
    getAllStudents({
      status: READY_TO_POST_CODE,
      requestType: GET_ALL,
    })
      .unwrap()
      .then(onGetAllStudentSuccess);
  };

  const onBulkStudentUpdateSuccess = async (response: BulkStudentUpdateResponse) => {
    if (response?.status === 200) {
      resetModal();
      getListData();
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

  // On row check box selection change
  const rowSelection = {
    onChange: (_: React.Key[], selectedRows: StudentCardProps[]) => {
      setSelectedUsers(selectedRows);
    },
  };

  // reset modal states to default
  const resetModal = () => {
    setConfirmModal({ isOpen: false, msg: "", target: -1 });
    setSelectedUsers([]);
  };

  const onDeliverToPostClickHandler = (target: number) => {
    setConfirmModal({
      isOpen: true,
      msg: ARE_YOU_SURE,
      target,
    });
  };

  const onStudentGroupPacketPrintHandler = useReactToPrint({
    contentRef: studentGroupPacketRef,
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

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="student-ready-to-post-container">
      <StudentCardModal
        studentModal={studentModal}
        setStudentModal={setStudentModal}
        getListData={getListData}
      />
      <StatusHistoryModal historyModal={historyModal} setHistoryModal={setHistoryModal} />
      <ConfirmationModal
        title=""
        closeModalHandler={() => setConfirmModal({ isOpen: false, target: -1, msg: "" })}
        isModalOpen={confirmModal?.isOpen}
        onConfirmClickHandler={onConfirmClickHandler}
        msg={confirmModal?.msg}
      />
      <div style={{ display: "none" }}>
        <StudentGroupPacketToPrint ref={studentGroupPacketRef} data={selectedUsers} />
      </div>
      <div className="action-bar-container">
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
                className={`action-btn action-btn-disabled`}
                size="middle"
                // disabled={!selectedUsers || selectedUsers?.length === 0}
                disabled={true}
                onClick={() => {
                  // onStudentGroupCardPrintHandler();
                }}
              >
                خروجی اکسل
              </CustomButton>
              <CustomButton
                type="default"
                className="action-btn action-btn-disabled"
                size="middle"
                disabled={true}
                onClick={() => {
                  // onStudentGroupChangeStatusToSuccessHandler();
                }}
              >
                وارد کردن اکسل
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
                  onDeliverToPostClickHandler(DELIVERED_TO_POST_CODE);
                }}
              >
                تحویل به پست
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
                onClick={() => {
                  onStudentGroupPacketPrintHandler();
                }}
              >
                چاپ پاکت
              </CustomButton>
              <CustomButton
                danger
                type="default"
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
              </CustomButton>
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
  );
};

export default ReadyToPostRequests;
