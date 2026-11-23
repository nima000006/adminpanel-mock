import { Link } from "react-router";

import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import CustomTagWithDiffDays from "@components/Renderers/CustomTagWithDiffDays/CustomTagWithDiffDays";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import {
  makeSearchParams,
  dataPlaceHolder,
  nameFamilyConcat,
} from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { MANAGEMENT_REQUESTS_ESTELAM_SAJED_DETAIL_PAGE_ROUTE } from "@infra/router/routes/management";
import { ESTELAM_SAJED_WAITING_REVIEW } from "@pages/management/Requests/EstelamSajed/_shared/utils/estelamSajedUtils";
import { EstelamSajedListItemType } from "@pages/management/Requests/EstelamSajed/AllEstelamSajed/EstelamSajedList/@types/@estelamSajedListTypes";

const ManagementEstelamSajedTableModel = ({
  type,
}: {
  type: number;
}): CustomColumnType<EstelamSajedListItemType>[] => {
  return [
    ...(type === ESTELAM_SAJED_WAITING_REVIEW
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
      render: (_: string, records: EstelamSajedListItemType) =>
        dataPlaceHolder({ data: records?.user?.firstName }),
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
      render: (_: string, records: EstelamSajedListItemType) =>
        dataPlaceHolder({ data: records?.user?.lastName }),
    },
    {
      title: "کد ملی",
      dataIndex: "username",
      key: "username",
      width: 130,
      ...GetServerColumnSearchProps({
        dataIndex: "username",
        label: "کد ملی",
        type: "text",
      }),
      render: (_: string, records: EstelamSajedListItemType) =>
        dataPlaceHolder({ data: records?.user?.username }),
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
      render: (_: string, records: EstelamSajedListItemType) =>
        dataPlaceHolder({ data: records?.user?.mobileNumber }),
    },
    {
      title: "کد پرسنلی",
      dataIndex: "employeeCode",
      key: "employeeCode",
      width: 130,
      ...GetServerColumnSearchProps({
        dataIndex: "employeeCode",
        label: "کد پرسنلی",
        type: "text",
      }),
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "نام سازمان / واحد محل فعالیت",
      dataIndex: "branchName",
      key: "branchName",
      width: 250,
      render: (value: string) => {
        return <CustomTag>{dataPlaceHolder({ data: value })}</CustomTag>;
      },
    },
    {
      title: "عنوان محل خدمت",
      dataIndex: "branchName",
      key: "branchName",
      width: 150,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "سمت",
      dataIndex: "positionTitle",
      key: "positionTitle",
      width: 130,
      render: (value: string) => {
        return <CustomTag>{dataPlaceHolder({ data: value })}</CustomTag>;
      },
    },
    {
      title: "ثبت درخواست",
      dataIndex: "createdDate",
      key: "createdDate",
      width: 130,
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

    {
      title: "آخرین بررسی کننده",
      dataIndex: "modifierFirstname",
      key: "modifierFirstname",
      width: 200,
      render: (_: string, records: EstelamSajedListItemType) =>
        nameFamilyConcat(records?.modifierFirstname, records?.modifierLastname),
    },
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
            pathname: MANAGEMENT_REQUESTS_ESTELAM_SAJED_DETAIL_PAGE_ROUTE,
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

export default ManagementEstelamSajedTableModel;
