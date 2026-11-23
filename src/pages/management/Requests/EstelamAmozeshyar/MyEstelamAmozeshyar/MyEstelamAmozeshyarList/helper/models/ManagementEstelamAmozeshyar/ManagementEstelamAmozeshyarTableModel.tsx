import { Link } from "react-router";

import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import CustomTagWithDiffDays from "@components/Renderers/CustomTagWithDiffDays/CustomTagWithDiffDays";
import { emptyString } from "@infra/config/global.vars";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { makeSearchParams, dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { MANAGEMENT_REQUESTS_MY_ESTELAM_AMOZESHYAR_DETAIL_PAGE_ROUTE } from "@infra/router/routes/management";
import {
  ENTRANCE_SEMESTER_TEXT,
  ESTELAM_AMOZESHYAR_WAITING_REVIEW,
} from "@pages/management/Requests/EstelamAmozeshyar/_shared/utils/estelamAmozeshyarUtil";

import { EstelamMyAmozeshyarListItemType } from "../../components/EstelamAmozeshyarWaitingReviewList/@types/@estelamAmozeshyarWaitingReviewListTab";

const ManagementMyEstelamAmozeshyarTableModel = ({
  type,
}: {
  type: number;
}): CustomColumnType<EstelamMyAmozeshyarListItemType>[] => {
  return [
    ...(type === ESTELAM_AMOZESHYAR_WAITING_REVIEW
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
      title: "نام",
      dataIndex: "firstName",
      key: "firstName",
      width: 130,
      ...GetServerColumnSearchProps({
        dataIndex: "firstName",
        label: "نام",
        type: "text",
      }),
      render: (_: unknown, records: EstelamMyAmozeshyarListItemType) => {
        return dataPlaceHolder({ data: records?.user?.firstName });
      },
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
      render: (_: unknown, records: EstelamMyAmozeshyarListItemType) => {
        return dataPlaceHolder({ data: records?.user?.lastName });
      },
    },
    {
      title: "کد ملی / فراگیر",
      dataIndex: "username",
      key: "username",
      width: 130,
      ...GetServerColumnSearchProps({
        dataIndex: "username",
        label: "کد ملی / کد فراگیر",
        type: "text",
      }),
      render: (_: unknown, records: EstelamMyAmozeshyarListItemType) => {
        return dataPlaceHolder({ data: records?.user?.username });
      },
    },
    {
      title: "شماره همراه",
      dataIndex: "mobileNo",
      key: "mobileNo",
      width: 130,
      ...GetServerColumnSearchProps({
        dataIndex: "mobileNo",
        label: "شماره همراه",
        type: "text",
      }),
      render: (_: unknown, records: EstelamMyAmozeshyarListItemType) => {
        return dataPlaceHolder({ data: records?.user?.mobileNumber });
      },
    },
    {
      title: "استان",
      dataIndex: "user",
      key: "user",
      width: 130,
      render: (_: unknown) => {
        return emptyString;
      },
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
      title: "واحد دانشگاهی",
      dataIndex: "branchName",
      key: "branchName",
      width: 130,
      render: (value: string) => {
        return <CustomTag>{dataPlaceHolder({ data: value })}</CustomTag>;
      },
    },
    {
      title: "نام دانشکده",
      dataIndex: "facultyName",
      key: "facultyName",
      width: 130,
      render: (value: string) => {
        return <CustomTag>{dataPlaceHolder({ data: value })}</CustomTag>;
      },
    },
    {
      title: "مقطع تحصیلی",
      dataIndex: "degreeTitle",
      key: "degreeTitle",
      width: 130,
      render: (value: string) => {
        return <CustomTag>{dataPlaceHolder({ data: value })}</CustomTag>;
      },
    },
    {
      title: "رشته تحصیلی",
      dataIndex: "studyField",
      key: "studyField",
      width: 130,
      render: (value: string) => {
        return <CustomTag>{dataPlaceHolder({ data: value })}</CustomTag>;
      },
    },
    {
      title: "سال ورود",
      dataIndex: "entranceYear",
      key: "entranceYear",
      width: 130,
      render: (value: string) => {
        return (
          <>{dataPlaceHolder({ data: value, isDate: true, customDateFormat: "YYYY" })}</>
        );
      },
    },
    {
      title: "نیم‌سال ورود",
      dataIndex: "entranceSemester",
      key: "entranceSemester",
      width: 130,
      render: (value: string) => {
        return <> {ENTRANCE_SEMESTER_TEXT[value]}</>;
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
              customDateFormat: "YYYY/MM/DD ،HH:mm",
            })}
          </>
        );
      },
    },
    {
      title: "آخرین اقدام",
      dataIndex: "modifiedDate",
      key: "modifiedDate",
      width: 130,
      render: (value: string) => {
        return (
          <>
            {dataPlaceHolder({
              data: value,
              isDate: true,
              customDateFormat: "YYYY/MM/DD ،HH:mm",
            })}
          </>
        );
      },
    },
    {
      title: "آخرین بررسی کننده",
      dataIndex: "modifierFirstname",
      key: "modifierFirstname",
      width: 130,
      render: (value: string, records: EstelamMyAmozeshyarListItemType) => {
        return (
          <>
            {value} {records?.modifierLastname}
          </>
        );
      },
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
            pathname: MANAGEMENT_REQUESTS_MY_ESTELAM_AMOZESHYAR_DETAIL_PAGE_ROUTE,
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

export default ManagementMyEstelamAmozeshyarTableModel;
