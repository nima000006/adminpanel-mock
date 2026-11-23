import { useState, useEffect } from "react";

import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import { ExcelCodes } from "@infra/config/excel-codes";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";

import CustomButton from "../../../../components/CustomInputs/CustomButton/CustomButton";
import CreateDormModal from "../../../../components/Modals/Dorm/CreateDormModal/CreateDormModal";
import useTitle from "../../../../infrastructure/helpers/GeneralHelpers/useTitle/useTitle";
import paginationConfig from "../../../../infrastructure/helpers/TableHelpers/config/tableConfig";
import { makeSearchParams } from "../../../../infrastructure/helpers/utils";
import { RoomListRecords } from "../../../../infrastructure/models/tableModels/RoomTableModel/RoomsList/@types/@roomListModel";
import { RoomListModel } from "../../../../infrastructure/models/tableModels/RoomTableModel/RoomsList/RoomListModel";
import {
  DORM_CREATE_PAGE_ROUTE,
  DORM_DETAIL_PAGE_ROUTE,
  DORM_FACTOR_PAGE_ROUTE,
} from "../../../../infrastructure/router/routes/room";
import { useGetListOfDormsMutation } from "../../../../infrastructure/states/redux/Apis/roomApi";
import { EDIT } from "../../../../infrastructure/VARS/globalStrings/globalStrings";
import { ROOM_HAS_NO_KEY } from "../../../../infrastructure/VARS/globalToasts/globalToasts";
import { GetListOfDormsResponse } from "../../../Reports/dorms/DormsReportList/@types/@dormsReportList";

import "./_dorm.scss";

const Dorm = () => {
  const [createModalData, setCreateModalData] = useState({ isOpen: false });
  const [dataSource, setDataSource] = useState<RoomListRecords[]>([]);

  useTitle({ text: "لیست خوابگاه ها" });
  const navigate = useNavigate();

  //? ================================  Api Calls ================================
  const [getListOfDorms, { isLoading: isListOfDormLoading }] =
    useGetListOfDormsMutation();

  //? ================================ Effects ================================
  useEffect(() => {
    getListOfDorms().unwrap().then(onGetListOfDormsSuccess);
  }, []);

  //* ================================ Util Functions ================================
  const onGetListOfDormsSuccess = async (response: GetListOfDormsResponse) => {
    if (response?.status === 200) {
      setDataSource(response?.data);
    }
  };

  // See the details of each dorm which are in the table
  const roomClickHandler = (id: number) => {
    if (!id) {
      toast.warning(ROOM_HAS_NO_KEY, { toastId: ROOM_HAS_NO_KEY });
    }
    navigate({
      pathname: DORM_DETAIL_PAGE_ROUTE,
      search: makeSearchParams({ id }),
    });
  };
  const onCreateNewDormClickHandler = () => {
    return navigate({ pathname: DORM_CREATE_PAGE_ROUTE });
  };

  const roomEditClickHandler = (id: number) => {
    if (!id) {
      toast.warning(ROOM_HAS_NO_KEY, { toastId: ROOM_HAS_NO_KEY });
    }
    navigate({
      pathname: DORM_CREATE_PAGE_ROUTE,
      search: makeSearchParams({ id, mode: EDIT }),
    });
  };

  const listFactorClickHandler = (id: number, name: string) => {
    navigate({
      pathname: DORM_FACTOR_PAGE_ROUTE,
      search: makeSearchParams({ id, name }),
    });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div>
      <CreateDormModal
        setCreateModalData={setCreateModalData}
        createModalData={createModalData}
      />
      <CustomButton
        className="add-dorm-btn"
        onClick={onCreateNewDormClickHandler}
        type="primary"
        ghost
      >
        ایجاد خوابگاه جدید
        <AiOutlinePlus className="add-dorm-btn-icon" />
      </CustomButton>
      <CustomTable<RoomListRecords>
        dataSource={dataSource}
        columns={RoomListModel({
          roomClickHandler: roomClickHandler,
          roomEditClickHandler: roomEditClickHandler,
          listFactorClickHandler: listFactorClickHandler,
        })}
        pagination={paginationConfig}
        loading={isListOfDormLoading}
        className="dorm-table-container"
        {...TABLE_PROPS(dataSource?.length)}
        draggableColumns
        draggableId={ExcelCodes.ROOM_DORM_TABLE}
      />
    </div>
  );
};

export default Dorm;
