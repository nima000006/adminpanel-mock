import { useState } from "react";

import { Row } from "antd";
import { FaCaretLeft } from "react-icons/fa";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import UsersRequestsRoomDetailDrawerContent from "@pages/Dorm/Requests/UsersRequests/UsersRequestsDetail/_shared/drawers/UsersRequestsRoomDetail/UsersRequestsRoomDetailDrawerContent";

const RelocationResidenceInfo = ({ title }: { title: string }) => {
  const [viewDetailDrawer, setViewDetailDrawer] = useState({
    isOpen: false,
    id: -1,
  });

  //* ================================ Util Functions ================================
  const openMoreDetailDrawerHandler = () => {
    setViewDetailDrawer({
      isOpen: true,
      id: -1,
    });
  };
  const closeMoreDetailDrawerHandler = () => {
    setViewDetailDrawer({
      isOpen: false,
      id: -1,
    });
  };

  return (
    <>
      {/* VIEW DETAIL DRAWER */}
      {viewDetailDrawer?.isOpen && (
        <CustomDrawer
          onClose={closeMoreDetailDrawerHandler}
          open={viewDetailDrawer?.isOpen}
          content={
            <UsersRequestsRoomDetailDrawerContent
              closeDrawerHandler={closeMoreDetailDrawerHandler}
              id={viewDetailDrawer?.id}
            />
          }
        />
      )}

      <div>
        <CustomDivider
          text={title}
          extraContent={
            <CustomButton
              type="link"
              className="more-detail-btn"
              onClick={openMoreDetailDrawerHandler}
              icon={<FaCaretLeft />}
              iconPlacement="end"
            >
              جزئیات بیشتر
            </CustomButton>
          }
        />
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol label="نام اقامتگاه" value={"data?.dormName"} />
          <SingleVerticalWithCol label="نام ساختمان" value={"data?.buildingName"} />
          <SingleVerticalWithCol label="نام طبقه" value={"data?.floorName"} />
          <SingleVerticalWithCol label="نام اتاق" value={"data?.roomName"} />
          <SingleVerticalWithCol label="جنسیت" value={"data?.gender"} />
          <SingleVerticalWithCol
            label="تعداد استاندارد تخت در اتاق"
            value={"data?.bedsCountInRoom?.toString()"}
          />
          <SingleVerticalWithCol
            label="تخت‌های فعال"
            value={"data?.activeBeds?.toString()"}
          />
          <SingleVerticalWithCol
            label="ظرفیت قابل رزرو"
            value={"data?.capableReserveCapacity?.toString()"}
          />
        </Row>
      </div>
    </>
  );
};

export default RelocationResidenceInfo;
