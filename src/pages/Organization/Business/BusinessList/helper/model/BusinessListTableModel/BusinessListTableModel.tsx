import { PiBuildings, PiUserLight } from "react-icons/pi";
import { Link } from "react-router";

import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { makeSearchParams } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import {
  CREATE_BUSINESS_WITH_FIFTH_STEP_PAGE_ROUTE,
  MODIFY_BUSINESS_DETAIL_PAGE_ROUTE,
} from "@infra/router/routes/organization";
import { dateTimeCombiner } from "@pages/Dorm/_shared/utils/DormUtils";

import { AllBusinessListDataType } from "../../../@types/@businessList";
import {
  businessListStatusColor,
  businessStatusModeTag,
  businessTypeColor,
} from "../../utils/businessListUtils";

const BusinessListTableModel = (): CustomColumnType<AllBusinessListDataType>[] => {
  return [
    {
      title: "نام کسب و کار",
      dataIndex: "businessTitle",
      key: "businessTitle",
      width: 130,
    },
    {
      title: "نوع کسب و کار",
      dataIndex: "personalityType",
      key: "personalityType",
      width: 150,
      render: (value: string, records: any) => {
        return (
          <CustomTag
            icon={value === "حقوقی" ? <PiBuildings /> : <PiUserLight />}
            color={businessTypeColor[records?.personalityType]}
            className="business-list-custom-tag"
          >
            {records?.personalityType}
          </CustomTag>
        );
      },
    },
    {
      title: "تعداد شعب",
      dataIndex: " کلید ندارد", // از سمت بک کلید ندارد
      key: "",
      width: 150,
    },
    {
      title: "وضعیت ",
      dataIndex: "statusId",
      key: "statusId",
      width: 150,
      render: (value: number, records: AllBusinessListDataType) => {
        return (
          <CustomTag color={businessListStatusColor[records?.statusId]}>
            {businessStatusModeTag(value)}
          </CustomTag>
        );
      },
    },
    {
      title: "تاریخ ایجاد کسب و کار",
      dataIndex: "requestDate",
      key: "requestDate",
      width: 170,
      render: (value: string, records: any) => {
        return <>{dateTimeCombiner(value, records?.createTime)}</>;
      },
    },
    {
      title: "ایجاد کننده",
      dataIndex: " کلید ندارد", //  از سمت بک کلید ندارد
      key: "",
      width: 150,
    },
    {
      title: "تاریخ اخرین ویرایش",
      dataIndex: "lastEditDate",
      key: "lastEditDate",
      width: 130,
      render: (value: string, records: any) => {
        return <>{dateTimeCombiner(value, records?.createTime)}</>;
      },
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      className: "tables-sticky-column-left",
      fixed: "right" as FixedType | undefined,
      width: 70,
      render: (value: number, records: any) => {
        return records?.statusId === 3 ? (
          <Link
            to={{
              pathname: MODIFY_BUSINESS_DETAIL_PAGE_ROUTE,
              search: makeSearchParams({ id: value, title: records?.statusId }),
            }}
            className="text-link"
          >
            مشاهده
          </Link>
        ) : records?.statusId === 4 ? (
          <Link
            to={{
              pathname: CREATE_BUSINESS_WITH_FIFTH_STEP_PAGE_ROUTE,
              search: makeSearchParams({
                id: value,
                requestStatus: records?.statusId,
              }),
            }}
            className="text-link"
          >
            ویرایش
          </Link>
        ) : records?.statusId === 1 ? (
          <Link
            to={{
              pathname: CREATE_BUSINESS_WITH_FIFTH_STEP_PAGE_ROUTE,
              search: makeSearchParams({
                id: value,
                requestStatus: records?.statusId,
              }),
            }}
            className="text-link"
          >
            پیگیری
          </Link>
        ) : records?.statusId === 2 ? (
          <Link
            to={{
              pathname: CREATE_BUSINESS_WITH_FIFTH_STEP_PAGE_ROUTE,
              search: makeSearchParams({
                id: value,
                requestStatus: records?.statusId,
              }),
            }}
            className="text-link"
          >
            علت
          </Link>
        ) : null;
      },
    },
  ];
};

export default BusinessListTableModel;
