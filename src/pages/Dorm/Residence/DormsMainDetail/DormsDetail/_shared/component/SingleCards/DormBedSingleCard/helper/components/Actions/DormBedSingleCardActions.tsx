import { useState } from "react";

import { AiOutlineArrowLeft, AiOutlineEdit } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import { makeSearchParams } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { DORM_MODIFY_BED_PAGE_ROUTE } from "@infra/router/routes/dorm";

import { DormBedSingleCardActionsProps } from "./@types/@dormBedSingleCardActions";
import BedDetailDrawerContent from "../../drawers/BedDetail/BedDetailDrawerContent";

const DormBedSingleCardActions = ({ id }: DormBedSingleCardActionsProps) => {
  const [detailDrawer, setDetailDrawer] = useState({
    id: -1,
    isOpen: false,
  });

  const { params: url } = useQueryParams();
  const navigate = useNavigate();

  //* ================================ Util Functions ================================
  const openDetailDrawerHandler = () => {
    setDetailDrawer({ id, isOpen: true });
  };
  const closeDetailDrawerHandler = () => {
    setDetailDrawer({ id: -1, isOpen: false });
  };

  const updateBedHandler = () => {
    navigate({
      pathname: DORM_MODIFY_BED_PAGE_ROUTE,
      search: makeSearchParams({
        ...url,
        bedId: id?.toString(),
      }),
    });
  };

  return (
    <>
      {/* BED DETAIL DRAWER */}
      {detailDrawer?.isOpen && (
        <CustomDrawer
          onClose={closeDetailDrawerHandler}
          open={detailDrawer?.isOpen}
          className="dorm-residence-bed-detail-drawer"
          closeIcon={<AiOutlineClose />}
          content={
            <BedDetailDrawerContent
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
          onClick={updateBedHandler}
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
      </div>
    </>
  );
};

export default DormBedSingleCardActions;
