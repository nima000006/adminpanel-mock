import moment from "jalali-moment";

import CustomTooltip from "@components/Renderers/CustomTooltip/CustomTooltip";

import {
  COMMITTEE_CONSULTING_CENTER_DOCUMENTS_ALL,
  COMMITTEE_CONSULTING_CENTER_DOCUMENTS_APPOINTMENT,
  COMMITTEE_CONSULTING_CENTER_DOCUMENTS_FINISHED,
  COMMITTEE_CONSULTING_CENTER_DOCUMENTS_MEETING,
} from "../../../../../../pages/Committee/ConsultingCenter/ConsultingCenterDocuments/ConsultingCenterDocumentsTabsUtil";
import { LimitText } from "../../../../../helpers/utils";

export const DocumentsModel = ({
  checkClickHandler,
  allocationMeetingHandler,
  cancelSessionHandler,
  changeSessionHandler,
  type,
}: {
  checkClickHandler: (value: number) => void;
  allocationMeetingHandler: (value: number) => void;
  cancelSessionHandler: (value: number) => void;
  changeSessionHandler: (value: number) => void;
  type?: number;
}) => {
  return [
    {
      title: "نام",
      dataIndex: "studentName",
      key: "studentName",
      width: 100,
      searchable: true,
    },
    {
      title: "نام خانوادگی",
      dataIndex: "studentFamily",
      key: "studentFamily",
      width: 130,
      searchable: true,
    },
    {
      title: "سمت",
      dataIndex: "position",
      key: "position",
      width: 130,
    },
    {
      title: "کد ملی",
      dataIndex: "nationalCode",
      key: "nationalCode",
      width: 130,
      searchable: true,
    },
    {
      title: "شماره دانشجویی",
      dataIndex: "studentNumber",
      key: "studentNumber",
      width: 150,
      searchable: true,
    },
    {
      title: "دانشگاه",
      dataIndex: "uni",
      key: "uni",
      width: 130,
      searchable: true,
    },
    {
      title: "توضیح",
      dataIndex: "eventReport",
      key: "eventReport",
      width: 130,
      render: (details: string) => {
        return (
          <CustomTooltip title={details}>
            <p>{LimitText(details, 10)}</p>
          </CustomTooltip>
        );
      },
    },
    {
      title: "انتظار",
      dataIndex: "sessionDate",
      key: "sessionDate",
      width: 100,
      render: (value: string) => {
        const diffTime = moment(new Date(), "YYYY/M/D").diff(
          moment(value ?? new Date()),
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

    ...(type === COMMITTEE_CONSULTING_CENTER_DOCUMENTS_ALL
      ? [
          {
            title: "وضعیت",
            dataIndex: "AssociationStatusCounselingSession_title",
            key: "AssociationStatusCounselingSession_title",
            width: 150,
          },
        ]
      : []),

    ...(type === COMMITTEE_CONSULTING_CENTER_DOCUMENTS_MEETING ||
    type === COMMITTEE_CONSULTING_CENTER_DOCUMENTS_FINISHED
      ? [
          {
            title: "تاریخ جلسه",
            dataIndex: "sessionDate",
            key: "sessionDate",
            width: 100,
            render: (sessionDate: string) => {
              return moment(sessionDate ?? new Date())
                .locale("fa")
                .format("YYYY/M/D");
            },
          },
          {
            title: "مشاور",
            dataIndex: "consultant",
            key: "consultant",
            width: 100,
          },
        ]
      : []),

    {
      title: "",
      dataIndex: "id",
      key: "id",
      fixed: "right" as any,
      className: "tables-sticky-column-left",
      ...(type === COMMITTEE_CONSULTING_CENTER_DOCUMENTS_ALL ||
      type === COMMITTEE_CONSULTING_CENTER_DOCUMENTS_FINISHED
        ? { width: 75 }
        : type === COMMITTEE_CONSULTING_CENTER_DOCUMENTS_APPOINTMENT
          ? { width: 150 }
          : { width: 225 }),

      render: (value: number) => {
        return type === COMMITTEE_CONSULTING_CENTER_DOCUMENTS_APPOINTMENT ? (
          <div className="btn-wrapper">
            <span onClick={() => checkClickHandler(value)} className="check-btn">
              بررسی
            </span>
            <span onClick={() => allocationMeetingHandler(value)} className="check-btn">
              تخصیص جلسه
            </span>
          </div>
        ) : type === COMMITTEE_CONSULTING_CENTER_DOCUMENTS_MEETING ? (
          <div className="btn-wrapper">
            <span onClick={() => checkClickHandler(value)} className="check-btn">
              بررسی
            </span>
            <span
              onClick={() => cancelSessionHandler(value)}
              className="cancel-session-btn"
            >
              لغو جلسه
            </span>
            <span onClick={() => changeSessionHandler(value)} className="change-time-btn">
              تغییر جلسه
            </span>
          </div>
        ) : (
          <span onClick={() => checkClickHandler(value)} className="check-btn">
            بررسی
          </span>
        );
      },
    },
  ];
};
