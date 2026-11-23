import { useEffect } from "react";

import { AiOutlineFilter } from "react-icons/ai";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { CLOSED_CODE } from "@infra/models/studentStatus";
import ReportGeneralStudentTableModel from "@infra/models/tableModels/Reports/student/General/ReportGeneralStudentTableModel";
import { useGetAllStudentCardMutation } from "@infra/states/redux/Apis/studentApi";

const ReportStudentClosedRequests = () => {
  const [
    getAllStudents,
    { data: getAllStudentData, isLoading: isGetAllStudentsLoading },
  ] = useGetAllStudentCardMutation();
  useEffect(() => {
    getAllStudents({
      status: CLOSED_CODE,
      requestType: 2,
    });
  }, []);

  return (
    <>
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
        dataSource={
          //   isAdvanceModalDataShowing && tableData?.msg === "اطلاعاتی یافت نشد"
          //     ? []
          //     : isAdvanceModalDataShowing && tableData?.data && tableData?.data?.length > 0
          //     ? tableData?.data
          //     : getAllStudentData?.data
          getAllStudentData?.data?.studentCardDtoList
        }
        columns={ReportGeneralStudentTableModel({
          // onStatusHistoryClickHandler,
        })}
        // rowSelection={{
        //   type: "checkbox",
        //   ...rowSelection,
        // }}
        pagination={paginationConfig}
        {...TABLE_PROPS(getAllStudentData?.data?.studentCardDtoList?.length || 0)}
      />
    </>
  );
};

export default ReportStudentClosedRequests;
