import { Link } from "react-router";

import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import CustomTagWithDiffDays from "@components/Renderers/CustomTagWithDiffDays/CustomTagWithDiffDays";
import { makeSearchParams, dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { INTERNATIONAL_INTERVIEW_PENDING_RESULT_DETAIL_ROUTE } from "@infra/router/routes/international";

const InternationalInterviewPendingResultTableModel = () => {
  return [
    {
      title: "انتظار",
      dataIndex: "interviewDate",
      key: "interviewDate",
      width: 100,
      render: (value: string) => {
        return <CustomTagWithDiffDays value={value} />;
      },
    },
    {
      title: "نام مصاحبه شونده",
      dataIndex: "firstName",
      key: "firstName",
      width: 250,
    },
    {
      title: "نام خانوادگی مصاحبه شونده",
      dataIndex: "lastName",
      key: "lastName",
      width: 250,
    },
    {
      title: "جنسیت",
      dataIndex: "gender",
      key: "gender",
      width: 70,
      render: (value: number) => {
        return (
          <CustomTag color={value === 1 ? "blue" : "magenta"}>
            {value === 1 ? "آقا" : "بانو"}
          </CustomTag>
        );
      },
    },
    {
      title: "ملیت",
      dataIndex: "region",
      key: "region",
      width: 100,
    },
    {
      title: "شماره پاسپورت",
      dataIndex: "passportNumber",
      key: "passportNumber",
      width: 200,
    },
    {
      title: "مصاحبه کنندگان",
      dataIndex: "interviewers",
      key: "interviewers",
      width: 250,
    },
    {
      title: "تاریخ برگزاری مصاحبه",
      dataIndex: "interviewDate",
      key: "interviewDate",
      width: 250,
      render: (value: string) => {
        return (
          <>
            {dataPlaceHolder({
              data: value,
              isDate: true,
              customDateFormat: "YYYY/MM/DD , HH:mm",
            })}
          </>
        );
      },
    },
    {
      title: "شماره درخواست",
      dataIndex: "requestId",
      key: "requestId",
      width: 200,
    },
    {
      title: "رشته درخواستی",
      dataIndex: "requestField",
      key: "requestField",
      width: 200,
    },
    {
      title: "مقطع درخواستی",
      dataIndex: "requestDegree",
      key: "requestDegree",
      width: 200,
      render: (value: string) => {
        return <CustomTag>{value}</CustomTag>;
      },
    },
    {
      title: "واحد درخواستی",
      dataIndex: "branchCode",
      key: "branchCode",
      width: 200,
    },
    {
      title: "ترم تحصیلی ",
      dataIndex: "requestSemester",
      key: "requestSemester",
      width: 200,
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      fixed: "right" as FixedType,
      width: 100,
      className: "tables-sticky-column-left",
      render: (value: string) => {
        return (
          <Link
            to={{
              pathname: INTERNATIONAL_INTERVIEW_PENDING_RESULT_DETAIL_ROUTE,
              search: makeSearchParams({
                id: value,
              }),
            }}
            className="text-link"
          >
            بررسی مصاحبه
          </Link>
        );
      },
    },
  ];
};

export default InternationalInterviewPendingResultTableModel;
