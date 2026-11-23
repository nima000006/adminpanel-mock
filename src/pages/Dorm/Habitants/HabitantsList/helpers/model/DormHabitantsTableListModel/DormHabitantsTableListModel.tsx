import { Link } from "react-router";

import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dataPlaceHolder, makeSearchParams } from "@infra/helpers/utils";
import { DORM_HABITANTS_DETAIL_PAGE_ROUTE } from "@infra/router/routes/dorm";

import {
  HabitntListBed,
  HabitntListBranch,
  HabitntListBuilding,
  HabitntListCity,
  HabitntListDormitory,
  HabitntListField,
  HabitntListFloor,
  HabitntListGender,
  HabitntListGrade,
  HabitntListMobileNumber,
  HabitntListNationalCode,
  HabitntListOProvince,
  HabitntListRemainDays,
  HabitntListRoom,
  HabitntListScheduleingType,
  HabitntListUserGroup,
  HabitntListYearOfEntry,
  TableModelId,
} from "../../../../_shared/utils/HabitantTableModel";
import { HabitantsListData } from "../../../@types/@habitantsList";

const DormHabitantsTableListModel = () => [
  HabitntListRemainDays,
  {
    title: "نام",
    dataIndex: "AssociationCustomer_AssociationCustomerUser_firstName",
    key: "AssociationCustomer_AssociationCustomerUser_firstName",
    width: 120,
    ...GetServerColumnSearchProps({
      dataIndex: "name",
      label: "نام",
      type: "text",
    }),
  },
  {
    title: "نام خانوادگی",
    dataIndex: "AssociationCustomer_AssociationCustomerUser_lastName",
    key: "AssociationCustomer_AssociationCustomerUser_lastName",
    width: 120,
    ...GetServerColumnSearchProps({
      dataIndex: "lastName",
      label: "نام خانوادگی",
      type: "text",
    }),
  },
  HabitntListGender,
  HabitntListUserGroup,
  {
    title: "شماره دانشجویی/شماره پرسنلی",
    dataIndex: "AssociationCustomer_AssociationStudent_studentNumber",
    key: "AssociationCustomer_AssociationStudent_studentNumber",
    width: 220,
    ...GetServerColumnSearchProps({
      dataIndex: "studentNumber",
      label: "شماره دانشجویی/شماره پرسنلی",
      type: "text",
    }),
  },
  HabitntListNationalCode,
  HabitntListMobileNumber,
  HabitntListDormitory,
  HabitntListBuilding,
  HabitntListFloor,
  HabitntListRoom,
  HabitntListBed,
  HabitntListOProvince,
  HabitntListCity,
  HabitntListBranch,
  HabitntListGrade,
  HabitntListField,
  HabitntListYearOfEntry,
  HabitntListScheduleingType,
  {
    title: "شروع اسکان",
    dataIndex: "residenceStartDate",
    key: "residenceStartDate",
    width: 150,
    ...GetServerColumnSearchProps({
      dataIndex: "residenceStartDate",
      label: "شروع اسکان",
      type: "sort",
    }),
    render: (startOfSettlement: string) => {
      return dataPlaceHolder({
        data: startOfSettlement,
        isDate: true,
        customDateFormat: "HH:mm - YYYY/M/D",
      });
    },
  },
  {
    title: "پایان اسکان",
    dataIndex: "residenceEndDate",
    key: "residenceEndDate",
    width: 150,
    ...GetServerColumnSearchProps({
      dataIndex: "residenceEndDate",
      label: "پایان اسکان",
      type: "sort",
    }),
    render: (endOfSettlement: string) => {
      return dataPlaceHolder({
        data: endOfSettlement,
        isDate: true,
        customDateFormat: "HH:mm - YYYY/M/D",
      });
    },
  },

  {
    ...TableModelId,
    render: (value: number, record: HabitantsListData) => {
      return (
        <Link
          to={{
            pathname: DORM_HABITANTS_DETAIL_PAGE_ROUTE,
            search: makeSearchParams({
              id: value,
              title: `${record?.AssociationCustomer_AssociationCustomerUser_firstName ?? "نامشخص"} ${record?.AssociationCustomer_AssociationCustomerUser_lastName ?? ""}`,
              userGroup: record?.AssociationCustomer_userGroupID?.toString(),
              dormId: record?.AssociationBed_dormitoryid,
              tariffId: record?.AssociationCategoryDeliverPlan_priceListId,
              userNationalCode:
                record?.AssociationCustomer_AssociationCustomerUser_nationalCode,
              deliverPlanId: record?.deliverPlanId,
              startDate: record?.residenceStartDate,
              endDate: record?.residenceEndDate,
              roomId: record?.AssociationBed_roomId,
            }),
          }}
          className="text-link"
        >
          مشاهده
        </Link>
      );
    },
  },
];

export default DormHabitantsTableListModel;
