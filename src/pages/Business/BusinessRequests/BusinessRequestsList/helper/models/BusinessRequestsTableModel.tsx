import { PiBuildings, PiUser } from "react-icons/pi";
import { Link } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { makeSearchParams, dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { MANAGEMENT_REQUESTS_DETAILS_PAGE_ROUTE } from "@infra/router/routes/business";

import { BusinessRequestTable } from "../../@types/@businessRequestListType";

const BusinessRequestsTableModel = () => {
  return [
    {
      title: "مدت انتظار",
      dataIndex: "waitingDays",
      key: "waitingDays",
      width: 130,
      render: (_: unknown, record: BusinessRequestTable) => {
        if (!record) return null;
        return (
          <div className="request-time-container">
            <CustomTag
              className={`custom-tag ${
                record.waitingDays <= 2
                  ? "custom-tag-green"
                  : record.waitingDays <= 4
                    ? "custom-tag-orange"
                    : "custom-tag-red"
              }`}
            >
              {record.waitingDays}
            </CustomTag>
            روز
          </div>
        );
      },
    },
    {
      title: "شماره درخواست",
      dataIndex: "requestNumber",
      key: "requestNumber",
      width: 140,
      render: (value: string | null) => value ?? "-",
    },
    {
      title: "وضعیت",
      dataIndex: "status",
      key: "status",
      width: 160,
      render: (_: unknown, record: BusinessRequestTable) => {
        if (!record.status) return null;
        let color: "error" | "warning" | "success" | undefined;

        if (record.status === "رد شده") {
          color = "error";
        } else if (
          record.status === "عودت شده" ||
          record.status === "در انتظار بررسی مجدد"
        ) {
          color = "warning";
        } else if (record.status === "تأیید شده") {
          color = "success";
        }

        return (
          <CustomTag className="custom-tag-status" color={color}>
            {record.status}
          </CustomTag>
        );
      },
    },
    {
      title: "درخواست دهنده",
      dataIndex: "applicantName",
      key: "applicantName",
      width: 145,
      render: (value: string | null) => value ?? "-",
    },
    {
      title: "کد ملی",
      dataIndex: "applicantNationalCode",
      key: "applicantNationalCode",
      width: 90,
      render: (value: string | null) => value ?? "-",
    },
    {
      title: "شماره تماس",
      dataIndex: "applicantMobileNumber",
      key: "applicantMobileNumber",
      width: 120,
      render: (value: string | null) => value ?? "-",
    },
    {
      title: "نام کسب و کار",
      dataIndex: "businessTitle",
      key: "businessTitle",
      width: 140,
      render: (value: string | null) => value ?? "-",
    },
    {
      title: "نوع کسب و کار",
      dataIndex: "personalityType",
      key: "personalityType",
      width: 135,
      render: (_: unknown, record: BusinessRequestTable) => {
        if (!record.personalityType) return null;
        const color = record.personalityType === "حقوقی" ? "processing" : "warning";
        const Icon = record.personalityType === "حقوقی" ? PiBuildings : PiUser;

        return (
          <CustomTag className="custom-tag-business-type" color={color}>
            <Icon /> {record.personalityType}
          </CustomTag>
        );
      },
    },
    {
      title: "تاریخ ثبت درخواست",
      dataIndex: "requestDate",
      key: "requestDate",
      width: 185,
      render: (value: string) => {
        if (!value) return "-";
        return (
          <>{dataPlaceHolder({ data: value, isDate: true, hasSpecialTime: true })}</>
        );
      },
    },
    {
      title: "تاریخ آخرین ویرایش",
      dataIndex: "lastEditDate",
      key: "lastEditDate",
      width: 185,
      render: (value: string) => {
        if (!value) return "-";
        return (
          <>{dataPlaceHolder({ data: value, isDate: true, hasSpecialTime: true })}</>
        );
      },
    },
    {
      title: "آخرین ویرایش کننده",
      dataIndex: "lastEditUser",
      key: "lastEditUser",
      width: 170,
      render: (value: string) => {
        if (!value) return "-";
        return (
          <>{dataPlaceHolder({ data: value, isDate: true, hasSpecialTime: true })}</>
        );
      },
    },
    {
      title: "ادمین مسئول",
      dataIndex: "responsibleManager",
      key: "responsibleManager",
      width: 130,
      render: (value: string | null) => value ?? "-",
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      fixed: "right" as FixedType,
      width: 115,
      render: (_: unknown, record: BusinessRequestTable) => {
        const isPending =
          record.status === " در انتظار بررسی" ||
          record.status === "در انتظار بررسی مجدد";

        return (
          <CustomButton type="link">
            <Link
              to={{
                pathname: MANAGEMENT_REQUESTS_DETAILS_PAGE_ROUTE,
                search: makeSearchParams({
                  id: record.id,
                  businessTempHistoryId: record.businessTempHistoryId,
                  status: record.status,
                  statusId: record,
                  applicantName: record.applicantName,
                }),
              }}
            >
              {isPending ? "بررسی و ایجاد" : "مشاهده"}
            </Link>
          </CustomButton>
        );
      },
    },
  ];
};
export default BusinessRequestsTableModel;
