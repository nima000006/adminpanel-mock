import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import CustomTagWithDiffDays from "@components/Renderers/CustomTagWithDiffDays/CustomTagWithDiffDays";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import {
  dateTimeCombiner,
  dormRequestsTypeStatusColor,
  dormReservationTypeStatusColor,
  dormSchedulingStatusColor,
} from "@pages/Dorm/_shared/utils/DormUtils";

import { DormUserRecordsList } from "../../../../@types/@usersRequestsDetailUserHistory";

export const requestNumber = {
  title: "شماره درخواست",
  dataIndex: "id",
  key: "id",
  width: 150,
};
export const requestType = {
  title: "نوع درخواست",
  dataIndex: "AssociationCategoryRequestType_title",
  key: "AssociationCategoryRequestType_title",
  width: 200,
  render: (value: string, records: DormUserRecordsList) => {
    return (
      <CustomTag color={dormRequestsTypeStatusColor[records?.requestTypeId]}>
        {value}
      </CustomTag>
    );
  },
};
export const categoryDormitory = {
  title: "نام اقامتگاه",
  dataIndex: "AssociationBed_AssociationCategoryDormitory_title",
  key: "AssociationBed_AssociationCategoryDormitory_title",
  width: 200,
};
export const categoryDeliverPlan = {
  title: "برنامه پذیرش",
  dataIndex: "AssociationCategoryDeliverPlan_title",
  key: "AssociationCategoryDeliverPlan_title",
  width: 200,
};
export const categorySchedulingType = {
  title: "نوع زمان‌بندی",
  dataIndex: "AssociationCategoryDeliverPlan_AssociationCategorySchedulingType_title",
  key: "AssociationCategoryDeliverPlan_AssociationCategorySchedulingType_title",
  width: 100,
  render: (value: string, records: DormUserRecordsList) => {
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
export const categoryReservationType = {
  title: "نوع رزرو",
  dataIndex: "AssociationCategoryDeliverPlan_AssociationCategoryReservationType_title",
  key: "AssociationCategoryDeliverPlan_AssociationCategoryReservationType_title",
  width: 175,
  render: (value: string, records: DormUserRecordsList) => {
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
export const createDate = {
  title: "تاریخ ثبت درخواست",
  dataIndex: "createDate",
  key: "createDate",
  width: 150,
  render: (value: string, records: DormUserRecordsList) => {
    return <>{dateTimeCombiner(value, records?.createTime)}</>;
  },
};
export const updateDate = {
  title: "تاریخ آخرین تغییر",
  dataIndex: "updateDate",
  key: "updateDate",
  width: 150,
  render: (value: string, records: DormUserRecordsList) => {
    return <>{dateTimeCombiner(value, records?.updateTime)}</>;
  },
};
export const paymentStatus = {
  title: "وضعیت",
  dataIndex: "paymentStatus",
  key: "paymentStatus",
  width: 100,
  render: (value: number) => (
    <div>
      {value === 2 ? (
        <CustomTag color="red">بدهکار</CustomTag>
      ) : value === 1 ? (
        <CustomTag color="green">تسویه شده</CustomTag>
      ) : value === 3 ? (
        <CustomTag color="gold">بستانکار</CustomTag>
      ) : (
        "-"
      )}
    </div>
  ),
};
export const createDateWait = {
  title: "انتظار",
  dataIndex: "createDate",
  key: "createDate",
  width: 100,
  render: (value: string) => <CustomTagWithDiffDays value={value} />,
};
export const TableModelId = {
  title: "",
  dataIndex: "id",
  key: "id",
  fixed: "right" as FixedType,
  width: 100,
  className: "tables-sticky-column-left",
};
