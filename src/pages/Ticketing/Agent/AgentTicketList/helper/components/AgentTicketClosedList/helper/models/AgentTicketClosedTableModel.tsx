import { PiArrowUUpLeft, PiCircleDashed, PiFolder } from "react-icons/pi";
import { Link } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import SamimServiceTag from "@components/Renderers/SamimServiceTag/SamimServiceTag";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dataPlaceHolder, makeSearchParams } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { MANAGEMENT_MY_DETAIL_PAGE_ROUTE } from "@infra/router/routes/management";
import { TICKETING_TICKET_MY_DETAIL_PAGE_ROUTE } from "@infra/router/routes/ticketing";
import { IdTitle, IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import TicketRate from "@pages/Ticketing/_shared/components/TicketRate/TicketRate";
import {
  priorityMap,
  ticketStatusMap,
  ticketTypeMap,
} from "@pages/Ticketing/_shared/utils/utils";

import { AgentClosedListAndAdvanceFilterItems } from "../../@types/@agentTicketClosedTypes";

const AgentTicketClosedTableModel =
  (): CustomColumnType<AgentClosedListAndAdvanceFilterItems>[] => [
    {
      title: "شماره تیکت",
      dataIndex: "ticketNumber",
      key: "ticketNumber",
      width: 120,
      ...GetServerColumnSearchProps({
        dataIndex: "ticketNumber",
        label: "شماره تیکت",
        type: "text",
      }),
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "اولویت",
      dataIndex: "priority",
      key: "priority",
      width: 120,
      ...GetServerColumnSearchProps({
        dataIndex: "priority",
        label: "اولویت",
        type: "sort",
      }),
      render: (_: string, records: AgentClosedListAndAdvanceFilterItems) => {
        const config = priorityMap[records?.priority?.name];
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
      title: "وضعیت تیکت",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (_: string, records: AgentClosedListAndAdvanceFilterItems) => {
        const config = ticketStatusMap[records?.status?.name];

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
      render: (value: IdTitleName) => <SamimServiceTag service={value?.name} />,
    },
    {
      title: "موضوع مشکل",
      dataIndex: "topic",
      key: "topic",
      width: 220,
      render: (value: IdTitle) => (
        <CustomTag
          variant="outlined"
          className="flex w-fit items-center gap-1"
          icon={<PiFolder />}
        >
          {value?.title}
        </CustomTag>
      ),
    },
    {
      title: "نوع تیکت",
      dataIndex: "originTicket",
      key: "originTicket",
      width: 100,
      render: (_: string, records: AgentClosedListAndAdvanceFilterItems) => {
        const config = ticketTypeMap[records?.originTicket?.name];
        return config ? (
          <CustomTag
            className="flex w-fit items-center gap-1"
            variant="outlined"
            icon={
              records?.originTicket?.name === "PRIMARY" ? (
                <PiCircleDashed />
              ) : (
                <PiArrowUUpLeft />
              )
            }
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
      title: "رضایت کاربر",
      dataIndex: "rate",
      key: "rate",
      width: 200,
      ...GetServerColumnSearchProps({
        dataIndex: "ticketRating",
        label: "رضایت کاربر",
        type: "sort",
      }),
      render: (value: string) => (
        <TicketRate isForTable value={Number(value)} count={5} />
      ),
    },
    {
      title: "کاربر",
      dataIndex: "fullName",
      key: "fullName",
      width: 160,
      render: (value: string, records: AgentClosedListAndAdvanceFilterItems) => (
        <Link
          className="text-link"
          to={{
            pathname: MANAGEMENT_MY_DETAIL_PAGE_ROUTE,
            search: makeSearchParams({
              id: records?.userId,
            }),
          }}
        >
          {dataPlaceHolder({ data: value })}
        </Link>
      ),
    },
    {
      title: "کد ملی / فراگیر",
      dataIndex: "nationalCode",
      key: "nationalCode",
      width: 140,
      ...GetServerColumnSearchProps({
        dataIndex: "nationalCode",
        label: "کد ملی / فراگیر",
        type: "text",
      }),
      render: (value: string) => dataPlaceHolder({ data: value }),
    },
    {
      title: "شماره دانشجویی / پرسنلی",
      dataIndex: "personalityCode",
      key: "personalityCode",
      width: 200,
      ...GetServerColumnSearchProps({
        dataIndex: "personalityCode",
        label: "شماره دانشجویی / پرسنلی",
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
      title: "تاریخ و زمان ثبت تیکت",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 170,
      ...GetServerColumnSearchProps({
        dataIndex: "createdDate",
        label: "تاریخ و زمان ثبت تیکت",
        type: "sort",
      }),
      render: (value: string) =>
        dataPlaceHolder({
          data: value,
          isDate: true,
          customDateFormat: "HH:mm, YYYY/MM/DD ",
        }),
    },
    {
      title: "تاریخ و زمان آخرین پیام",
      dataIndex: "lastAnswerAt",
      key: "lastAnswerAt",
      width: 180,
      ...GetServerColumnSearchProps({
        dataIndex: "modifiedDate",
        label: "تاریخ و زمان آخرین پیام",
        type: "sort",
      }),
      render: (value: string) =>
        dataPlaceHolder({
          data: value,
          isDate: true,
          customDateFormat: "HH:mm, YYYY/MM/DD ",
        }),
    },
    {
      title: "",
      dataIndex: "uuid",
      key: "uuid",
      fixed: "right" as FixedType,
      render: (_: unknown, records: AgentClosedListAndAdvanceFilterItems) => (
        <div className="flex gap-2">
          <Link
            to={{
              pathname: TICKETING_TICKET_MY_DETAIL_PAGE_ROUTE,
              search: makeSearchParams({
                ticketId: records?.uuid,
              }),
            }}
          >
            <CustomButton type="link">مشاهده</CustomButton>
          </Link>
        </div>
      ),
    },
  ];

export default AgentTicketClosedTableModel;
