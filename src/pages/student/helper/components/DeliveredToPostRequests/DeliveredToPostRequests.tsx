import { useEffect, useState } from "react";

import { AiOutlineFilter } from "react-icons/ai";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import ConfirmationModal from "@components/Modals/GeneralModals/ConfirmationModal/ConfirmationModal";
import StatusHistoryModal from "@components/Modals/StudentModule/StatusHistory/StatusHistoryModal";
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
  DELIVERED_TO_POST_CODE,
  GET_ALL,
  LOST_CODE,
  RETURNED_CODE,
} from "@infra/models/studentStatus";
import GeneralStudentTable from "@infra/models/tableModels/StudentTableModels/GeneralStudentTable/GeneralStudentTable";
import {
  useBulkStudentUpdateMutation,
  useGetAllStudentCardMutation,
} from "@infra/states/redux/Apis/studentApi";
import {
  ARE_YOU_SURE,
  GENERAL_ERROR_MESSAGE,
} from "@infra/VARS/globalToasts/globalToasts";
import "./_deliveredToPostRequests.scss";

const DeliveredToPostRequests = () => {
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
  const [getAllStudents, { isLoading: isGetAllStudentsLoading }] =
    useGetAllStudentCardMutation();

  // Request UPDATE STUDENT STATUS
  const [bulkStudentUpdate, { isLoading: isBulkUpdateLoading }] =
    useBulkStudentUpdateMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getListData();
  }, []);

  //* ================================ Util Functions ================================
  const onGetAllStudentSuccess = async (response: getAllStudentCardResponse) => {
    if (response?.status === 200) {
      setDataSource(response?.data?.studentCardDtoList ?? []);
      resetModal();
    }
  };

  const getListData = () => {
    getAllStudents({
      status: DELIVERED_TO_POST_CODE,
      requestType: GET_ALL,
    })
      .unwrap()
      .then(onGetAllStudentSuccess);
  };

  // reset modal states to default
  const resetModal = () => {
    setConfirmModal({ isOpen: false, msg: "", target: -1 });
    setSelectedUsers([]);
  };

  const onBulkStudentUpdateSuccess = async (response: BulkStudentUpdateResponse) => {
    if (response?.status === 200) {
      getListData();
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

  // On row check box selection change
  const rowSelection = {
    onChange: (_: React.Key[], selectedRows: StudentCardProps[]) => {
      setSelectedUsers(selectedRows);
    },
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

  const onReturnToClickHandler = (target: number) => {
    setConfirmModal({
      isOpen: true,
      msg: ARE_YOU_SURE,
      target,
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
      <div className="student-deliver-to-post-container">
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
                  className="action-btn action-btn-disabled"
                  size="middle"
                  disabled={true}
                  onClick={() => {
                    // onStudentGroupCardPrintHandler();
                  }}
                >
                  خروجی اکسل
                </CustomButton>
                <CustomButton
                  type="default"
                  danger
                  className={`action-btn ${
                    !selectedUsers || selectedUsers?.length === 0
                      ? "action-btn-disabled"
                      : ""
                  }`}
                  size="middle"
                  disabled={!selectedUsers || selectedUsers?.length === 0}
                  // key={item.id}
                  onClick={() => {
                    onReturnToClickHandler(RETURNED_CODE);
                  }}
                >
                  عودت
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
    </>
  );
};

export default DeliveredToPostRequests;
