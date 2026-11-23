import { Row } from "antd";

import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { dateTimeCombiner } from "@pages/Dorm/_shared/utils/DormUtils";
import { GetResidenceRoomInfoResponse } from "@pages/Dorm/Residence/DormsMainDetail/DormsDetail/_shared/component/SingleCards/DormRoomSingleCard/helper/drawers/RoomDetail/@types/@roomDetailDrawerContent";

const RoomSection = ({
  roomData,
}: {
  roomData: GetResidenceRoomInfoResponse | undefined;
}) => {
  return (
    <Row gutter={[16, 16]}>
      <SingleVerticalWithCol
        xl={8}
        lg={8}
        label="نام اقامتگاه"
        value={
          roomData?.data?.AssociationFloor?.AssociationBuilding
            ?.AssociationCategoryDormitory?.title
        }
      />
      <SingleVerticalWithCol
        xl={8}
        lg={8}
        label="نام ساختمان"
        value={roomData?.data?.AssociationFloor?.AssociationBuilding?.title}
      />
      <SingleVerticalWithCol
        xl={8}
        lg={8}
        label="نام طبقه"
        value={roomData?.data?.AssociationFloor?.title}
      />
      <SingleVerticalWithCol
        xl={8}
        lg={8}
        label="نام اتاق"
        value={roomData?.data?.title}
      />
      <SingleVerticalWithCol
        xl={8}
        lg={8}
        label="درجه کیفی"
        value={roomData?.data?.AssociationQuality?.title}
      />
      <SingleVerticalWithCol
        xl={8}
        lg={8}
        label="جنسیت"
        value={
          roomData?.data?.AssociationFloor?.AssociationBuilding?.AssociationGender?.title
        }
      />
      <SingleVerticalWithCol
        xl={8}
        lg={8}
        label="مساحت(متر مربع)"
        value={roomData?.data?.area?.toString()}
      />
      <SingleVerticalWithCol
        xl={8}
        lg={8}
        label="تعداد استاندارد تخت در اتاق"
        value={roomData?.data?.numberStandardBedInRoom?.toString()}
      />
      <SingleVerticalWithCol
        xl={8}
        lg={8}
        label="شناسه اتاق"
        value={roomData?.data?.id?.toString()}
      />
      <SingleVerticalWithCol
        xl={8}
        lg={8}
        label="نوع اتاق"
        value={roomData?.data?.AssociationRoomType?.title}
      />
      <SingleVerticalWithCol
        xl={8}
        lg={8}
        label="اتاق والد"
        value={roomData?.data?.AssociationRoom?.title}
      />
      <SingleVerticalWithCol
        span={24}
        label="توضیحات اتاق"
        value={roomData?.data?.description}
      />
      <SingleVerticalWithCol
        xl={8}
        lg={8}
        label="زمان ثبت"
        value={dateTimeCombiner(roomData?.data?.createDate, roomData?.data?.createTime)}
      />
      <SingleVerticalWithCol
        xl={8}
        lg={8}
        label="زمان آخرین ویرایش"
        value={dateTimeCombiner(roomData?.data?.updateDate, roomData?.data?.updateTime)}
      />
      <SingleVerticalWithCol
        xl={8}
        lg={8}
        label="آخرین ویرایش‌ کننده"
        value={`${roomData?.data?.AssociationEditUserStaffNew?.AssociationCustomerUser?.firstName ?? "-"} ${roomData?.data?.AssociationEditUserStaffNew?.AssociationCustomerUser?.lastName ?? ""}`}
      />
    </Row>
  );
};
export default RoomSection;
