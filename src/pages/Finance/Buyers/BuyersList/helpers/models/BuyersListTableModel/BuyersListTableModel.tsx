import { Link } from "react-router";

import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import { dataPlaceHolder, makeSearchParams } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { FINANCE_BUYERS_DETAIL_PAGE_ROUTE } from "@infra/router/routes/finance";

import { BuyersListDataTypes } from "../../../@types/@buyersList";

const BuyersListTableModel = (): CustomColumnType<BuyersListDataTypes>[] => {
  return [
    {
      title: "اطلاعات خریدار",
      children: [
        {
          title: "نام",
          dataIndex: "firstName",
          key: "firstName",
          width: 85,
          render: (value) => dataPlaceHolder({ data: value }),
        },
        {
          title: "نام خانوادگی",
          dataIndex: "lastName",
          key: "lastName",
          width: 140,
          render: (value) => dataPlaceHolder({ data: value }),
        },
        {
          title: "کد ملی / فراگیر",
          dataIndex: "username",
          key: "username",
          width: 150,
          //todo[nima] uncomment when api get ready
          // ...GetServerColumnSearchProps({
          //   dataIndex: "username",
          //   label: "کد ملی / فراگیر",
          //   type: "text",
          // }),
          render: (value) => dataPlaceHolder({ data: value }),
        },
        {
          title: "شماره موبایل",
          dataIndex: "phone",
          key: "phone",
          width: 130,
          //todo[nima] uncomment when api get ready
          // ...GetServerColumnSearchProps({
          //   dataIndex: "username",
          //   label: "کد ملی / فراگیر",
          //   type: "text",
          // }),
          render: (value) => dataPlaceHolder({ data: value }),
        },
      ],
    },
    {
      title: "اطلاعات مالی و تراکنش",
      children: [
        {
          title: "آخرین تراکنش",
          dataIndex: "paymentDate",
          key: "paymentDate",
          width: 200,
          //todo[nima] uncomment when api get ready
          // ...GetServerColumnSearchProps({
          //   dataIndex: "paymentDate",
          //   label: "آخرین تراکنش",
          //   type: "sort",
          // }),
          render: (value: string) => {
            return dataPlaceHolder({
              data: value,
              isDate: true,
              customDateFormat: "HH:mm, YYYY/MM/DD",
            });
          },
        },
      ],
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      fixed: "right" as FixedType,
      className: "tables-sticky-column-left",
      width: 75,
      render: (value: number, records: BuyersListDataTypes) => {
        return (
          <Link
            to={{
              pathname: FINANCE_BUYERS_DETAIL_PAGE_ROUTE,
              search: makeSearchParams({
                id: value,
                username: records.username,
              }),
            }}
            type="link"
            className="text-link"
          >
            مشاهده
          </Link>
        );
      },
    },
  ];
};

export default BuyersListTableModel;
