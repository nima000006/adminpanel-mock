import { Link } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import CustomTagWithDiffDays from "@components/Renderers/CustomTagWithDiffDays/CustomTagWithDiffDays";
import { makeSearchParams, dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { INTERNATIONAL_INTERVIEW_PENDING_HOLD_DETAIL_ROUTE } from "@infra/router/routes/international";

import { InternationalInterviewPendingHoldTableModelProps } from "./@types/@internationalInterviewPendingHoldTableModel";

const InternationalInterviewPendingHoldTableModel = ({
  editClickHandler,
}: InternationalInterviewPendingHoldTableModelProps) => {
  return [
    {
      title: "مانده به برگزاری",
      dataIndex: "interviewDate",
      key: "interviewDate",
      width: 200,
      render: (value: string) => {
        return <CustomTagWithDiffDays value={value} />;
      },
    },
    {
      title: "تاریخ و زمان برگزاری مصاحبه",
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
      title: "مصاحبه کنندگان",
      dataIndex: "interviewers",
      key: "interviewers",
      width: 250,
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
      title: "شماره پاسپورت",
      dataIndex: "passportNumber",
      key: "passportNumber",
      width: 200,
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
        return <CustomTag className="w-full">{value}</CustomTag>;
      },
    },
    {
      title: "واحد درخواستی",
      dataIndex: "branchCode",
      key: "branchCode",
      width: 200,
    },
    {
      title: "ترم تحصیلی درخواستی",
      dataIndex: "requestSemester",
      key: "requestSemester",
      width: 200,
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      fixed: "right" as FixedType,
      width: 150,
      className: "tables-sticky-column-left",
      render: (value: string) => {
        return (
          <div className="flex items-center gap-2.5">
            <Link
              to={{
                pathname: INTERNATIONAL_INTERVIEW_PENDING_HOLD_DETAIL_ROUTE,
                search: makeSearchParams({
                  id: value,
                }),
              }}
              className="text-link"
            >
              مشاهده
            </Link>
            <CustomButton type="link" onClick={() => editClickHandler(value)}>
              ویرایش
            </CustomButton>
          </div>
        );
      },
    },
  ];
};

export default InternationalInterviewPendingHoldTableModel;
