import { useEffect, useState } from "react";

import { Form } from "antd";
import { AiOutlineArrowLeft, AiOutlineClose } from "react-icons/ai";
import { PiPencilLine } from "react-icons/pi";
import { useNavigate } from "react-router";

import BedIcon from "@assets/icons/Dorm/BedIcon";
import BuildingIcon from "@assets/icons/Dorm/BuildingIcon";
import FloorIcon from "@assets/icons/Dorm/FloorIcon";
import RoomIcon from "@assets/icons/Dorm/RoomIcon";
import { CustomButton } from "@components/CustomInputs";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import Div from "@components/Renderers/Div/Div";
import IconTab from "@components/Renderers/IconTab/IconTab";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import { makeSearchParams } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  DORMITORY_ACTIVE_RESIDENCE_ALL_BED_LIST_PAGE_ROUTE,
  DORMITORY_ACTIVE_RESIDENCE_MORE_DETAIL_PAGE_ROUTE,
} from "@infra/router/routes/dormitory";
import { useGeActiveResidenceDetailBannerQuery } from "@infra/states/redux/Apis/dormitory/residence/residenceApi";
import { ActiveResidenceDropDownsFormType } from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/@types/@activeResidenceDetailTypes";
import ActiveResidenceBedList from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceBedList/ActiveResidenceBedList";
import ActiveResidenceBuildingList from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceBuildingList/ActiveResidenceBuildingList";
import ActiveResidenceFloorList from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceFloorList/ActiveResidenceFloorList";
import ActiveResidenceUnitList from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceUnitList/ActiveResidenceUnitList";
import CountsDetailCard from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/CountsDetailCard/CountsDetailCard";
import PreparationStepsResidenceDrawerContent from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/drawer/PreparationStepsResidenceDrawerContent/PreparationStepsResidenceDrawerContent";
import { RESIDENCE_ACTIVE_DETAIL_TABS_TYPE } from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/util";

