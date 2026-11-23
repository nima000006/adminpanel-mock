import { useEffect, useState } from "react";

import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";

import { GetListOfDormsResponse } from "./@types/@dormsReportList";
import CreateDormModal from "../../../../components/Modals/Dorm/CreateDormModal/CreateDormModal";
import useTitle from "../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import paginationConfig from "../../../../infrastructure/helpers/TableHelpers/config/tableConfig";
import { makeSearchParams } from "../../../../infrastructure/helpers/utils";
import { ReportRoomListModel } from "../../../../infrastructure/models/tableModels/RoomTableModel/ReportDormList/ReportRoomListModel";
import { RoomListRecords } from "../../../../infrastructure/models/tableModels/RoomTableModel/RoomsList/@types/@roomListModel";
import { REPORT_DORM_LIST_DETAIL } from "../../../../infrastructure/router/routes/reports";
import { useGetListOfDormsMutation } from "../../../../infrastructure/states/redux/Apis/roomApi";
import { ROOM_HAS_NO_KEY } from "../../../../infrastructure/VARS/globalToasts/globalToasts";

const DormsReportList = () => {
  useTitle({ text: "گزارش لیست خوابگاه ها" });

  const [createModalData, setCreateModalData] = useState({ isOpen: false });
  const [dataSource, setDataSource] = useState<readonly RoomListRecords[]>([]);

  const navigate = useNavigate();

  const [getListOfDorms, { isLoading: isListOfDormLoading }] =
    useGetListOfDormsMutation();

  useEffect(() => {
    getListOfDorms().unwrap().then(onGetListOfDormsSuccess);
  }, []);

  useTitle({ text: "لیست خوابگاه ها" });

  //! onGetListOfDormsSuccess
  const onGetListOfDormsSuccess = async (response: GetListOfDormsResponse) => {
    if (response?.status === 200) {
      setDataSource(response?.data);
    }
  };

  //! See the details of each dorm which are in the table
  const roomClickHandler = (id: number) => {
    if (!id) {
      toast.warning(ROOM_HAS_NO_KEY, { toastId: ROOM_HAS_NO_KEY });
    }
    navigate({
      pathname: REPORT_DORM_LIST_DETAIL,
      search: makeSearchParams({ id }),
    });
  };

  return (
    <div>
      <CreateDormModal
        setCreateModalData={setCreateModalData}
        createModalData={createModalData}
      />

      <CustomTable
        dataSource={dataSource as any}
        columns={ReportRoomListModel({
          roomClickHandler: roomClickHandler,
        })}
        pagination={paginationConfig}
        loading={isListOfDormLoading}
        className="dorm-table-container"
        {...TABLE_PROPS(dataSource?.length)}
      />
    </div>
  );
};

export default DormsReportList;
