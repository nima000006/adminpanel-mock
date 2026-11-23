import { Row } from "antd";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";

import "./_usersRequestsRoomDetailDrawerContent.scss";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";

import { UsersRequestsRoomDetailDrawerContentProps } from "./@types/@usersRequestsRoomDetail";
import { getGenderLabel } from "../../utils/UsersRequestsDetail";
import UsersRequestsRoomDetailResidentsTableModel from "./helper/models/UsersRequestsRoomDetailResidents/UsersRequestsRoomDetailResidentsTableModel";

const dataSource = [
  {
    name: "مجید",
    family: "حسینی سیانکی",
    gender: 0,
    userGroup: 2,
    studentCode: "44444467889090",
    nationalCode: "66789879544",
    uni: "تهران شمال",
    degree: "کارشناسی",
    field: "مهندسی کامپیوتر",
    entranceYear: "1402",
    term: "1",
    admission: "برنامه پذیرش نیمسال تحصیلی تابستان 1403",
    schedulingId: 2,
    settlementStartDate: "2024-09-22T08:00:41.977Z",
    settlementEndDate: "2025-09-22T08:00:41.977Z",
    id: 1,
  },
  {
    name: "shadi",
    family: "حسینی سیانکی",
    gender: 1,
    userGroup: 1,
    studentCode: "44444467889090",
    nationalCode: "66789879544",
    uni: "تهران شمال",
    degree: "کارشناسی",
    field: "مهندسی کامپیوتر",
    entranceYear: "1402",
    term: "1",
    admission: "برنامه پذیرش نیمسال تحصیلی تابستان 1403",
    schedulingId: 1,
    settlementStartDate: "2024-09-22T08:00:41.977Z",
    settlementEndDate: "2025-09-22T08:00:41.977Z",
    id: 3,
  },
];

const data = {
  residenceName: "خوابگاه شهید چمران",
  buildingName: "ساختمان شماره یک",
  floorName: "طبقه اول",
  roomName: "اتاق 314",
  quality: "درجه یک",
  gender: 1,
  area: 50,
  bedsCountInRoom: "4",
  roomId: 45645454,
  roomType: "مستقل",
  parentRoom: "",
  description: "خوابگاه شهید چمران متعلق به دانشگاه آزاد اسلامی واحد تهران شمال می‌باشد.",
  registerDate: "2024-09-11T08:00:41.977Z",
  lastModifiedDate: "2024-09-11T08:00:41.977Z",
  lastModifier: "مهندس سیانکی",
  id: 2,
};

const UsersRequestsRoomDetailDrawerContent = ({
  closeDrawerHandler,
}: UsersRequestsRoomDetailDrawerContentProps) => {
  return (
    <div>
      <CustomDrawerHeader
        title="جزئیات اتاق"
        closeDrawerHandler={closeDrawerHandler}
        leftSideContent={<CustomTag color="green">فعال قابل نمایش</CustomTag>}
      />
      <div className="users-requests-room-detail-drawer-container">
        <div className="room-residents">
          <CustomDivider text="ساکنین اتاق" />
          <CustomTable
            dataSource={dataSource}
            columns={UsersRequestsRoomDetailResidentsTableModel()}
            pagination={paginationConfig}
            rowKey="id"
            //   loading={isRestaurantFoodScheduleListLoading}
            className="users-requests-detail-room-residents-table-model-container"
            {...TABLE_PROPS(dataSource?.length)}
          />
        </div>
        <div className="dorm">
          <CustomDivider text="اتاق" />
          <Row gutter={[16, 16]}>
            <SingleVerticalWithCol
              xl={8}
              lg={8}
              label="نام اقامتگاه"
              value={data?.residenceName}
            />
            <SingleVerticalWithCol
              xl={8}
              lg={8}
              label="نام ساختمان"
              value={data?.buildingName}
            />
            <SingleVerticalWithCol
              xl={8}
              lg={8}
              label="نام طبقه"
              value={data?.floorName}
            />
            <SingleVerticalWithCol
              xl={8}
              lg={8}
              label="نام اتاق"
              value={data?.roomName}
            />
            <SingleVerticalWithCol
              xl={8}
              lg={8}
              label="درجه کیفی"
              value={data?.quality}
            />
            <SingleVerticalWithCol
              xl={8}
              lg={8}
              label="جنسیت"
              value={getGenderLabel(data?.gender)}
            />
            <SingleVerticalWithCol
              xl={8}
              lg={8}
              label="مساحت (متر مربع)"
              value={data?.area?.toString()}
            />
            <SingleVerticalWithCol
              xl={8}
              lg={8}
              label="تعداد استاندارد تخت در اتاق"
              value={data?.bedsCountInRoom?.toString()}
            />
            <SingleVerticalWithCol
              xl={8}
              lg={8}
              label="شناسه اتاق"
              value={data?.roomId?.toString()}
            />
            <SingleVerticalWithCol
              xl={8}
              lg={8}
              label="نوع اتاق"
              value={data?.roomType}
            />
            <SingleVerticalWithCol
              xl={8}
              lg={8}
              label="اتاق والد"
              value={data?.parentRoom}
            />
            <SingleVerticalWithCol
              span={24}
              label="توضیحات اتاق"
              value={data?.description}
            />
          </Row>
        </div>
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            label="زمان ثبت"
            value={data?.registerDate}
            isDate
            customDateFormat="YYYY/MM/HH , HH:mm"
          />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            label="زمان آخرین ویرایش"
            value={data?.lastModifiedDate}
            isDate
            customDateFormat="YYYY/MM/HH , HH:mm"
          />
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            label="آخرین ویرایش‌کننده"
            value={data?.lastModifier}
          />
        </Row>
      </div>
    </div>
  );
};

export default UsersRequestsRoomDetailDrawerContent;
