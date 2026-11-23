import { PiCheck, PiFolder } from "react-icons/pi";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import SamimServiceTag from "@components/Renderers/SamimServiceTag/SamimServiceTag";
import { GetServerColumnSearchProps } from "@infra/helpers/TableHelpers/TableServerSideSearchable/TableServerSideSearchable";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import {
  IdTitleName,
  TicketingViewStatusNameType,
} from "@pages/Ticketing/_shared/@ticketingTypes";
import { priorityMap } from "@pages/Ticketing/_shared/utils/utils";
import { TicketingAgentAssignedToMeAnsweredPriority } from "@pages/Ticketing/Agent/AgentTicketList/helper/components/AgentTicketAssignedToList/helper/components/AgentTicketAssignedToMeAnsweredList/@types/@agentTicketAssignedToMeAnsweredList";

import { IssuesSubjectListType } from "../../../@types/@ticketingIssuesSubject";

const IssuesSubjectTableModel = (
  onEditClick?: (id: number) => void
): CustomColumnType<IssuesSubjectListType>[] => {
  return [
    {
      title: "موضوع مشکل",
      dataIndex: "title",
      key: "title",
      width: 290,
      ...GetServerColumnSearchProps({
        dataIndex: "title",
        label: "موضوع مشکل",
        type: "text",
      }),
      render: (value: string) => (
        <CustomTag className="w-fit gap-2" icon={<PiFolder />}>
          {value}
        </CustomTag>
      ),
    },
    {
      title: "اولویت",
      dataIndex: "priority",
      key: "priority",
      width: 120,
      render: (value: IdTitleName<TicketingAgentAssignedToMeAnsweredPriority>) => {
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
      title: "وضعیت نمایش",
      dataIndex: "active",
      width: 170,
      render: (value: boolean) =>
        value ? (
          <CustomTag className="w-fit" color="green">
            قابل نمایش
          </CustomTag>
        ) : (
          <CustomTag className="w-fit" color="volcano">
            عدم نمایش
          </CustomTag>
        ),
    },
    {
      title: "سرویس",
      dataIndex: "samimService",
      width: 170,
      render: (value: IdTitleName) => <SamimServiceTag service={value?.name} />,
    },
    {
      title: "تیکت داخلی ",
      dataIndex: "viewStatus",
      width: 90,
      render: (viewStatus: IdTitleName<TicketingViewStatusNameType>) => {
        if (viewStatus?.name === "ALL" || viewStatus?.name === "INTERNAL")
          return (
            <CustomTag color="green" className="w-fit">
              <PiCheck />
            </CustomTag>
          );
      },
    },
    {
      title: "تیکت کاربران ",
      dataIndex: "customerTicket",
      width: 90,
      render: (_: unknown, records: IssuesSubjectListType) => {
        if (
          records?.viewStatus?.name === "ALL" ||
          records?.viewStatus?.name === "EXTERNAL"
        )
          return (
            <CustomTag color="green" className="w-fit">
              <PiCheck />
            </CustomTag>
          );
      },
    },
    {
      title: "تاریخ ایجاد",
      dataIndex: "createDate",
      width: 110,
      ...GetServerColumnSearchProps({
        dataIndex: "createdDate",
        label: "تاریخ ایجاد",
        type: "sort",
      }),
      render: (createDate: string) =>
        dataPlaceHolder({
          data: createDate,
          isDate: true,
          customDateFormat: "YYYY/M/D",
        }),
    },
    {
      title: "آخرین اقدام کننده",
      dataIndex: "modifiedBy",
      width: 160,
      render: (modifiedBy: string) => dataPlaceHolder({ data: modifiedBy }),
    },
    {
      title: "تاریخ  آخرین اقدام",
      dataIndex: "modifiedDate",
      width: 170,
      ...GetServerColumnSearchProps({
        dataIndex: "modifiedDate",
        label: "تاریخ  آخرین اقدام",
        type: "sort",
      }),
      render: (value: string) =>
        dataPlaceHolder({
          data: value,
          isDate: true,
          customDateFormat: "HH:mm، YYYY/M/D",
        }),
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      fixed: "right" as FixedType,
      className: "tables-sticky-column-left",
      width: 75,
      render: (id: number) => (
        <CustomButton type="link" onClick={() => onEditClick?.(id)}>
          ویرایش
        </CustomButton>
      ),
    },
  ];
};
export default IssuesSubjectTableModel;
