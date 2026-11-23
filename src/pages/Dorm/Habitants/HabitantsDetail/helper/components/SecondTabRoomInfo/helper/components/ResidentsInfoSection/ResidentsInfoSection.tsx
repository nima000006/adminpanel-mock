import { useEffect, useState } from "react";

import { Row } from "antd";
import { AiOutlineClose } from "react-icons/ai";
import { FaCaretLeft } from "react-icons/fa";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import Div from "@components/Renderers/Div/Div";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import useQueryParams from "@infra/hooks/useQueryParams";
import { useLazyGetHabitantResidenceInfoQuery } from "@infra/states/redux/Apis/dorm/habitants/dormHabitantsApi";

import { HabitantResidenceInfoData } from "./@types/@residentsInfoSection";
import ExtraContentResidentsInfoDrawerContent from "../../drawer/ExtraContentResidentsInfoDrawerContent/ExtraContentResidentsInfoDrawerContent";

const ResidentsInfoSection = () => {
  const [isExtraDetailDrawerOpen, setIsExtraDetailDrawerOpen] = useState(false);
  const {
    params: { id },
  } = useQueryParams();

  //? ================================  Api Calls ================================
  const [
    getResidenceInfo,
    { data: residenceInfoData, isFetching: isResidenceInfoLoading },
  ] = useLazyGetHabitantResidenceInfoQuery();

  //? ================================ Effects ================================
  useEffect(() => {
    if (id) {
      getResidenceInfo({ maxResults: 2000, firstResult: 0, id_EQ: +id });
    }
  }, [id]);

  //* ================================ Util Functions ================================
  // destruct data
  const residenceInfo: Partial<HabitantResidenceInfoData> =
    residenceInfoData?.data[0] || {};

  const {
    AssociationBed_roomId,
    AssociationBed_AssociationCategoryBuliding_title,
    AssociationBed_AssociationCategoryFloor_title,
    AssociationBed_AssociationCategorRoom_title,
    AssociationBed_AssociationCategorRoom_AssociationGender_title,
    AssociationBed_AssociationCategorRoom_numberStandardBedInRoom,
    CountActiveBeds,
    CountOpenBeds,
    AssociationBed_title,
    AssociationBed_AssociationCategoryDormitory_title,
  } = residenceInfo;

  // handler
  const extraDetailHandler = () => {
    setIsExtraDetailDrawerOpen(true);
  };

  const closeDrawerHandler = () => {
    setIsExtraDetailDrawerOpen(false);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    //  EXTRA DETAIL DRAWER IN RESIDENTS INFO
    <>
      {isExtraDetailDrawerOpen && (
        <CustomDrawer
          onClose={closeDrawerHandler}
          open={isExtraDetailDrawerOpen}
          className="all-contracts-detail-page-drawer"
          closeIcon={<AiOutlineClose />}
          content={
            <ExtraContentResidentsInfoDrawerContent
              closeDrawerHandler={closeDrawerHandler}
              id={AssociationBed_roomId}
            />
          }
        />
      )}

      <div>
        <CustomDivider
          text="مشخصات اتاق"
          extraContent={
            <CustomButton
              className="text-primary-6! border-0! shadow-none!"
              onClick={extraDetailHandler}
            >
              جزئیات بیشتر
              <FaCaretLeft />
            </CustomButton>
          }
        />
        <Div loading={isResidenceInfoLoading}>
          <Row gutter={[16, 16]}>
            <SingleVerticalWithCol
              md={12}
              sm={24}
              label="نام اقامتگاه"
              value={AssociationBed_AssociationCategoryDormitory_title}
            />
            <SingleVerticalWithCol
              md={12}
              sm={24}
              label="نام ساختمان"
              value={AssociationBed_AssociationCategoryBuliding_title}
            />
            <SingleVerticalWithCol
              md={12}
              sm={24}
              label="نام طبقه"
              value={AssociationBed_AssociationCategoryFloor_title}
            />
            <SingleVerticalWithCol
              md={12}
              sm={24}
              label=" نام اتاق"
              value={AssociationBed_AssociationCategorRoom_title}
            />
            <SingleVerticalWithCol
              md={12}
              sm={24}
              label="تخت"
              value={AssociationBed_title}
            />
            <SingleVerticalWithCol
              md={12}
              sm={24}
              label="جنسیت"
              value={AssociationBed_AssociationCategorRoom_AssociationGender_title}
            />
            <SingleVerticalWithCol
              md={12}
              sm={24}
              label="تعداد استاندارد تخت در اتاق"
              value={AssociationBed_AssociationCategorRoom_numberStandardBedInRoom?.toString()}
            />
            <SingleVerticalWithCol
              md={12}
              sm={24}
              label="تخت‌های فعال"
              value={CountActiveBeds?.toString()}
            />
            <SingleVerticalWithCol
              md={12}
              sm={24}
              label="ظرفیت قابل رزرو"
              value={CountOpenBeds?.toString()}
            />
          </Row>
        </Div>
      </div>
    </>
  );
};

export default ResidentsInfoSection;
