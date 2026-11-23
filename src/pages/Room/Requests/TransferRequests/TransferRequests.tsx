import { useState } from "react";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import CustomTotalTableItems from "@components/Renderers/CustomTotalTableItems/CustomTotalTableItems";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";

import MovingRequestModal from "../../../../components/Modals/Dorm/MovingRequestModal/MovingRequestModal";
import TransferRequestModal from "../../../../components/Modals/Dorm/TransferRequestModal/TransferRequestModal";
import useTitle from "../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import paginationConfig from "../../../../infrastructure/helpers/TableHelpers/config/tableConfig";
import { RoomRequestTableColumns } from "../../../../infrastructure/models/tableModels/RoomTableModel/RoomRequest/RoomRequestTableModels";
import { ListOfResidentUserType } from "../../ListOfResidents/ListOfResidentsMain/@types/@listOfResidentsMain";
import { TRANSFER_REQUESTS } from "../RequestTypes";

import "./_transferRequests.scss";

const TransferRequests = ({
  setIsDataRefreshed,
}: {
  setIsDataRefreshed: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  useTitle({ text: "لیست درخواست های جابه جایی" });
  const [movingModalRequest, setMovingModalRequest] = useState<{
    id: number;
    isOpen: boolean;
    userInfo: Partial<ListOfResidentUserType>;
  }>({
    id: -1,
    isOpen: false,
    userInfo: {},
  });

  const [transferRequestModalData, setTransferRequestModalData] = useState<{
    id: number;
    isOpen: boolean;
    primaryUser: Partial<ListOfResidentUserType>;
  }>({
    id: -1,
    isOpen: false,
    primaryUser: {},
  });

  //* ================================ Util Functions ================================
  const onTransferListClickHandler = (id: number) => {
    setMovingModalRequest({ isOpen: true, id, userInfo: {} });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
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
          columns={RoomRequestTableColumns({
            from: TRANSFER_REQUESTS,
            onTransferListClickHandler: onTransferListClickHandler,
          })}
          pagination={paginationConfig}
          {...TABLE_PROPS(0)}
          //   loading={isListOfRoomRequestsLoading}
        />
      </div>
      <CustomTotalTableItems
        totalCount={0}
        label="تعداد کل درخواست های انتقالی"
        className="mt-1"
      />
    </>
  );
};

export default TransferRequests;
