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
import { priorityMap, ticketTypeMap } from "@pages/Ticketing/_shared/utils/utils";
import CustomConvertTimeToDays from "@pages/Ticketing/Agent/AgentTicketList/helper/components/CustomConvertTimeToDays/CustomConvertTimeToDays";

import {
  IdTitleNameLocal,
  TicketingAgentAssignedToMeWaitingPriority,
  TicketingAgentAssignedToMeWaitingRecord,
  TicketingAgentAssignedToMeWaitingType,
} from "../../@types/@agentTicketAssignedToMeWaitingList";

const AgentTicketAssignedToMeWaitingTableModel =
  (): CustomColumnType<TicketingAgentAssignedToMeWaitingRecord>[] => [
    {
      title: "روز شمار",
      dataIndex: "waitingDays",
      key: "waitingDays",
      width: 110,
      ...GetServerColumnSearchProps({
        dataIndex: "modifiedDate",
        label: "روز شمار",
        type: "sort",
      }),
      render: (value: number) =>
        value !== null && value !== undefined ? (
          <CustomConvertTimeToDays seconds={value} />
        ) : (
          "-"
        ),
    },
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
      render: (value: IdTitleNameLocal<TicketingAgentAssignedToMeWaitingPriority>) => {
        const config = priorityMap[value?.name];
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
      render: (value: IdTitleNameLocal<TicketingAgentAssignedToMeWaitingType>) => {
        const config = ticketTypeMap[value?.name];
        return config ? (
          <CustomTag
            className="flex w-fit items-center gap-1"
            variant="outlined"
            icon={value?.name === "PRIMARY" ? <PiCircleDashed /> : <PiArrowUUpLeft />}
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
      dataIndex: "fullName",
      key: "fullName",
      width: 160,
      render: (value: string, records: TicketingAgentAssignedToMeWaitingRecord) => (
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
      render: (_: unknown, records: TicketingAgentAssignedToMeWaitingRecord) => (
        <Link
          to={{
            pathname: TICKETING_TICKET_MY_DETAIL_PAGE_ROUTE,
            search: makeSearchParams({
              ticketId: records?.uuid,
            }),
          }}
        >
          <CustomButton type="link">پاسخ</CustomButton>
        </Link>
      ),
    },
  ];

export default AgentTicketAssignedToMeWaitingTableModel;
