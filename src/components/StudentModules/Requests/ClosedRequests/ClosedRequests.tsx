import { useEffect } from "react";

import { Button } from "antd";
import { AiOutlineFilter } from "react-icons/ai";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";

import paginationConfig from "../../../../infrastructure/helpers/TableHelpers/config/tableConfig";
import { CLOSED_CODE } from "../../../../infrastructure/models/studentStatus";
import GeneralStudentTable from "../../../../infrastructure/models/tableModels/StudentTableModels/GeneralStudentTable/GeneralStudentTable";
import { useGetAllStudentCardMutation } from "../../../../infrastructure/states/redux/Apis/studentApi";

const ClosedRequests = () => {
  //? ================================  Api Calls ================================
  const [
    getAllStudents,
    { data: getAllStudentData, isLoading: isGetAllStudentsLoading },
  ] = useGetAllStudentCardMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getListData();
  }, []);

  //* ================================ Util Functions ================================
  const getListData = () => {
    getAllStudents({
      status: CLOSED_CODE,
      requestType: 2,
    });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
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
        dataSource={
          //   isAdvanceModalDataShowing && tableData?.msg === "اطلاعاتی یافت نشد"
          //     ? []
          //     : isAdvanceModalDataShowing && tableData?.data && tableData?.data?.length > 0
          //     ? tableData?.data
          //     : getAllStudentData?.data
          getAllStudentData?.data?.studentCardDtoList
        }
        columns={
          GeneralStudentTable({
            // onCheckoutModalClick,
          }) as any
        }
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

export default ClosedRequests;
