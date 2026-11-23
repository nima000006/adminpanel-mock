import { PiArrowUUpLeft, PiCircleDashed, PiFolder } from "react-icons/pi";
import { Link } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import CustomTagWithHorizontalDiffDays from "@components/Renderers/CustomTagWithHorizontalDiffDays/CustomTagWithHorizontalDiffDays";
import SamimServiceTag from "@components/Renderers/SamimServiceTag/SamimServiceTag";
import { dataPlaceHolder, makeSearchParams } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { MANAGEMENT_ALL_DETAIL_PAGE_ROUTE } from "@infra/router/routes/management";
import { TICKETING_TICKET_ALL_DETAIL_PAGE_ROUTE } from "@infra/router/routes/ticketing";
import { priorityMap, ticketTypeMap } from "@pages/Ticketing/_shared/utils/utils";

import {
  InnerTicketsAssignedToListTypes,
  InnerTicketsAssignedToTicketPriority,
  InnerTicketsAssignedToTicketType,
} from "../../@types/InnerTicketsAssignedToListTypes";

const AllInnerTicketsAssignedToTableModel =
  (): CustomColumnType<InnerTicketsAssignedToListTypes>[] => [
    {
      title: "روز شمار",
      dataIndex: "lastResponseDate",
      key: "lastResponseDate",
      width: 110,
      render: (_: unknown, record: InnerTicketsAssignedToListTypes) =>
        record.status === "waiting" ? (
          <CustomTagWithHorizontalDiffDays value={record.lastResponseDate} />
        ) : (
          ""
        ),
    },
    {
      title: "شماره تیکت",
      dataIndex: "ticketNumber",
      key: "ticketNumber",
      width: 120,
      searchable: true,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "تخصیص به",
      dataIndex: "asignTo",
      key: "asignTo",
      width: 120,
      render: (value: string) => (
        <CustomButton type="link">
          <Link to={MANAGEMENT_ALL_DETAIL_PAGE_ROUTE}>{value}</Link>
        </CustomButton>
      ),
    },
    {
      title: "وضعیت تیکت",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (_: unknown, record: InnerTicketsAssignedToListTypes) => {
        return (
          <CustomTag
            variant="outlined"
            className="w-fit"
            color={record.status === "waiting" ? "default" : "green"}
          >
            {record.status === "waiting" ? "در انتظار پاسخ" : "پاسخ داده شده"}
          </CustomTag>
        );
      },
    },
    {
      title: "اولویت",
      dataIndex: "priority",
      key: "priority",
      width: 120,
      render: (value: InnerTicketsAssignedToTicketPriority) => {
        const config = priorityMap[value];
        return config ? (
          <CustomTag variant="outlined" className="w-fit" color={config.color}>
            {config.label}
          </CustomTag>
        ) : (
          "-"
        );
      },
    },
    {
      title: "سرویس",
      dataIndex: "service",
      key: "service",
      width: 170,
      render: (value: string) => <SamimServiceTag service={value} />,
    },
    {
      title: "موضوع مشکل",
      dataIndex: "subjectIssue",
      key: "subjectIssue",
      width: 220,
      render: (value: string) => (
        <CustomTag
          variant="outlined"
          className="flex w-fit items-center gap-1"
          icon={<PiFolder />}
        >
          {value}
        </CustomTag>
      ),
    },
    {
      title: "نوع تیکت",
      dataIndex: "ticketType",
      key: "ticketType",
      width: 100,
      render: (value: InnerTicketsAssignedToTicketType) => {
        const config = ticketTypeMap[value];
        return config ? (
          <CustomTag
            className="flex w-fit items-center gap-1"
            variant="outlined"
            icon={value === "PRIMARY" ? <PiCircleDashed /> : <PiArrowUUpLeft />}
            color={config.color}
          >
            {config.label}
          </CustomTag>
        ) : (
          "-"
        );
      },
    },
    {
      title: "کاربر",
      dataIndex: "userName",
      key: "userName",
      width: 160,
      searchable: true,
      render: (value: string) => (
        <CustomButton type="link">
          <Link to={MANAGEMENT_ALL_DETAIL_PAGE_ROUTE}>{value}</Link>
        </CustomButton>
      ),
    },
    {
      title: "کد ملی / فراگیر",
      dataIndex: "nationalCode",
      key: "nationalCode",
      width: 140,
      searchable: true,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "شماره دانشجویی / پرسنلی",
      dataIndex: "studentOrPersonnelNumber",
      key: "studentOrPersonnelNumber",
      width: 200,
      searchable: true,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "شماره همراه",
      dataIndex: "mobileNumber",
      key: "mobileNumber",
      width: 130,
      searchable: true,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "شعبه / واحد",
      dataIndex: "branch",
      key: "branch",
      width: 140,
      render: (value: string) => (
        <CustomTag variant="outlined" className="w-fit">
          {value}
        </CustomTag>
      ),
    },
    {
      title: "استان",
      dataIndex: "province",
      key: "province",
      width: 150,
      searchable: true,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "شهر",
      dataIndex: "city",
      key: "city",
      width: 70,
      searchable: true,
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "تاریخ و زمان ثبت تیکت",
      dataIndex: "registrationDate",
      key: "registrationDate",
      width: 170,
      render: (value: string) =>
        dataPlaceHolder({
          data: value,
          isDate: true,
          customDateFormat: "HH:mm, YYYY/MM/DD ",
        }),
    },
    {
      title: "تاریخ و زمان آخرین پاسخ",
      dataIndex: "lastResponseDate",
      key: "lastResponseDate",
      width: 170,
      render: (value: string) =>
        dataPlaceHolder({
          data: value,
          isDate: true,
          customDateFormat: "HH:mm, YYYY/MM/DD ",
        }),
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      fixed: "right" as FixedType,
      render: (_: unknown, records: InnerTicketsAssignedToListTypes) => (
        <Link
          to={{
            pathname: TICKETING_TICKET_ALL_DETAIL_PAGE_ROUTE,
            search: makeSearchParams({
              ticketId: records?.id,
              from: "innerTicket",
            }),
          }}
        >
          <CustomButton type="link">مشاهده</CustomButton>
        </Link>
      ),
    },
  ];

export default AllInnerTicketsAssignedToTableModel;
