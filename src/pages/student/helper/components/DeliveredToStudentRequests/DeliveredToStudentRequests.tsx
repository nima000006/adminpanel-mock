import { useEffect, useState } from "react";

import { AiOutlineFilter } from "react-icons/ai";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import StatusHistoryModal from "@components/Modals/StudentModule/StatusHistory/StatusHistoryModal";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import StudentCardModal from "@components/StudentCardModal/StudentCardModal";
import { getAllStudentCardResponse } from "@components/StudentModules/@types/@requests";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { StudentCardProps } from "@infra/models/general.model";
import { DELIVERED_TO_STUDENT_CODE, GET_ALL } from "@infra/models/studentStatus";
import GeneralStudentTable from "@infra/models/tableModels/StudentTableModels/GeneralStudentTable/GeneralStudentTable";
import { useGetAllStudentCardMutation } from "@infra/states/redux/Apis/studentApi";
import { GENERAL_ERROR_MESSAGE } from "@infra/VARS/globalToasts/globalToasts";

const DeliveredToStudentRequests = () => {
  const [studentModal, setStudentModal] = useState({ isOpen: false, id: -1 });
  const [historyModal, setHistoryModal] = useState({ id: -1, isOpen: false });
  const [dataSource, setDataSource] = useState<StudentCardProps[]>([]);

  //? ================================  Api Calls ================================
  const [getAllStudents, { isLoading: isGetAllStudentsLoading }] =
    useGetAllStudentCardMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getListData();
  }, []);

  //* =============================== Util Functions =============================
  const onGetAllSuccess = async (response: getAllStudentCardResponse) => {
    if (response?.status === 200) {
      setDataSource(response?.data?.studentCardDtoList);
    }
  };

  const getListData = () => {
    getAllStudents({
      status: DELIVERED_TO_STUDENT_CODE,
      requestType: GET_ALL,
    })
      .unwrap()
      .then(onGetAllSuccess);
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
      <div className="action-bar-container ready-to-print-action-bar-container">
        <CustomButton
          type="primary"
          icon={<AiOutlineFilter />}
          size="middle"
          //   onClick={onClickHomeActionBarFilter}
        >
          فیلتر پیشرفته
        </CustomButton>
      </div>
      <CustomTable
        loading={isGetAllStudentsLoading}
        dataSource={dataSource}
        columns={GeneralStudentTable({
          onCheckoutModalClick,
          onStatusHistoryClickHandler,
        })}
        pagination={paginationConfig}
        {...TABLE_PROPS(dataSource?.length)}
      />
    </>
  );
};

export default DeliveredToStudentRequests;
