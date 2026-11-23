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

import "./_roomPendingRequests.scss";

import { DORM_REPORT_PENDING_REQUESTS } from "../DormReportRequestTypes";

const PAGE_TITLE = "لیست درخواست های در انتظار پرداخت";

const DormReportPendingRequests = ({ semester }: ReportSemesterType) => {
  useTitle({ text: PAGE_TITLE });

  const [
    getListOfRequests,
    { data: listOfRoomRequestData, isLoading: isListOfRoomRequestsLoading },
  ] = useGetListOfDormResidentsWithStatusCodeMutation();

  //! Get the pending list of students' requests on every mount
  useEffect(() => {
    getListOfRequests({ statusCode: DORM_REPORT_PENDING_REQUESTS, semester });
  }, [semester]);

  return (
    <>
      <CustomDormRequestsExcelButton
        semester={semester}
        status={DORM_REPORT_PENDING_REQUESTS?.toString()}
        title={PAGE_TITLE}
      />
      <div>
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
          {...TABLE_PROPS(listOfRoomRequestData?.data?.length || 0)}
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

export default DormReportPendingRequests;
