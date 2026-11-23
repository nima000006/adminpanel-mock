import { useState } from "react";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomSegmented from "@components/Renderers/CustomSegmented/CustomSegmented";
import Div from "@components/Renderers/Div/Div";
import { useResponsive } from "@infra/hooks/useResponsive";
import useTicketingDetail from "@pages/Ticketing/_shared/pages/TicketingDetail/_shared/hooks/useTicketingDetail";

import { TicketingInfoDrawerContentProps } from "./@types/@ticketingInfoDrawerContentTypes";
import LastAdminInfoSegmentContent from "./helper/components/LastAdminInfoSegmentContent/LastAdminInfoSegmentContent";
import TicketInfoSegmentContent from "./helper/components/TicketInfoSegmentContent/TicketInfoSegmentContent";
import UserInfoSegmentContent from "./helper/components/UserInfoSegmentContent/UserInfoSegmentContent";

const TicketingInfoDrawerContent = ({
  closeDrawerHandler,
  variant,
  sectionRoute,
}: TicketingInfoDrawerContentProps) => {
  const { isMobile } = useResponsive();
  const [view, setView] = useState("0");

  // REQUESTS
  const {
    detailInfo,
    detailInfoData,
    isDetailInfoLoading,
    detailUserInfo,
    detailUserInfoData,
    isDetailUserInfoLoading,
    isDetailExpertInfoLoading,
    detailExpertInfoData,
    detailExpertInfo,
  } = useTicketingDetail(variant);

  const optionType = [
    {
      value: "0",
      label: "اطلاعات تیکت",
      children: (
        <TicketInfoSegmentContent
          variant={variant}
          sectionRoute={sectionRoute}
          onDetailInfo={detailInfo}
          detailInfoData={detailInfoData}
          isDetailInfoLoading={isDetailInfoLoading}
          closeDrawerHandler={closeDrawerHandler}
        />
      ),
    },
    {
      value: "1",
      label: "اطلاعات کاربر",
      children: (
        <UserInfoSegmentContent
          onDetailUserInfo={detailUserInfo}
          detailUserInfoData={detailUserInfoData}
          isDetailUserInfoLoading={isDetailUserInfoLoading}
        />
      ),
    },
    {
      value: "2",
      label: "کارشناسان پیشین",
      children: (
        <LastAdminInfoSegmentContent
          onDetailExpertInfo={detailExpertInfo}
          detailExpertInfoData={detailExpertInfoData}
          isDetailExpertInfoLoading={isDetailExpertInfoLoading}
        />
      ),
    },
  ];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <Div>
      <CustomDrawerHeader
        title="اطلاعات"
        leftSideContent={<CustomButton onClick={closeDrawerHandler}>بستن</CustomButton>}
        closeDrawerHandler={closeDrawerHandler}
      />

      <div>
        <CustomSegmented
          options={optionType}
          onChange={(value) => setView(value as "0" | "1" | "2")}
          vertical={isMobile}
          value={view}
          size="large"
          block
          className="mb-10!"
        />
        <div>{optionType[+view]?.children}</div>
      </div>
    </Div>
  );
};
export default TicketingInfoDrawerContent;
