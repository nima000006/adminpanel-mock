import { useState, useEffect } from "react";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import CustomTotalTableItems from "@components/Renderers/CustomTotalTableItems/CustomTotalTableItems";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { ReportSemesterType } from "@pages/Reports/dorms/helpers/dormReportUtil";
import CustomDormRequestsExcelButton from "@pages/Room/Requests/helpers/CustomExcelButton/CustomExcelButton";

import { ActiveDormReportRequestsTableData } from "./@types/@activeDormReportRequests";
import useTitle from "../../../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import paginationConfig from "../../../../../../infrastructure/helpers/TableHelpers/config/tableConfig";
import { RoomReportRequestsModel } from "../../../../../../infrastructure/models/tableModels/RoomTableModel/RoomReportRequestsModel/RoomReportRequestsModel";
import { useGetListOfDormResidentsWithStatusCodeMutation } from "../../../../../../infrastructure/states/redux/Apis/roomApi";
import { DORM_REPORT_ACTIVE_REQUESTS } from "../DormReportRequestTypes";

import "./_roomActiveRequests.scss";
import { GetListOfDormResidentsResponse } from "../AllDormReportRequests/@types/@allDormReportRequests";

const PAGE_TITLE = "لیست درخواست های فعال";

const ActiveDormReportRequests = ({ semester }: ReportSemesterType) => {
  useTitle({ text: PAGE_TITLE });

  const [tableData, setTableData] = useState<ActiveDormReportRequestsTableData[]>([]);

  const [
    getListOfRequests,
    { data: listOfRoomRequestData, isLoading: isListOfRoomRequestsLoading },
  ] = useGetListOfDormResidentsWithStatusCodeMutation();

  //! get table Data
  const getData = () => {
    getListOfRequests({ statusCode: 1, semester })
      .unwrap()
      .then(onGetListOfRequestSuccess);
  };
  //! onGetListOfRequestSuccess
  const onGetListOfRequestSuccess = async (response: GetListOfDormResidentsResponse) => {
    if (response?.status === 200) {
      setTableData(response?.data);
    }
  };

  //! Get the whole list of students' requests on every mount
  useEffect(() => {
    getData();
    // getListOfRequests({ statusCode: 2, isActive: semester === "1" });
    // setAssignModal({ isOpen: false, key: 0, id: 0, userData: {} });
  }, [semester]);

  return (
    <>
      <div>
        <CustomDormRequestsExcelButton
          semester={semester}
          status="1"
          title={PAGE_TITLE}
        />
        <CustomTable
          dataSource={tableData}
          columns={RoomReportRequestsModel({
            from: DORM_REPORT_ACTIVE_REQUESTS,
          })}
          pagination={paginationConfig}
          // className="table-style"
          {...TABLE_PROPS(tableData?.length)}
          loading={isListOfRoomRequestsLoading}
        />
      </div>
      <CustomTotalTableItems
        totalCount={listOfRoomRequestData?.count ?? 0}
        label="تعداد کل درخواست های فعال:"
        className="mt-1"
      />
    </>
  );
};

export default ActiveDormReportRequests;
