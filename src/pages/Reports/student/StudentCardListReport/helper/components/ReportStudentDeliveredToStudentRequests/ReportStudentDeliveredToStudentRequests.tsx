import { useEffect, useState } from "react";

import { AiOutlineFilter } from "react-icons/ai";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import StatusHistoryModal from "@components/Modals/StudentModule/StatusHistory/StatusHistoryModal";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { DELIVERED_TO_STUDENT_CODE, GET_ALL } from "@infra/models/studentStatus";
import ReportGeneralStudentTableModel from "@infra/models/tableModels/Reports/student/General/ReportGeneralStudentTableModel";
import { useGetAllStudentCardMutation } from "@infra/states/redux/Apis/studentApi";
import { GENERAL_ERROR_MESSAGE } from "@infra/VARS/globalToasts/globalToasts";

const ReportStudentDeliveredToStudentRequests = () => {
  const [historyModal, setHistoryModal] = useState({ id: -1, isOpen: false });

  const [
    getAllStudents,
    { data: getAllStudentData, isLoading: isGetAllStudentsLoading },
  ] = useGetAllStudentCardMutation();

  useEffect(() => {
    getAllStudents({
      status: DELIVERED_TO_STUDENT_CODE,
      requestType: GET_ALL,
    });
  }, []);

  //!
  const onStatusHistoryClickHandler = (key: number) => {
    if (key > 0) {
      setHistoryModal({ isOpen: true, id: key });
    } else {
      toast.error(GENERAL_ERROR_MESSAGE, { toastId: GENERAL_ERROR_MESSAGE });
    }
  };
  return (
    <>
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
        dataSource={getAllStudentData?.data?.studentCardDtoList}
        columns={ReportGeneralStudentTableModel({
          onStatusHistoryClickHandler,
        })}
        pagination={paginationConfig}
        {...TABLE_PROPS(getAllStudentData?.data?.studentCardDtoList?.length || 0)}
      />
    </>
  );
};

export default ReportStudentDeliveredToStudentRequests;