const ActiveResidenceDetail = () => {
  const { params: url, setSearchParams } = useQueryParams();
  const [isviewPreparationStepsDrawerOpen, setIsviewPreparationStepsDrawerOpen] =
    useState(false);

  const [form] = Form.useForm<ActiveResidenceDropDownsFormType>();

  const navigate = useNavigate();

  useTitle({
    breadcrumbItems: [
      {
        title: "اقامتگاه‌ها",
      },
      { title: url?.type === "myResidence" ? "اقامتگاه های من" : "همه اقامتگاه ها" },
      { title: "مشاهده" },
    ],
  });

  //? ================================  Api Calls ================================
  // banner
  const {
    data: activeResidenceDetailBanner,
    isLoading: isActiveResidenceDetailBannerLoading,
  } = useGeActiveResidenceDetailBannerQuery(url?.residenceId, {
    skip: !url?.residenceId,
  });

  //? ================================ Effects ================================
  useEffect(() => {
    if (!url?.status) {
      setSearchParams({ ...url, status: RESIDENCE_ACTIVE_DETAIL_TABS_TYPE.building });
    }
  }, []);

  //* ================================ Util Functions ================================
  const changeCardHandler = (status: string) => {
    const tabsWithDropDowns = [
      RESIDENCE_ACTIVE_DETAIL_TABS_TYPE.floor,
      RESIDENCE_ACTIVE_DETAIL_TABS_TYPE.unit,
      RESIDENCE_ACTIVE_DETAIL_TABS_TYPE.bed,
    ];

    const shouldResetDropDowns =
      status !== url?.status &&
      (tabsWithDropDowns.includes(url?.status) || tabsWithDropDowns.includes(status));

    if (shouldResetDropDowns) {
      form.resetFields();
    }

    const { sortings, page, ...restUrl } = url ?? {};
    setSearchParams({ ...restUrl, status });
  };

  const viewPreparationSteps = () => {
    setIsviewPreparationStepsDrawerOpen(true);
  };
  const closePreparationStepsDrawerHandler = () => {
    setIsviewPreparationStepsDrawerOpen(false);
  };

  const allBedListHandler = () => {
    navigate({
      pathname: DORMITORY_ACTIVE_RESIDENCE_ALL_BED_LIST_PAGE_ROUTE,
      search: makeSearchParams({
        residenceId: url?.residenceId,
        viewStatus: url?.viewStatus,
        residenceTitle: url?.residenceTitle,
      }),
    });
  };

  const moreDetailHandler = () => {
    navigate({
      pathname: DORMITORY_ACTIVE_RESIDENCE_MORE_DETAIL_PAGE_ROUTE,
      search: makeSearchParams({
        residenceId: url?.residenceId,
        residenceTitle: url?.residenceTitle,
        viewStatus: url?.viewStatus,
      }),
    });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {/* PREPARATION STEP RESIDENCE DRAWER */}
      {isviewPreparationStepsDrawerOpen && (
        <CustomDrawer
          onClose={closePreparationStepsDrawerHandler}
          open={isviewPreparationStepsDrawerOpen}
          closeIcon={<AiOutlineClose />}
          content={
            <PreparationStepsResidenceDrawerContent
              closeDrawerHandler={closePreparationStepsDrawerHandler}
            />
          }
        />
      )}

      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <ToolBox
            rightSide={
              <div className="flex flex-wrap gap-2">
                <span className="text-neutral-13 font-bold!">{url?.residenceTitle}</span>
                <CustomTag
                  className="w-fit"
                  color={url?.viewStatus === "true" ? "green" : "orange"}
                >
                  {url?.viewStatus === "true" ? "قابل نمایش" : "غیر قابل نمایش"}
                </CustomTag>
              </div>
            }
            leftSide={
              <div className="flex gap-4">
                <CustomButton disabled type="dashed" icon={<PiPencilLine />}>
                  ویرایش
                </CustomButton>
                <CustomButton
                  color="default"
                  type="link"
                  icon={<AiOutlineArrowLeft />}
                  iconPlacement="end"
                  onClick={moreDetailHandler}
                >
                  جزئیات بیشتر
                </CustomButton>
              </div>
            }
          />
          <Div
            className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5"
            loading={isActiveResidenceDetailBannerLoading}
          >
            <CountsDetailCard
              title="ظرفیت اسمی"
              value={activeResidenceDetailBanner?.nominalCapacity?.toString() ?? "-"}
            />
            <CountsDetailCard
              title="ساختمان"
              value={activeResidenceDetailBanner?.buildingCount?.toString() ?? "-"}
            />
            <CountsDetailCard
              title="طبقه"
              value={activeResidenceDetailBanner?.floorCount?.toString() ?? "-"}
            />
            <CountsDetailCard
              title="واحد اقامتی"
              value={activeResidenceDetailBanner?.roomCount?.toString() ?? "-"}
            />
            <CountsDetailCard
              isClickable={true}
              value={activeResidenceDetailBanner?.bedCount?.toString() ?? "-"}
              clickHandler={allBedListHandler}
            />
          </Div>
        </div>

        <CustomAlert
          type="warning"
          showIcon
          description="اقامتگاه آماده انتشار در اپلیکیشن برای رزرو کاربران نیست!"
          action={
            <CustomButton color="blue" type="link" onClick={viewPreparationSteps}>
              مشاهده مراحل آماده سازی اقامتگاه
            </CustomButton>
          }
        />

        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <IconTab
              Icon={BuildingIcon}
              title="ساختمان"
              active={url?.status === RESIDENCE_ACTIVE_DETAIL_TABS_TYPE.building}
              clickHandler={() =>
                changeCardHandler(RESIDENCE_ACTIVE_DETAIL_TABS_TYPE.building)
              }
            />
            <IconTab
              Icon={FloorIcon}
              title="طبقه"
              active={url?.status === RESIDENCE_ACTIVE_DETAIL_TABS_TYPE.floor}
              clickHandler={() =>
                changeCardHandler(RESIDENCE_ACTIVE_DETAIL_TABS_TYPE.floor)
              }
            />
            <IconTab
              Icon={RoomIcon}
              title="واحد اقامتی"
              active={url?.status === RESIDENCE_ACTIVE_DETAIL_TABS_TYPE.unit}
              clickHandler={() =>
                changeCardHandler(RESIDENCE_ACTIVE_DETAIL_TABS_TYPE.unit)
              }
            />
            <IconTab
              Icon={BedIcon}
              title="تخت"
              active={url?.status === RESIDENCE_ACTIVE_DETAIL_TABS_TYPE.bed}
              clickHandler={() =>
                changeCardHandler(RESIDENCE_ACTIVE_DETAIL_TABS_TYPE.bed)
              }
            />
          </div>

          <div className="gap-4">
            {url?.status === RESIDENCE_ACTIVE_DETAIL_TABS_TYPE.building ? (
              <ActiveResidenceBuildingList />
            ) : url?.status === RESIDENCE_ACTIVE_DETAIL_TABS_TYPE.floor ? (
              <ActiveResidenceFloorList form={form} />
            ) : url?.status === RESIDENCE_ACTIVE_DETAIL_TABS_TYPE.unit ? (
              <ActiveResidenceUnitList form={form} />
            ) : url?.status === RESIDENCE_ACTIVE_DETAIL_TABS_TYPE.bed ? (
              <ActiveResidenceBedList form={form} />
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};
export default ActiveResidenceDetail;
