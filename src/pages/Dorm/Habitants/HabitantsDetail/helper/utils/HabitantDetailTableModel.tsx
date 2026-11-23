import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import CustomTagWithDiffDays from "@components/Renderers/CustomTagWithDiffDays/CustomTagWithDiffDays";
import SingleVerticalItem from "@components/Renderers/SingleVerticalItem/SingleVerticalItem";
import { dataPlaceHolder } from "@infra/helpers/utils";
import {
  dateTimeCombiner,
  dormRequestsTypeStatusColor,
  dormReservationTypeStatusColor,
  dormSchedulingStatusColor,
} from "@pages/Dorm/_shared/utils/DormUtils";
import { DormUserRecordsList } from "@pages/Dorm/Requests/UsersRequests/UsersRequestsDetail/_shared/components/UsersRequestsDetailUserHistory/@types/@usersRequestsDetailUserHistory";

export const habitantStartDate = {
  title: "تاریخ شروع",
  dataIndex: "startDate",
  key: "startDate",
  width: 130,
  render: (value: string) => {
    return <SingleVerticalItem value={value} isDate label="" />;
  },
};

export const habitantEndDate = {
  title: "تاریخ پایان",
  dataIndex: "endDate",
  key: "endDate",
  width: 130,
  render: (value: string) => {
    return <SingleVerticalItem value={value} isDate label="" />;
  },
};

export const habitantPrice = {
  title: "قیمت (ریال - تخت روز)",
  dataIndex: "price",
  key: "price",
  width: 150,
  render: (value: string) => {
    return dataPlaceHolder({ data: value, isPrice: true });
  },
};

export const habitantRequestNumber = {
  title: "شماره درخواست",
  dataIndex: "id",
  key: "id",
  width: 120,
};
export const habitantRequestType = {
  title: "نوع درخواست",
  dataIndex: "AssociationCategoryRequestType_title",
  key: "AssociationCategoryRequestType_title",
  width: 170,
  render: (value: number, records: DormUserRecordsList) => {
    return (
      <CustomTag color={dormRequestsTypeStatusColor[records?.requestTypeId]}>
        {value}
      </CustomTag>
    );
  },
};
export const habitantResidenceName = {
  title: "نام اقامتگاه",
  dataIndex: "AssociationBed_AssociationCategoryDormitory_title",
  key: "AssociationBed_AssociationCategoryDormitory_title",
  width: 170,
};
export const habitantAdmissionSchedule = {
  title: "برنامه پذیرش",
  dataIndex: "AssociationCategoryDeliverPlan_title",
  key: "AssociationCategoryDeliverPlan_title",
  width: 150,
};
export const habitantScheduleType = {
  title: "نوع زمان‌بندی",
  dataIndex: "AssociationCategoryDeliverPlan_AssociationCategorySchedulingType_title",
  key: "AssociationCategoryDeliverPlan_AssociationCategorySchedulingType_title",
  width: 100,
  render: (value: number, records: DormUserRecordsList) => {
    return (
      <CustomTag
        color={
          dormSchedulingStatusColor[records?.AssociationCategoryDeliverPlan_schedulingId]
        }
      >
        {value}
      </CustomTag>
    );
  },
};
export const habitantReserType = {
  title: "نوع رزرو",
  dataIndex: "AssociationCategoryDeliverPlan_AssociationCategoryReservationType_title",
  key: "AssociationCategoryDeliverPlan_AssociationCategoryReservationType_title",
  width: 170,
  render: (value: number, records: DormUserRecordsList) => {
    return (
      <CustomTag
        color={
          dormReservationTypeStatusColor[
            records?.AssociationCategoryDeliverPlan_reservationTypeId
          ]
        }
      >
        {value}
      </CustomTag>
    );
  },
};
export const habitantRegisterRequest = {
  title: "تاریخ ثبت درخواست",
  dataIndex: "createDate",
  key: "createDate",
  width: 150,
  render: (value: string, records: DormUserRecordsList) => {
    return <>{dateTimeCombiner(value, records?.createTime)}</>;
  },
};
export const habitantLastStatusDate = {
  title: "تاریخ آخرین تغییر",
  dataIndex: "updateDate",
  key: "updateDate",
  width: 150,
  render: (value: string, records: DormUserRecordsList) => {
    return <>{dateTimeCombiner(value, records?.updateTime)}</>;
  },
};
export const habitantStatus = {
  title: "وضعیت",
  dataIndex: "paymentStatus",
  key: "paymentStatus",
  width: 100,
  render: (value: number) => {
    return (
      <CustomTag
        color={
          value === 2 ? "red" : value === 1 ? "green" : value === 3 ? "gold" : undefined
        }
      >
        {value === 2
          ? "بدهکار"
          : value === 1
            ? "تسویه شده"
            : value === 3
              ? "بستانکار"
              : "نا مشخص"}
      </CustomTag>
    );
  },
};
export const habitantWaiting = {
  title: "انتظار",
  dataIndex: "createDate",
  key: "createDate",
  width: 100,
  render: (value: string) => <CustomTagWithDiffDays value={value} />,
};
