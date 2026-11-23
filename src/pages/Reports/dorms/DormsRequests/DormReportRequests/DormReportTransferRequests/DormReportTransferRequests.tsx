import { useState } from "react";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import CustomTotalTableItems from "@components/Renderers/CustomTotalTableItems/CustomTotalTableItems";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";

import {
  DormReportTransferRequestsPropsType,
  MovingModalRequestType,
  TransferRequestModalDataType,
} from "./@types/@dormReportTransferRequests";
import MovingRequestModal from "../../../../../../components/Modals/Dorm/MovingRequestModal/MovingRequestModal";
import TransferRequestModal from "../../../../../../components/Modals/Dorm/TransferRequestModal/TransferRequestModal";
import useTitle from "../../../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import paginationConfig from "../../../../../../infrastructure/helpers/TableHelpers/config/tableConfig";
import { RoomReportRequestsModel } from "../../../../../../infrastructure/models/tableModels/RoomTableModel/RoomReportRequestsModel/RoomReportRequestsModel";
import { DORM_REPORT_TRANSFER_REQUESTS } from "../DormReportRequestTypes";

import "./_transferRequests.scss";

const DormReportTransferRequests = ({
  setIsDataRefreshed,
}: DormReportTransferRequestsPropsType) => {
  useTitle({ text: "لیست درخواست های جابه جایی" });
  const [movingModalRequest, setMovingModalRequest] = useState<MovingModalRequestType>({
    id: -1,
    isOpen: false,
    userInfo: {},
  });

  const [transferRequestModalData, setTransferRequestModalData] =
    useState<TransferRequestModalDataType>({
      id: -1,
      isOpen: false,
      primaryUser: {},
    });

  return (
    <>
      <MovingRequestModal
        movingModalRequest={movingModalRequest}
        setMovingModalRequest={setMovingModalRequest}
        setTransferRequestModalData={setTransferRequestModalData}
        isExtraInfoDisable={true}
        setIsDataRefreshed={setIsDataRefreshed}
      />
      <TransferRequestModal
        setTransferRequestModalData={setTransferRequestModalData}
        transferRequestModalData={transferRequestModalData}
        setIsDataRefreshed={setIsDataRefreshed}
      />
      <div>
        <CustomTable
          dataSource={[]}
          columns={RoomReportRequestsModel({
            from: DORM_REPORT_TRANSFER_REQUESTS,
          })}
          pagination={paginationConfig}
          {...TABLE_PROPS(0)}
          //   loading={isListOfRoomRequestsLoading}
        />
      </div>
      <CustomTotalTableItems
        totalCount={0}
        label="تعداد کل درخواست ها:"
        className="mt-1"
      />
    </>
  );
};

export default DormReportTransferRequests;
