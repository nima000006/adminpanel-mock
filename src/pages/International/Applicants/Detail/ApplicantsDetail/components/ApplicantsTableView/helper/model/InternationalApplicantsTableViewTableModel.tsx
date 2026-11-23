import { Link } from "react-router";

import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { makeSearchParams } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { INTERNATIONAL_APPLICANTS_REQUEST_DETAIL_ROUTE } from "@infra/router/routes/international";
const InternationalApplicantsTableViewTableModel = () => {
  return [
    {
      title: "شماره درخواست",
      dataIndex: "requestNumber",
      key: "requestNumber",
      width: 150,
    },
    {
      title: "مرحله درخواست",
      dataIndex: "requestLevel",
      key: "requestLevel",
      width: 100,
      render: (value: string) => {
        return (
          <CustomTag color="blue" className="w-fit">
            {value}
          </CustomTag>
        );
      },
    },
    {
      title: "مقطع درخواستی",
      dataIndex: "requestDegree",
      key: "requestDegree",
      width: 200,
      render: (value: string) => {
        return (
          <CustomTag color="default" className="w-fit">
            {value}
          </CustomTag>
        );
      },
    },
    {
      title: "رشته درخواستی",
      dataIndex: "requestField",
      key: "requestField",
      width: 250,
    },

    {
      title: "واحد درخواستی",
      dataIndex: "requestUnit",
      key: "requestUnit",
      width: 200,
    },

    {
      title: "",
      dataIndex: "id",
      key: "id",
      fixed: "right" as FixedType,
      width: 70,
      className: "tables-sticky-column-left",
      render: (value: string, records: any) => {
        return (
          <Link
            to={{
              pathname: INTERNATIONAL_APPLICANTS_REQUEST_DETAIL_ROUTE,
              search: makeSearchParams({
                id: value,
                status: records?.requestType,
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

export default InternationalApplicantsTableViewTableModel;
