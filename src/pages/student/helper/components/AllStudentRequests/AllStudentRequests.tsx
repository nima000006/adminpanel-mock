import { useEffect, useState } from "react";

import { Button } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { toast } from "react-toastify";

import StatusHistoryModal from "@components/Modals/StudentModule/StatusHistory/StatusHistoryModal";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import StudentCardModal from "@components/StudentCardModal/StudentCardModal";
import { getAllStudentCardResponse } from "@components/StudentModules/@types/@requests";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { StudentCardProps } from "@infra/models/general.model";
import { ALL_CODE, GET_ALL } from "@infra/models/studentStatus";
import AllStudentSTable from "@infra/models/tableModels/StudentTableModels/AllStudentSTable/AllStudentSTable";
import { useGetAllStudentCardMutation } from "@infra/states/redux/Apis/studentApi";
import { GENERAL_ERROR_MESSAGE } from "@infra/VARS/globalToasts/globalToasts";
import "./_allStudentRequests.scss";

const AllStudentRequests = () => {
  const [dataSource, setDataSource] = useState<StudentCardProps[]>([]);
  const [studentModal, setStudentModal] = useState({ isOpen: false, id: -1 });
  const [historyModal, setHistoryModal] = useState({ id: -1, isOpen: false });

  //? ================================  Api Calls ================================
  const [getAllStudents, { isLoading: isGetAllStudentsLoading }] =
    useGetAllStudentCardMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getListData();
  }, []);

  //* ================================ Util Functions ================================
  const onGetAllStudentSuccess = async (info: getAllStudentCardResponse) => {
    if (info?.status === 200) {
      setDataSource(info?.data?.studentCardDtoList ?? []);
    }
  };

  const getListData = () => {
    getAllStudents({
      status: ALL_CODE,
      requestType: GET_ALL,
    })
      .unwrap()
      .then(onGetAllStudentSuccess);
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
      {/* <AdvancedModal
        closeModalHandler={() => setAdvancedModal({ isOpen: false })}
        isModalOpen={advancedModal?.isOpen}
        title="فیلتر پیشرفته"
        setTableData={setTableData}
        setIsAdvanceModalDataShowing={setIsAdvanceModalDataShowing}
        currentTab={tableStatus}
        cardRequestType={cardRequestType}
      /> */}
      <StudentCardModal
        studentModal={studentModal}
        setStudentModal={setStudentModal}
        getListData={getListData}
      />
      <StatusHistoryModal historyModal={historyModal} setHistoryModal={setHistoryModal} />
      <div className="action-bar-container ready-to-print-action-bar-container">
        <Button
          type="primary"
          icon={<AiOutlineFilter />}
          size="middle"
          //   onClick={onClickHomeActionBarFilter}
        >
          فیلتر پیشرفته
        </Button>
      </div>
      <CustomTable
        loading={isGetAllStudentsLoading}
        dataSource={dataSource}
        columns={AllStudentSTable({
          onCheckoutModalClick,
          onStatusHistoryClickHandler,
        })}
        className="student-all-table-container"
        pagination={paginationConfig}
        {...TABLE_PROPS(dataSource?.length)}
      />
    </>
  );
};

export default AllStudentRequests;
