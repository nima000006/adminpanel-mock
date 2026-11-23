import { useEffect } from "react";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import CustomTotalTableItems from "@components/Renderers/CustomTotalTableItems/CustomTotalTableItems";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { ReportSemesterType } from "@pages/Reports/dorms/helpers/dormReportUtil";
import CustomDormRequestsExcelButton from "@pages/Room/Requests/helpers/CustomExcelButton/CustomExcelButton";

import useTitle from "../../../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import paginationConfig from "../../../../../../infrastructure/helpers/TableHelpers/config/tableConfig";
import { RoomReportRequestsModel } from "../../../../../../infrastructure/models/tableModels/RoomTableModel/RoomReportRequestsModel/RoomReportRequestsModel";
import { useGetListOfDormResidentsWithStatusCodeMutation } from "../../../../../../infrastructure/states/redux/Apis/roomApi";
import {
  DORM_REPORT_PENDING_REQUESTS,
  DORM_REPORT_REJECTED_REQUESTS,
} from "../DormReportRequestTypes";

import "./_rejectedRequests.scss";

const PAGE_TITLE = "لیست درخواست های رد شده";

const DormReportRejectedRequests = ({ semester }: ReportSemesterType) => {
  useTitle({ text: PAGE_TITLE });

  const [
    getListOfRequests,
    { data: listOfRoomRequestData, isLoading: isListOfRoomRequestsLoading },
  ] = useGetListOfDormResidentsWithStatusCodeMutation();

  //? ================================ Effects ================================
  //! Get the rejected list of students' requests on every mount
  useEffect(() => {
    getListOfRequests({ statusCode: DORM_REPORT_REJECTED_REQUESTS, semester });
  }, [semester]);

  return (
    <>
      <div>
        <CustomDormRequestsExcelButton
          semester={semester}
          status={DORM_REPORT_REJECTED_REQUESTS?.toString()}
          title={PAGE_TITLE}
        />
        <CustomTable
          dataSource={listOfRoomRequestData?.data as any}
          columns={RoomReportRequestsModel({
            from: DORM_REPORT_PENDING_REQUESTS,
          })}
          // rowSelection={{
          //   type: "checkbox",
          //   //   ...rowSelection,
          // }}
          pagination={paginationConfig}
          {...TABLE_PROPS(listOfRoomRequestData?.data.length || 0)}
          loading={isListOfRoomRequestsLoading}
        />
      </div>
      <CustomTotalTableItems
        totalCount={listOfRoomRequestData?.count ?? 0}
        label="تعداد کل درخواست های رد شده"
        className="mt-1"
      />
    </>
  );
};

export default DormReportRejectedRequests;
