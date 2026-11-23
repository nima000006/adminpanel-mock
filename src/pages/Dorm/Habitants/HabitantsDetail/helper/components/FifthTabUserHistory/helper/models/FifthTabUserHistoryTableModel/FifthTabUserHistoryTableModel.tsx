import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dateTimeCombiner } from "@pages/Dorm/_shared/utils/DormUtils";
import { DormUserRecordsList } from "@pages/Dorm/Requests/UsersRequests/UsersRequestsDetail/_shared/components/UsersRequestsDetailUserHistory/@types/@usersRequestsDetailUserHistory";

import {
  habitantAdmissionSchedule,
  habitantRequestNumber,
  habitantRequestType,
  habitantReserType,
  habitantScheduleType,
  habitantStatus,
  habitantWaiting,
} from "../../../../../utils/HabitantDetailTableModel";

const FifthTabUserHistoryTableModel = () => {
  return [
    habitantRequestNumber,
    habitantRequestType,
    {
      title: "نام اقامتگاه",
      dataIndex: "AssociationBed_AssociationCategoryDormitory_title",
      key: "AssociationBed_AssociationCategoryDormitory_title",
      width: 170,
      ...GetServerColumnSearchProps({
        dataIndex: "dormitory",
        label: "نام اقامتگاه",
        type: "text",
      }),
    },
    habitantAdmissionSchedule,
    habitantScheduleType,
    habitantReserType,
    {
      title: "تاریخ ثبت درخواست",
      dataIndex: "createDate",
      key: "createDate",
      width: 150,
      ...GetServerColumnSearchProps({
        dataIndex: "createDate",
        label: "تاریخ ثبت درخواست",
        type: "sort",
      }),
      render: (value: string, records: DormUserRecordsList) => {
        return <>{dateTimeCombiner(value, records?.createTime)}</>;
      },
    },
    {
      title: "تاریخ آخرین تغییر",
      dataIndex: "updateDate",
      key: "updateDate",
      width: 150,
      ...GetServerColumnSearchProps({
        dataIndex: "updateDate",
        label: "تاریخ آخرین تغییر",
        type: "sort",
      }),
      render: (value: string, records: DormUserRecordsList) => {
        return <>{dateTimeCombiner(value, records?.updateTime)}</>;
      },
    },
    habitantStatus,
    habitantWaiting,
  ];
};
export default FifthTabUserHistoryTableModel;
