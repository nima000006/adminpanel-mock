import { useEffect, useState } from "react";

import { Button } from "antd";
import { AiOutlineFilter } from "react-icons/ai";

import StatusHistoryModal from "@components/Modals/StudentModule/StatusHistory/StatusHistoryModal";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { GET_ALL, REJECTED_CODE } from "@infra/models/studentStatus";
import ReportGeneralStudentTableModel from "@infra/models/tableModels/Reports/student/General/ReportGeneralStudentTableModel";
import { useGetAllStudentCardMutation } from "@infra/states/redux/Apis/studentApi";

const ReportStudentRejectedRequests = () => {
  const [historyModal, setHistoryModal] = useState({ id: -1, isOpen: false });

  //!
  const [
    getAllStudents,
    { data: getAllStudentData, isLoading: isGetAllStudentsLoading },
  ] = useGetAllStudentCardMutation();

  //!
  useEffect(() => {
    getAllStudents({
      status: REJECTED_CODE,
      requestType: GET_ALL,
    });
  }, []);

  return (
    <>
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
        dataSource={getAllStudentData?.data?.studentCardDtoList}
        columns={
          ReportGeneralStudentTableModel({
            // onCheckoutModalClick,
          }) as any
        }
        pagination={paginationConfig}
        {...TABLE_PROPS(getAllStudentData?.data?.studentCardDtoList?.length || 0)}
      />
    </>
  );
};

export default ReportStudentRejectedRequests;
