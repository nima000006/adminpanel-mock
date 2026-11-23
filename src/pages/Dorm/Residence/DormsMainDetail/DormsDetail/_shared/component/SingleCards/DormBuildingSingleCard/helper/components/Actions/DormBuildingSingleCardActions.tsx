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
  DORM_MODIFY_Building_PAGE_ROUTE,
  DORM_MODIFY_FLOOR_PAGE_ROUTE,
} from "@infra/router/routes/dorm";
import { CARD_TYPE } from "@pages/Dorm/Residence/DormsMainDetail/DormsDetail/_shared/utils/DormMainDetailUtils";

import { DormBuildingSingleCardActionsProps } from "./@types/@dormBuildingSingleCardActions";
import BuildingDetailDrawerContent from "../../drawers/BuildingDetail/BuildingDetailDrawerContent";

const DormBuildingSingleCardActions = ({
  NumberOfFloors = -1, // possibly undefined
  id,
  buildingTitle,
  genderTitle,
  genderId,
}: DormBuildingSingleCardActionsProps) => {
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

  const viewCreateFloorHandler = () => {
    if (NumberOfFloors > 0) {
      setSearchParams({
        ...url,
        mode: CARD_TYPE.floor,
        buildingTitle,
        buildingId: id?.toString(),
        buildingGenderTitle: genderTitle,
        buildingGenderId: genderId?.toString(),
      });
    } else {
      navigate({
        pathname: DORM_MODIFY_FLOOR_PAGE_ROUTE,
        search: makeSearchParams({
          ...url,
          buildingTitle,
          buildingId: id?.toString(),
          buildingGenderTitle: genderTitle,
          buildingGenderId: genderId?.toString(),
        }),
      });
    }
  };

  const updateFloorHandler = () => {
    navigate({
      pathname: DORM_MODIFY_Building_PAGE_ROUTE,
      search: makeSearchParams({
        ...url,
        buildingId: id?.toString(),
      }),
    });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <>
      {/* BUILDING DETAIL DRAWER */}
      {detailDrawer?.isOpen && (
        <CustomDrawer
          onClose={closeDetailDrawerHandler}
          open={detailDrawer?.isOpen}
          className="dorm-residence-building-detail-drawer"
          closeIcon={<AiOutlineClose />}
          content={
            <BuildingDetailDrawerContent
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
          icon={NumberOfFloors > 0 ? <AiOutlineEye /> : <AiOutlinePlus />}
          iconPlacement="end"
          onClick={viewCreateFloorHandler}
        >
          {NumberOfFloors > 0 ? "مشاهده طبقات" : "ایجاد طبقه"}
        </CustomButton>
      </div>
    </>
  );
};

export default DormBuildingSingleCardActions;
