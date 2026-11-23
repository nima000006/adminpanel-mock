import { useEffect, useState } from "react";

import { Form } from "antd";
import { AiOutlineArrowLeft, AiOutlineClose } from "react-icons/ai";
import { PiPencilLine } from "react-icons/pi";
import { Link, useNavigate } from "react-router";

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
  DORMITORY_MY_ACTIVE_RESIDENCE_ALL_BED_LIST_PAGE_ROUTE,
  DORMITORY_MY_ACTIVE_RESIDENCE_MORE_DETAIL_PAGE_ROUTE,
  DORMITORY_MY_RESIDENCE_LIST_PAGE_ROUTE,
} from "@infra/router/routes/dormitory";
import { useGeMyActiveResidenceDetailBannerQuery } from "@infra/states/redux/Apis/dormitory/residence/residenceApi";
import { MyActiveResidenceDropDownsFormType } from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/@types/@myActiveResidenceDetailTypes";
import MyActiveResidenceBedList from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/components/MyActiveResidenceBedList/MyActiveResidenceBedList";
import MyActiveResidenceBuildingList from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/components/MyActiveResidenceBuildingList/MyActiveResidenceBuildingList";
import MyActiveResidenceFloorList from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/components/MyActiveResidenceFloorList/MyActiveResidenceFloorList";
import MyActiveResidenceUnitList from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/components/MyActiveResidenceUnitList/MyActiveResidenceUnitList";
import MyCountsDetailCard from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/components/MyCountsDetailCard/MyCountsDetailCard";
import MyPreparationStepsResidenceDrawerContent from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/drawer/MyPreparationStepsResidenceDrawerContent/MyPreparationStepsResidenceDrawerContent";
import { RESIDENCE_ACTIVE_DETAIL_TABS_TYPE } from "@pages/Dormitory/Residence/MyActiveResidence/MyActiveResidenceDetail/helper/MyUtil";

const MyActiveResidenceDetail = () => {
  const { params: url, setSearchParams } = useQueryParams();
  const [isviewPreparationStepsDrawerOpen, setIsviewPreparationStepsDrawerOpen] =
    useState(false);

  const [form] = Form.useForm<MyActiveResidenceDropDownsFormType>();

  const navigate = useNavigate();

  useTitle({
    breadcrumbItems: [
      {
        title: "اقامتگاه‌ها",
      },
      {
        title: <Link to={DORMITORY_MY_RESIDENCE_LIST_PAGE_ROUTE}>اقامتگاه‌های من</Link>,
      },
      { title: "مشاهده" },
    ],
  });

  //? ================================  Api Calls ================================
  // banner
  const {
    data: myActiveResidenceDetailBanner,
    isLoading: isMyActiveResidenceDetailBannerLoading,
  } = useGeMyActiveResidenceDetailBannerQuery(url?.residenceId, {
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
      pathname: DORMITORY_MY_ACTIVE_RESIDENCE_ALL_BED_LIST_PAGE_ROUTE,
      search: makeSearchParams({
        residenceId: url?.residenceId,
        viewStatus: url?.viewStatus,
        residenceTitle: url?.residenceTitle,
      }),
    });
  };

  const moreDetailHandler = () => {
    navigate({
      pathname: DORMITORY_MY_ACTIVE_RESIDENCE_MORE_DETAIL_PAGE_ROUTE,
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
            <MyPreparationStepsResidenceDrawerContent
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
            loading={isMyActiveResidenceDetailBannerLoading}
          >
            <MyCountsDetailCard
              title="ظرفیت اسمی"
              value={myActiveResidenceDetailBanner?.nominalCapacity?.toString() ?? "-"}
            />
            <MyCountsDetailCard
              title="ساختمان"
              value={myActiveResidenceDetailBanner?.buildingCount?.toString() ?? "-"}
            />
            <MyCountsDetailCard
              title="طبقه"
              value={myActiveResidenceDetailBanner?.floorCount?.toString() ?? "-"}
            />
            <MyCountsDetailCard
              title="واحد اقامتی"
              value={myActiveResidenceDetailBanner?.roomCount?.toString() ?? "-"}
            />
            <MyCountsDetailCard
              isClickable={true}
              value={myActiveResidenceDetailBanner?.bedCount?.toString() ?? "-"}
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
              <MyActiveResidenceBuildingList />
            ) : url?.status === RESIDENCE_ACTIVE_DETAIL_TABS_TYPE.floor ? (
              <MyActiveResidenceFloorList form={form} />
            ) : url?.status === RESIDENCE_ACTIVE_DETAIL_TABS_TYPE.unit ? (
              <MyActiveResidenceUnitList form={form} />
            ) : url?.status === RESIDENCE_ACTIVE_DETAIL_TABS_TYPE.bed ? (
              <MyActiveResidenceBedList form={form} />
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};
export default MyActiveResidenceDetail;
