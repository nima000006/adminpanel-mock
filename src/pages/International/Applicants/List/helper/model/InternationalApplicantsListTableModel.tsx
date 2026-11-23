import { Link } from "react-router";

import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { makeSearchParams, dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { INTERNATIONAL_APPLICANTS_DETAIL_ROUTE } from "@infra/router/routes/international";

const InternationalApplicantsListTableModel = () => {
  return [
    {
      title: "نام",
      dataIndex: "firstName",
      key: "firstName",
      width: 175,
    },
    {
      title: "نام خانوادگی ",
      dataIndex: "lastName",
      key: "lastName",
      width: 175,
    },
    {
      title: "جنسیت",
      dataIndex: "genderType",
      key: "genderType",
      width: 100,
      render: (value: number) => {
        return (
          <CustomTag color={value === 1 ? "blue" : value === 2 ? "magenta" : "default"}>
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

    {
      title: "",
      dataIndex: "id",
      key: "id",
      fixed: "right" as FixedType,
      width: 150,
      className: "tables-sticky-column-left",
      render: (value: string) => {
        return (
          <Link
            to={{
              pathname: INTERNATIONAL_APPLICANTS_DETAIL_ROUTE,
              search: makeSearchParams({
                id: value,
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
};

export default InternationalApplicantsListTableModel;
