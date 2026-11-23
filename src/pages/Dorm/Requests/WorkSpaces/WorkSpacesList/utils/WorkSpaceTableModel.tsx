import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import CustomTagWithDiffDays from "@components/Renderers/CustomTagWithDiffDays/CustomTagWithDiffDays";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { dateTimeCombiner } from "@pages/Dorm/_shared/utils/DormUtils";
import {
  RequestTypeMode,
  StatusModeTag,
} from "@pages/Dorm/Requests/WorkSpaces/WorkSpacesDetail/_shared/utils/WorkSpaceDetailUtils";

import { WorkSpaceAdmissionListType } from "../helper/components/WorkSpacesAdmissionList/helper/@types/@workSpacesAdmissionListType";
import { WorkSpaceDormListType } from "../helper/components/WorkSpacesDormList/helper/@types/@workSpaceDormListType";
import { WorkSpaceTariffListType } from "../helper/components/WorkSpacesTariffList/helper/@types/@workSpaceTariffListType";

export const requestNumber = {
  title: "شماره درخواست",
  dataIndex: "id",
  key: "id",
  width: 130,
};
export const firstName = {
  title: "نام",
  dataIndex: "AssociationUser_AssociationCustomerUser_firstName",
  key: "AssociationUser_AssociationCustomerUser_firstName",
  width: 130,
};
export const lastName = {
  title: "نام خانوادگی",
  dataIndex: "AssociationUser_AssociationCustomerUser_lastName",
  key: "AssociationUser_AssociationCustomerUser_lastName",
  width: 130,
};
export const position = {
  title: "سمت",
  dataIndex: "position",
  key: "position",
  width: 130,
};
export const organ = {
  title: "سازمان",
  dataIndex: "organ",
  key: "organ",
  width: 130,
};
export const unit = {
  title: "شعبه / واحد ",
  dataIndex: "AssociationBranch_title",
  key: "AssociationBranch_title",
  width: 130,
};
export const requestType = {
  title: "نوع درخواست",
  dataIndex: "requestTypeId",
  key: "requestTypeId",
  width: 200,
  render: (value: number) => {
    if (value == null) return null;
    return (
      <CustomTag color={value === 1 || value === 3 || value === 5 ? "green" : "red"}>
        {RequestTypeMode(value)}
      </CustomTag>
    );
  },
};
export const requestReason = {
  title: "علت درخواست",
  dataIndex: "descriptionRequest",
  key: "descriptionRequest",
  width: 200,
};
export const requestReasonTariff = {
  title: "علت درخواست",
  dataIndex: "descRequest",
  key: "descRequest",
  width: 200,
};
export const registerDate = {
  title: "تاریخ ثبت درخواست",
  dataIndex: "createDate",
  key: "createDate",
  width: 150,
  render: (
    value: string,
    records: WorkSpaceDormListType | WorkSpaceTariffListType | WorkSpaceAdmissionListType
  ) => {
    return <>{dateTimeCombiner(value, records?.createTime)}</>;
  },
};

export const waiting = {
  title: "انتظار",
  dataIndex: "createDate",
  key: "createDate",
  width: 100,
  render: (value: string) => {
    if (value == null) return null;
    return <CustomTagWithDiffDays value={value} />;
  },
};
export const status = {
  title: "وضعیت",
  dataIndex: "statusId",
  key: "statusId",
  width: 150,
  render: (value: 1 | 2 | 3 | 4) => {
    if (value == null) return null;
    return (
      <CustomTag
        color={
          value === 2 ? "green" : value === 1 ? "gold" : value === 3 ? "red" : "default"
        }
      >
        {StatusModeTag(value)}
      </CustomTag>
    );
  },
};
export const editDate = {
  title: "تاریخ آخرین ویرایش",
  dataIndex: "updateDate",
  key: "updateDate",
  width: 150,
  render: (
    value: string,
    records: WorkSpaceDormListType | WorkSpaceTariffListType | WorkSpaceAdmissionListType
  ) => {
    return <>{dateTimeCombiner(value, records?.updateTime)}</>;
  },
};
export const lastEdit = {
  title: "آخرین ویرایش کننده",
  dataIndex: "AssociationUserStaffNew_AssociationCustomerUser_firstName",
  key: "AssociationUserStaffNew_AssociationCustomerUser_firstName",
  width: 130,
  render: (
    value: string,
    records: WorkSpaceDormListType | WorkSpaceTariffListType | WorkSpaceAdmissionListType
  ) => {
    return (
      <>
        {value} {records?.AssociationUserStaffNew_AssociationCustomerUser_lastName}
      </>
    );
  },
};

export const TableModelId = {
  title: "",
  dataIndex: "id",
  key: "id",
  fixed: "right" as FixedType,
  width: 100,
  className: "tables-sticky-column-left",
};
