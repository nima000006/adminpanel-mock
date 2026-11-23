import { useState } from "react";

import { AiOutlineArrowLeft } from "react-icons/ai";
import { AiOutlineEdit, AiOutlineEye, AiOutlineClose } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import { makeSearchParams } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  DORM_MODIFY_BED_PAGE_ROUTE,
  DORM_MODIFY_ROOM_PAGE_ROUTE,
} from "@infra/router/routes/dorm";
import { CARD_TYPE } from "@pages/Dorm/Residence/DormsMainDetail/DormsDetail/_shared/utils/DormMainDetailUtils";

import { DormRoomSingleCardActionsProps } from "./@types/@dormRoomSingleCardActions";
import RoomDetailDrawerContent from "../../drawers/RoomDetail/RoomDetailDrawerContent";

const DormRoomSingleCardActions = ({
  numberOfBeds = -1, // possibly undefined
  id,
  roomTitle,
}: DormRoomSingleCardActionsProps) => {
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
    setDetailDrawer({ id: -1, isOpen: false });
  };

  const viewCreateBedHandler = () => {
    if (numberOfBeds > 0) {
      setSearchParams({
        ...url,
        mode: CARD_TYPE?.bed,
        roomTitle,
        roomId: id?.toString(),
      });
    } else {
      navigate({
        pathname: DORM_MODIFY_BED_PAGE_ROUTE,
        search: makeSearchParams({ ...url, roomTitle, roomId: id?.toString() }),
      });
    }
  };

  const updateRoomHandler = () => {
    navigate({
      pathname: DORM_MODIFY_ROOM_PAGE_ROUTE,
      search: makeSearchParams({
        ...url,
        roomId: id?.toString(),
      }),
    });
  };

  return (
    <>
      {/* ROOM DETAIL DRAWER */}
      {detailDrawer?.isOpen && (
        <CustomDrawer
          onClose={closeDetailDrawerHandler}
          open={detailDrawer?.isOpen}
          className="dorm-residence-room-detail-drawer"
          closeIcon={<AiOutlineClose />}
          content={
            <RoomDetailDrawerContent
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
          onClick={updateRoomHandler}
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
          icon={numberOfBeds > 0 ? <AiOutlineEye /> : <AiOutlinePlus />}
          iconPlacement="end"
          onClick={viewCreateBedHandler}
        >
          {numberOfBeds > 0 ? "مشاهده تخت ها" : "ایجاد تخت"}
        </CustomButton>
      </div>
    </>
  );
};

export default DormRoomSingleCardActions;
