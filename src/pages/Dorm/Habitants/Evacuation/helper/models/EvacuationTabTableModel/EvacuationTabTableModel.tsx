import { Link } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { makeSearchParams, dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { DORM_HABITANTS_DETAIL_PAGE_ROUTE } from "@infra/router/routes/dorm";
import {
  dormGenderStatusColor,
  dormSchedulingStatusColor,
  dormUserGroupStatusColor,
} from "@pages/Dorm/_shared/utils/DormUtils";
import { DORM_HABITANTS_PAYMENT_STATUS } from "@pages/Dorm/Habitants/HabitantsList/helpers/utils/HabitantListUtils";

import { HabitantsEvacuationListData } from "../../../@types/@evacuationType";

const EvacuationTabTableModel = ({
  evacuationDrawerHandler,
  tabType,
}: {
  evacuationDrawerHandler: (value: HabitantsEvacuationListData) => void;
  tabType: number;
}) => [
  ...(tabType === DORM_HABITANTS_PAYMENT_STATUS?.credit
    ? [
        {
          title: "مبلغ بستانکاری",
          dataIndex: "creditAmount ",
          key: "creditAmount ",
          width: 100,
          render: (value: number | null) => value ?? "-",
        },
      ]
    : []),

  ...(tabType === DORM_HABITANTS_PAYMENT_STATUS?.debit
    ? [
        {
          title: "مبلغ بدهکاری",
          dataIndex: "amountRemaining",
          key: "amountRemaining",
          width: 100,
          render: (value: number | null) => value ?? "-",
        },
      ]
    : []),

  {
    title: "نام",
    dataIndex: "AssociationCustomer_AssociationCustomerUser_firstName",
    key: "AssociationCustomer_AssociationCustomerUser_firstName",
    width: 150,
    render: (value: string | null) => value ?? "-",
  },
  {
    title: "نام خانوادگی",
    dataIndex: "AssociationCustomer_AssociationCustomerUser_lastName",
    key: "AssociationCustomer_AssociationCustomerUser_lastName",
    width: 150,
    render: (value: string | null) => value ?? "-",
  },
  {
    title: "جنسیت",
    dataIndex: "AssociationCustomer_AssociationCustomerUser_AssociationGender_title",
    key: "AssociationCustomer_AssociationCustomerUser_AssociationGender_title",
    width: 100,
    render: (value: number, records: HabitantsEvacuationListData) => {
      return (
        <CustomTag
          color={
            dormGenderStatusColor[
              records?.AssociationCustomer_AssociationCustomerUser_genderId
            ]
          }
        >
          {value}
        </CustomTag>
      );
    },
  },
  {
    title: "گروه کاربری",
    dataIndex: "AssociationCustomer_AssociationUserGroup_title",
    key: "AssociationCustomer_AssociationUserGroup_title",
    width: 150,
    render: (value: number, records: HabitantsEvacuationListData) => {
      return (
        <CustomTag
          color={dormUserGroupStatusColor[records?.AssociationCustomer_userGroupID]}
        >
          {value}
        </CustomTag>
      );
    },
  },
  {
    title: "شماره دانشجویی/شماره پرسنلی",
    dataIndex: "AssociationCustomer_AssociationStudent_studentNumber",
    key: "AssociationCustomer_AssociationStudent_studentNumber",
    width: 200,
  },
  {
    title: "کدملی/اتباع",
    dataIndex: "AssociationCustomer_AssociationCustomerUser_nationalCode",
    key: "AssociationCustomer_AssociationCustomerUser_nationalCode",
    width: 150,
  },
  {
    title: "اقامتگاه",
    dataIndex: "AssociationBed_AssociationCategoryDormitory_title",
    key: "AssociationBed_AssociationCategoryDormitory_title",
    width: 150,
  },
  {
    title: "ساختمان",
    dataIndex: "AssociationBed_AssociationCategoryBuliding_title",
    key: "AssociationBed_AssociationCategoryBuliding_title",
    width: 150,
  },
  {
    title: "طبقه",
    dataIndex: "AssociationBed_AssociationCategoryFloor_title",
    key: "AssociationBed_AssociationCategoryFloor_title",
    width: 150,
  },
  {
    title: "اتاق",
    dataIndex: "AssociationBed_AssociationCategorRoom_title",
    key: "AssociationBed_AssociationCategorRoom_title",
    width: 150,
  },
  {
    title: "تخت",
    dataIndex: "AssociationBed_AssociationCategorRoom_title",
    key: "AssociationBed_AssociationCategorRoom_title",
    width: 150,
  },
  {
    title: "مقطع تحصیلی",
    dataIndex: "AssociationCustomer_AssociationStudent_AssociationGrade_title",
    key: "AssociationCustomer_AssociationStudent_AssociationGrade_title",
    width: 150,
  },
  {
    title: "رشته تحصیلی",
    dataIndex: "AssociationCustomer_AssociationStudent_fieldTitle",
    key: "AssociationCustomer_AssociationStudent_fieldTitle",
    width: 150,
  },
  {
    title: "سال ورود",
    dataIndex: "AssociationCustomer_AssociationStudent_enCode",
    key: "AssociationCustomer_AssociationStudent_enCode",
    width: 150,
    render: (enCode: string) => {
      if (!enCode) return "-";
      const str = enCode.toString();
      const transformed = `1${str.slice(0, -1)}`;
      return transformed;
    },
  },
  {
    title: "نوع زمانبندی",
    dataIndex: "AssociationCategoryDeliverPlan_AssociationCategorySchedulingType_title",
    key: "AssociationCategoryDeliverPlan_AssociationCategorySchedulingType_title",
    width: 100,
    render: (value: number, records: HabitantsEvacuationListData) => {
      return (
        <CustomTag
          color={
            dormSchedulingStatusColor[
              records?.AssociationCategoryDeliverPlan_schedulingId
            ]
          }
        >
          {value}
        </CustomTag>
      );
    },
  },
  {
    title: "شروع اسکان",
    dataIndex: "residenceStartDate",
    key: "residenceStartDate",
    width: 150,
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
    render: (endOfSettlement: string) => {
      return dataPlaceHolder({
        data: endOfSettlement,
        isDate: true,
        customDateFormat: "HH:mm - YYYY/M/D",
      });
    },
  },
  {
    title: "استان",
    dataIndex:
      "AssociationCategoryDeliverPlan_AssociationCategoryBranch_AssociationCategoryRegion_AssociationRegionType_title",
    key: "AssociationCategoryDeliverPlan_AssociationCategoryBranch_AssociationCategoryRegion_AssociationRegionType_title",
    width: 150,
  },
  {
    title: "شهر",
    dataIndex:
      "AssociationCategoryDeliverPlan_AssociationCategoryBranch_AssociationCategoryRegion_title",
    key: "AssociationCategoryDeliverPlan_AssociationCategoryBranch_AssociationCategoryRegion_title",
    width: 150,
  },
  {
    title: "شعبه / واحد",
    dataIndex: "AssociationCategoryDeliverPlan_AssociationCategoryBranch_title",
    key: "AssociationCategoryDeliverPlan_AssociationCategoryBranch_title",
    width: 150,
  },
  {
    title: "",
    dataIndex: "id",
    key: "id",
    fixed: "right" as FixedType,
    width: 150,
    className: "tables-sticky-column-left",
    render: (value: number, record: HabitantsEvacuationListData) => {
      return (
        <div>
          <CustomButton
            onClick={() => evacuationDrawerHandler(record)}
            danger
            type="text"
          >
            تخلیه
          </CustomButton>
          <Link
            to={{
              pathname: DORM_HABITANTS_DETAIL_PAGE_ROUTE,
              search: makeSearchParams({
                id: value,
                title: `${record?.AssociationCustomer_AssociationCustomerUser_firstName} ${record?.AssociationCustomer_AssociationCustomerUser_lastName}`,
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
        </div>
      );
    },
  },
];

export default EvacuationTabTableModel;
