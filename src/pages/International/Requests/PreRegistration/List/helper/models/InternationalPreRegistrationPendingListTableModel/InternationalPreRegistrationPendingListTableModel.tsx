import { PiHourglassSimpleHigh } from "react-icons/pi";
import { Link } from "react-router";

import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import CustomTagWithDiffDays from "@components/Renderers/CustomTagWithDiffDays/CustomTagWithDiffDays";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { makeSearchParams, dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { INTERNATIONAL_REQUESTS_PRE_REGISTRATION_DETAIL_ROUTE } from "@infra/router/routes/international";

import { PRE_REGISTRATION_IDS } from "../../utils/preRegistrationListUtils";

const InternationalPreRegistrationPendingListTableModel = () => {
  return [
    {
      title: "مشخصات درخواست",
      children: [
        {
          title: "انتظار",
          dataIndex: "requestDate",
          key: "requestDate",
          width: 100,
          ...GetServerColumnSearchProps({
            dataIndex: "requestDate",
            label: "انتظار",
            type: "text",
          }),
          render: (value: string) => {
            return (
              <div className="table-column-center-content">
                <CustomTagWithDiffDays value={value} />
              </div>
            );
          },
        },
        {
          title: "شماره درخواست",
          dataIndex: "requestNumber",
          key: "requestNumber",
          width: 150,
          ...GetServerColumnSearchProps({
            dataIndex: "requestNumber",
            label: "شماره درخواست",
            type: "text",
          }),
          render: (value: number) => {
            return <div className="table-column-center-content">{value}</div>;
          },
        },
        {
          title: "نوع بررسی",
          dataIndex: "requestType",
          key: "requestType",
          width: 250,
          render: (value: any) => {
            return (
              <CustomTag
                icon={<PiHourglassSimpleHigh />}
                color={value === PRE_REGISTRATION_IDS?.pending ? "default" : "gold"}
                className="request-type"
              >
                {value === PRE_REGISTRATION_IDS?.pending
                  ? "در انتظار بررسی"
                  : value === PRE_REGISTRATION_IDS?.waitingReChecking
                    ? "در انتظار بررسی مجدد"
                    : "-"}
              </CustomTag>
            );
          },
        },
        {
          title: "کد سائورگ",
          dataIndex: "saorgCode",
          key: "saorgCode",
          width: 150,
          ...GetServerColumnSearchProps({
            dataIndex: "saorgCode",
            label: "کد سائورگ",
            type: "text",
          }),
        },
        {
          title: "رشته درخواستی",
          dataIndex: "requestField",
          key: "requestField",
          width: 250,
        },
        {
          title: "مقطع درخواستی",
          dataIndex: "requestDegree",
          key: "requestDegree",
          width: 200,
          render: (value: string) => {
            return <CustomTag className="request-degree">{value}</CustomTag>;
          },
        },
        {
          title: "واحد درخواستی",
          dataIndex: "requestUnit",
          key: "requestUnit",
          width: 200,
        },
        {
          title: "ترم تحصیلی درخواستی",
          dataIndex: "requestSemester",
          key: "requestSemester",
          width: 200,
        },
        {
          title: "تاریخ ارسال درخواست",
          dataIndex: "requestDate",
          key: "requestDate",
          width: 200,
          ...GetServerColumnSearchProps({
            dataIndex: "requestDate",
            label: "تاریخ ارسال درخواست",
            type: "text",
          }),
          render: (value: string) => {
            return (
              <div className="table-column-center-content">
                {dataPlaceHolder({
                  data: value,
                  isDate: true,
                  customDateFormat: "HH:mm , YYYY/MM/DD",
                })}
              </div>
            );
          },
        },
      ],
    },
    {
      title: "اطلاعات هویتی متقاضی",
      children: [
        {
          title: "نام متقاضی (انگلیسی)",
          dataIndex: "enFirstName",
          key: "enFirstName",
          width: 175,
        },
        {
          title: "نام خانوادگی (انگلیسی)",
          dataIndex: "enLastName",
          key: "enLastName",
          width: 175,
        },
        {
          title: "جنسیت",
          dataIndex: "genderType",
          key: "genderType",
          width: 100,
          render: (value: number) => {
            return (
              <CustomTag
                color={value === 1 ? "blue" : value === 2 ? "magenta" : "default"}
              >
                {value === 1 ? "آقا" : "بانو"}
              </CustomTag>
            );
          },
        },
        {
          title: "تاریخ تولد",
          dataIndex: "birthDate",
          key: "birthDate",
          width: 150,
          render: (value: string) => {
            return (
              <div className="table-column-center-content">
                {dataPlaceHolder({
                  data: value,
                  isDate: true,
                })}
              </div>
            );
          },
        },
        {
          title: "ملیت",
          dataIndex: "nationality",
          key: "nationality",
          width: 150,
        },
        {
          title: "تابعیت",
          dataIndex: "citizenship",
          key: "citizenship",
          width: 150,
        },
        {
          title: "اقامت",
          dataIndex: "resident",
          key: "resident",
          width: 150,
        },
        {
          title: "شماره پاسپورت",
          dataIndex: "passportNo",
          key: "passportNo",
          width: 170,
        },
        {
          title: "شناسه هویتی",
          dataIndex: "identificationNumber",
          key: "identificationNumber",
          width: 170,
        },
      ],
    },

    {
      title: "",
      dataIndex: "id",
      key: "id",
      fixed: "right" as FixedType,
      width: 150,
      className: "tables-sticky-column-left",
      render: (value: string, records: any) => {
        return (
          <Link
            to={{
              pathname: INTERNATIONAL_REQUESTS_PRE_REGISTRATION_DETAIL_ROUTE,
              search: makeSearchParams({
                id: value,
                status: records?.requestType,
              }),
            }}
            className="text-link"
          >
            {records?.requestType === PRE_REGISTRATION_IDS?.pending
              ? "بررسی درخواست"
              : records?.requestType === PRE_REGISTRATION_IDS?.waitingReChecking
                ? "بررسی مجدد درخواست"
                : "-"}
          </Link>
        );
      },
    },
  ];
};

export default InternationalPreRegistrationPendingListTableModel;
