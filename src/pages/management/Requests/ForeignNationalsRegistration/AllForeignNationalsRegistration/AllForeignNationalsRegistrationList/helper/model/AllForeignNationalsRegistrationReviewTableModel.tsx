import { Link } from "react-router";

import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTagWithDiffDays from "@components/Renderers/CustomTagWithDiffDays/CustomTagWithDiffDays";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dataPlaceHolder, makeSearchParams } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { MANAGEMENT_REQUESTS_ALL_FOREIGN_NATIONALS_REGISTRATION_DETAIL_PAGE_ROUTE } from "@infra/router/routes/management";
import { FOREIGN_NATIONAL_WAITING_REVIEW } from "@pages/management/Requests/ForeignNationalsRegistration/_shared/utils/ForeignNationalsRegistration";
import { AllForeignListItemType } from "@pages/management/Requests/ForeignNationalsRegistration/AllForeignNationalsRegistration/AllForeignNationalsRegistrationList/@types/@allForeignNationalsRegistrationListTypes";

const AllForeignNationalsRegistrationReviewTableModel = ({
  type,
}: {
  type: string;
}): CustomColumnType<AllForeignListItemType>[] => {
  return [
    ...(type === FOREIGN_NATIONAL_WAITING_REVIEW
      ? [
          {
            title: "روز شمار",
            dataIndex: "createdDate",
            key: "createdDate",
            width: 130,
            render: (value: string) => {
              return <CustomTagWithDiffDays value={value} />;
            },
          },
        ]
      : []),
    {
      title: "نام ",
      dataIndex: "firstName",
      key: "firstName",
      width: 130,
      ...GetServerColumnSearchProps({
        dataIndex: "firstName",
        label: "نام ",
        type: "text",
      }),
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "نام خانوادگی",
      dataIndex: "lastName",
      key: "lastName",
      width: 130,
      ...GetServerColumnSearchProps({
        dataIndex: "lastName",
        label: "نام خانوادگی",
        type: "text",
      }),
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "ملیت",
      dataIndex: "region",
      key: "region",
      width: 130,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "کد فراگیر",
      dataIndex: "internationalCode",
      key: "internationalCode",
      width: 130,
      ...GetServerColumnSearchProps({
        dataIndex: "internationalCode",
        label: "کد فراگیر",
        type: "text",
      }),
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "شماره همراه",
      dataIndex: "mobileNumber",
      key: "mobileNumber",
      width: 130,
      ...GetServerColumnSearchProps({
        dataIndex: "mobileNumber",
        label: "شماره همراه",
        type: "text",
      }),
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "شماره دانشجویی",
      dataIndex: "studentNumber",
      key: "studentNumber",
      width: 150,
      ...GetServerColumnSearchProps({
        dataIndex: "studentNumber",
        label: "شماره دانشجویی",
        type: "text",
      }),
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "کد سائورگ",
      dataIndex: "saurgCode",
      key: "saurgCode",
      width: 130,
      ...GetServerColumnSearchProps({
        dataIndex: "saurgCode",
        label: "کد سائورگ",
        type: "text",
      }),
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "ثبت درخواست",
      dataIndex: "createdDate",
      key: "createdDate",
      width: 130,
      ...GetServerColumnSearchProps({
        dataIndex: "createdDate",
        label: "ثبت درخواست",
        type: "sort",
      }),
      render: (value: string) => {
        return (
          <>
            {dataPlaceHolder({
              data: value,
              isDate: true,
              customDateFormat: "HH:mm, YYYY/MM/DD ",
            })}
          </>
        );
      },
    },
    ...(type !== FOREIGN_NATIONAL_WAITING_REVIEW
      ? [
          // {
          //   title: "آخرین اقدام کننده",
          //   dataIndex: "modifier",
          //   key: "modifier",
          //   width: 200,
          //   render: (_: string, records: AllForeignListItemType) =>
          //     nameFamilyConcat(records?.firstName, records?.lastName),
          // },
          {
            title: "آخرین اقدام",
            dataIndex: "modifiedDate",
            key: "modifiedDate",
            width: 150,
            render: (value: string) => {
              return (
                <>
                  {dataPlaceHolder({
                    data: value,
                    isDate: true,
                    customDateFormat: "HH:mm, YYYY/MM/DD ",
                  })}
                </>
              );
            },
          },
        ]
      : []),

    {
      title: "",
      dataIndex: "id",
      key: "id",
      fixed: "right" as FixedType,
      className: "tables-sticky-column-left",
      width: 75,
      render: (value: number) => (
        <Link
          to={{
            pathname:
              MANAGEMENT_REQUESTS_ALL_FOREIGN_NATIONALS_REGISTRATION_DETAIL_PAGE_ROUTE,
            search: makeSearchParams({
              status: type,
              id: value,
            }),
          }}
          className="text-link"
        >
          مشاهده
        </Link>
      ),
    },
  ];
};

export default AllForeignNationalsRegistrationReviewTableModel;
