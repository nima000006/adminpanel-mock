import { PiFolder, PiStarFill } from "react-icons/pi";
import { Link } from "react-router";

import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import SamimServiceTag from "@components/Renderers/SamimServiceTag/SamimServiceTag";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dataPlaceHolder, makeSearchParams } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { MANAGEMENT_MY_DETAIL_PAGE_ROUTE } from "@infra/router/routes/management";
import { TICKETING_ALL_SENDING_TICKET_DETAIL_PAGE_ROUTE } from "@infra/router/routes/ticketing";
import { NEUTRAL_05 } from "@infra/VARS/globalColors/globalColors";
import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { ticketStatusMap } from "@pages/Ticketing/_shared/utils/utils";
import { InnerTicketSendingAllListAndAdvanceFilterRecordType } from "@pages/Ticketing/InnerTickets/AllInnerTickets/helper/components/AllInnerTicketsSegmentSubmittedContent/helper/components/AllInnerTicketSubmittedAllList/@types/@innerTicketSubmittedAllList";
import { InnerTicketSubmittedAnsweredRecordType } from "@pages/Ticketing/InnerTickets/AllInnerTickets/helper/components/AllInnerTicketsSegmentSubmittedContent/helper/components/AllInnerTicketSubmittedAnsweredList/@types/@allInnerTicketSubmittedAnsweredList";
import { InnerTicketSendingClosedListAndAdvanceFilterItems } from "@pages/Ticketing/InnerTickets/AllInnerTickets/helper/components/AllInnerTicketsSegmentSubmittedContent/helper/components/AllInnerTicketSubmittedClosed/@types/@innerTicketSubmittedClosedTypes";
import { InnerTicketSendingUnAssignedRecordType } from "@pages/Ticketing/InnerTickets/MyInnerTickets/helper/components/MyInnerTicketsSegmentSubmittedContent/helper/components/MyInnerTicketSubmittedNotAssignedList/@types/@innerTicketSubmittedNotAssignedList";
import { InnerTicketSendingPendingListAndAdvanceFilterItems } from "@pages/Ticketing/InnerTickets/MyInnerTickets/helper/components/MyInnerTicketsSegmentSubmittedContent/helper/components/MyInnerTicketSubmittedWaitingList/@types/@innerTicketSubmittedWaitingListTypes";

const AllInnerTicketSubmittedTableModel = (
  parentName?: string
): CustomColumnType<
  | InnerTicketSendingAllListAndAdvanceFilterRecordType
  | InnerTicketSubmittedAnsweredRecordType
  | InnerTicketSendingClosedListAndAdvanceFilterItems
  | InnerTicketSendingUnAssignedRecordType
  | InnerTicketSendingPendingListAndAdvanceFilterItems
>[] => {
  return [
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
      title: "وضعیت تیکت",
      dataIndex: "status",
      key: "status",
      width: 120,
      hidden: parentName === "submittedAll" || parentName === "closed" ? false : true,
      render: (value: IdTitleName) => {
        const statusName = value.name?.toUpperCase() as keyof typeof ticketStatusMap;

        const config = ticketStatusMap[statusName];

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
      render: (value: { id: number; title: string }) => (
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
      title: "رضایت کاربر",
      dataIndex: "rate",
      key: "rate",
      width: 150,
      hidden: parentName === "closed" ? false : true,
      ...GetServerColumnSearchProps({
        dataIndex: "ticketRating",
        label: "رضایت کاربر",
        type: "sort",
      }),
      render: (value: string) => (
        <div className="flex items-center gap-2">
          {value !== null ? (
            <>
              <PiStarFill width={24} height={24} color="gold" />
              <span>{value} از 5</span>
            </>
          ) : (
            <span className="flex items-center gap-2">
              <PiStarFill width={24} height={24} color={NEUTRAL_05} />
              <span className="body-regular">ثبت نشده</span>
            </span>
          )}
        </div>
      ),
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
      title: "تاریخ و زمان آخرین پاسخ",
      dataIndex: "lastResponseDate",
      key: "lastResponseDate",
      width: 170,
      hidden:
        parentName === "notAssigned" ||
        parentName === "closed" ||
        parentName === "submittedReplied" ||
        parentName === "waiting" ||
        parentName === "submittedAll"
          ? true
          : false,
      render: (value: string) =>
        dataPlaceHolder({
          data: value,
          isDate: true,
          customDateFormat: "HH:mm, YYYY/MM/DD ",
        }),
    },
    {
      title: "تخصیص به",
      dataIndex: "assignedToUserStaffIdName",
      key: "assignedToUserStaffIdName",
      width: 160,
      hidden: parentName === "notAssigned" ? true : false,
      render: (
        value: string,
        records:
          | InnerTicketSubmittedAnsweredRecordType
          | InnerTicketSendingPendingListAndAdvanceFilterItems
          | InnerTicketSendingUnAssignedRecordType
      ) => (
        <Link
          className="text-link"
          to={{
            pathname: MANAGEMENT_MY_DETAIL_PAGE_ROUTE,
            search: makeSearchParams({
              id: records?.assignedToUserId,
            }),
          }}
        >
          {dataPlaceHolder({ data: value })}
        </Link>
      ),
    },
    {
      title: "نوع بسته شدن",
      dataIndex: "statusType",
      key: "statusType",
      width: 120,
      hidden: parentName === "allTickets" ? false : true,
      render: (value: IdTitleName) => (
        <CustomTag
          color={
            value?.name === "USER_CLOSED"
              ? "geekblue"
              : value?.name === "AUTO_CLOSED"
                ? "green"
                : value?.name === "ADMIN_CLOSED"
                  ? "red"
                  : "default"
          }
          className="flex w-fit items-center gap-1"
        >
          {value?.name === "USER_CLOSED"
            ? "توسط شما"
            : value?.name === "AUTO_CLOSED"
              ? "سیستم"
              : value?.name === "ADMIN_CLOSED"
                ? "کارشناس تیکت"
                : "default"}
        </CustomTag>
      ),
    },
    {
      title: "بسته شده توسط",
      dataIndex: "closeBy",
      key: "closeBy",
      width: 160,
      hidden:
        parentName === "closed" ||
        parentName === "allTickets" ||
        parentName === "submittedAll"
          ? false
          : true,
      render: (
        value: string,
        records:
          | InnerTicketSubmittedAnsweredRecordType
          | InnerTicketSendingPendingListAndAdvanceFilterItems
          | InnerTicketSendingUnAssignedRecordType
      ) => (
        <Link
          className="text-link"
          to={{
            pathname: MANAGEMENT_MY_DETAIL_PAGE_ROUTE,
            search: makeSearchParams({
              id: records?.closedByUserId ? records?.closedByUserId : undefined,
            }),
          }}
        >
          {dataPlaceHolder({ data: value })}
        </Link>
      ),
    },
    {
      title: "",
      dataIndex: "uuid",
      key: "uuid",
      fixed: "right" as FixedType,
      width: 70,
      render: (value: string) => (
        <Link
          to={{
            pathname: TICKETING_ALL_SENDING_TICKET_DETAIL_PAGE_ROUTE,
            search: makeSearchParams({
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
export default AllInnerTicketSubmittedTableModel;
