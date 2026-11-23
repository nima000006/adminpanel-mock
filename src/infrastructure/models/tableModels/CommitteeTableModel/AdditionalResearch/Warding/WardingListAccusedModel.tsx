import moment from "jalali-moment";

import { AdditionalResearchWardingList } from "../../../../../../components/Committee/Committee/AdditionalResearch/ResearchChancellor/ResearchChancellorListTableAccused/@types/@researchChancellorListTableAccused";
import {
  COMMITTEE_ADDITIONAL_RESEARCH_WARDING_LIST_ALL,
  COMMITTEE_ADDITIONAL_RESEARCH_WARDING_LIST_WAITING_CLOSED,
  COMMITTEE_ADDITIONAL_RESEARCH_WARDING_LIST_WAITING_RECEIPT,
  COMMITTEE_ADDITIONAL_RESEARCH_WARDING_LIST_WAITING_REFERRED,
} from "../../../../../../pages/Committee/AdditionalResearch/Warding/WardingListTabs/@types/@wardingListTabs";
import { dataPlaceHolder } from "../../../../../helpers/utils";
import { FixedType } from "../../../../modules/GeneralTypes/GeneralTypes";
export const WardingListAccusedModel = ({
  checkClickHandler,
  type,
}: {
  checkClickHandler: (value: number, isAccusation: boolean | null) => void;
  type?: number | string;
}) => {
  return [
    {
      title: "نام متهم",
      dataIndex: "studentName",
      key: "studentName",
      width: 120,
    },
    {
      title: "نام خانوادگی متهم",
      dataIndex: "studentFamily",
      key: "studentFamily",
      width: 130,
    },
    {
      title: "سمت",
      dataIndex: "meetingDate",
      key: "meetingDate",
      width: 120,
    },
    {
      title: "شماره دانشجویی",
      dataIndex: "studentNumber",
      key: "studentNumber",
      width: 150,
    },
    {
      title: "نوع",
      dataIndex: "charge",
      key: "charge",
      width: 120,
      render: (value: boolean) => {
        return value ? <div>اتهام</div> : <div>گزارش</div>;
      },
    },
    {
      title: "موضوع پرونده",
      dataIndex: "eventReport",
      key: "eventReport",
      width: 250,
    },
    {
      title: "شماره پرونده",
      dataIndex: "id",
      key: "id",
      width: 120,
    },

    ...(type === COMMITTEE_ADDITIONAL_RESEARCH_WARDING_LIST_ALL ||
    type === COMMITTEE_ADDITIONAL_RESEARCH_WARDING_LIST_WAITING_CLOSED
      ? [
          {
            title: "وضعیت",
            dataIndex: "AssociationSecurityStatus_title",
            key: "AssociationSecurityStatus_title",
            width: 150,
          },
        ]
      : []),
    {
      title: "زمان آخرین تغییر",
      dataIndex: "dateLastStatusChange",
      key: "dateLastStatusChange",
      width: 150,
      render: (dateLastStatusChange: string) => {
        return dataPlaceHolder({
          data: dateLastStatusChange,
          isDate: true,
          customDateFormat: "HH:mm - YYYY/M/D",
        });
      },
    },
    {
      title: "انتظار",
      dataIndex: "waiting",
      key: "waiting",
      width: 100,
      render: (_: string, record: AdditionalResearchWardingList) => {
        const diffTime = moment(new Date(), "YYYY/M/D").diff(
          moment(record?.createDate ?? new Date()),
          "days"
        );
        const colorGenerator =
          +diffTime < 3 ? "green" : +diffTime > 2 && +diffTime < 5 ? "yellow" : "red";
        return (
          <div className="waiting-time-container">
            <span className={`waiting-time ${colorGenerator}`}>{diffTime}</span>
            <span>روز</span>
          </div>
        );
      },
    },
    ...(type === COMMITTEE_ADDITIONAL_RESEARCH_WARDING_LIST_WAITING_RECEIPT
      ? [
          {
            title: "ارجاع دهنده",
            dataIndex: "referrer",
            key: "referrer",
            width: 150,
          },
        ]
      : []),
    ...(type === COMMITTEE_ADDITIONAL_RESEARCH_WARDING_LIST_WAITING_REFERRED
      ? [
          {
            title: "ارجاع شده به",
            dataIndex: "AssociationSecondReferral_nameReferencedUnit",
            key: "AssociationSecondReferral_nameReferencedUnit",
            width: 150,
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
      render: (value: number, record: AdditionalResearchWardingList) => {
        return (
          <span
            onClick={() => checkClickHandler(value, record?.charge)}
            className="check-btn"
          >
            بررسی
          </span>
        );
      },
    },
  ];
};
