import { useState } from "react";

import { AiOutlineArrowLeft } from "react-icons/ai";
import { AiOutlineClose, AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import { makeSearchParams } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  DORM_MODIFY_FLOOR_PAGE_ROUTE,
  DORM_MODIFY_ROOM_PAGE_ROUTE,
} from "@infra/router/routes/dorm";
import { CARD_TYPE } from "@pages/Dorm/Residence/DormsMainDetail/DormsDetail/_shared/utils/DormMainDetailUtils";

import { DormFloorSingleCardActionsProps } from "./@types/@dormFloorSingleCardActions";
import FloorDetailDrawerContent from "../../drawers/FloorDetail/FloorDetailDrawerContent";

const DormFloorSingleCardActions = ({
  numberOfRooms = -1, // possibly undefined
  id,
  floorTitle,
}: DormFloorSingleCardActionsProps) => {
  const [detailDrawer, setDetailDrawer] = useState({
    id: -1,
    isOpen: false,
  });

  const { params: url, setSearchParams } = useQueryParams();

  const navigate = useNavigate();

  //* ================================ Util Functions ================================
  const openDetailDrawerHandler = () => {
    setDetailDrawer({ id, isOpen: true });
  };
  const closeDetailDrawerHandler = () => {
    setDetailDrawer({ id, isOpen: false });
  };

  const viewCreateRoomHandler = () => {
    if (numberOfRooms > 0) {
      setSearchParams({
        ...url,
        mode: CARD_TYPE.room,
        floorTitle,
        floorId: id?.toString(),
      });
    } else {
      navigate({
        pathname: DORM_MODIFY_ROOM_PAGE_ROUTE,
        search: makeSearchParams({ ...url, floorTitle, floorId: id?.toString() }),
      });
    }
  };

  const updateFloorHandler = () => {
    navigate({
      pathname: DORM_MODIFY_FLOOR_PAGE_ROUTE,
      search: makeSearchParams({
        ...url,
        floorId: id?.toString(),
      }),
    });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <>
      {/* FLOOR DETAIL DRAWER */}
      {detailDrawer?.isOpen && (
        <CustomDrawer
          onClose={closeDetailDrawerHandler}
          open={detailDrawer?.isOpen}
          className="dorm-residence-floor-detail-drawer"
          closeIcon={<AiOutlineClose />}
          content={
            <FloorDetailDrawerContent
              closeDrawerHandler={closeDetailDrawerHandler}
              id={detailDrawer?.id}
            />
          }
        />
      )}

      <div className="dorm-single-card-actions-container">
        <CustomButton
          color="default"
          variant="dashed"
          icon={<AiOutlineEdit />}
          iconPlacement="end"
          onClick={updateFloorHandler}
        >
          ویرایش
        </CustomButton>
        <CustomButton
          color="default"
          variant="dashed"
          icon={<AiOutlineArrowLeft />}
          iconPlacement="end"
          onClick={openDetailDrawerHandler}
        >
          جزئیات بیشتر
        </CustomButton>
        <CustomButton
          type="text"
          className="view-btn"
          icon={numberOfRooms > 0 ? <AiOutlineEye /> : <AiOutlinePlus />}
          iconPlacement="end"
          onClick={viewCreateRoomHandler}
        >
          {numberOfRooms > 0 ? "مشاهده اتاق ها" : "ایجاد اتاق"}
        </CustomButton>
      </div>
    </>
  );
};

export default DormFloorSingleCardActions;
