import { useState } from "react";

import { AiOutlineClose, AiOutlineEdit } from "react-icons/ai";
import { FaCaretLeft } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { makeSearchParams } from "@infra/helpers/utils";
import { DORM_MODIFY_RESIDENCE_PAGE_ROUTE } from "@infra/router/routes/dorm";
import { dormVisibilityStatusColor } from "@pages/Dorm/_shared/utils/DormUtils";

import ResidenceDetailDrawerContent from "./helper/drawers/ResidenceDetailDrawerContent/ResidenceDetailDrawerContent";
import "./_dividerExtraContent.scss";

const DividerExtraContent = () => {
  const [moreDetail, setMoreDetail] = useState(false);

  const [searchParams] = useSearchParams();
  const { statusTitle, statusId, id, title } = Object.fromEntries([...searchParams]);

  const navigate = useNavigate();

  //* ================================ Util Functions ================================
  const openMoreDetailHandler = () => setMoreDetail(true);
  const closeMoreDetailHandler = () => setMoreDetail(false);

  const editResidenceHandler = () => {
    navigate({
      pathname: DORM_MODIFY_RESIDENCE_PAGE_ROUTE,
      search: makeSearchParams({ id, title }),
    });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {moreDetail && (
        <CustomDrawer
          title="جزئیات اقامتگاه"
          open={moreDetail}
          onClose={closeMoreDetailHandler}
          closeIcon={<AiOutlineClose />}
          className="residence-detail-drawer"
          content={
            <ResidenceDetailDrawerContent onCloseDrawer={closeMoreDetailHandler} />
          }
        />
      )}

      <div className="dorm-divider-extra-content-wrapper">
        {statusId && (
          <CustomTag
            className="divider-tag"
            color={statusId && dormVisibilityStatusColor[+statusId]}
          >
            {statusTitle}
          </CustomTag>
        )}

        <CustomButton
          type="default"
          icon={<AiOutlineEdit />}
          onClick={editResidenceHandler}
        >
          ویرایش
        </CustomButton>
        <CustomButton
          type="link"
          onClick={openMoreDetailHandler}
          icon={<FaCaretLeft />}
          iconPlacement="end"
        >
          جزئیات بیشتر
        </CustomButton>
      </div>
    </>
  );
};
export default DividerExtraContent;
