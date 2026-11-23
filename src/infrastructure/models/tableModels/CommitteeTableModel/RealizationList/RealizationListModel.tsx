import moment from "jalali-moment";

import CustomTooltip from "@components/Renderers/CustomTooltip/CustomTooltip";

import {
  ALL_COMMITTEE_REALIZATION_COMMITTEE,
  APPOINTMENT_WAITING_COMMITTEE_REALIZATION_COMMITTEE,
  MEETING_WAITING_COMMITTEE_REALIZATION_COMMITTEE,
} from "../../../../../pages/Committee/RealizationList/CommitteeRealizationList/realizationListStatus";
import { LimitText } from "../../../../helpers/utils";

export const RealizationListModel = ({
  checkClickHandler,
  cancelSessionHandler,
  allocationSessionHandler,
  changeSessionHandler,
  type,
}: {
  checkClickHandler: (value: number) => void;
  cancelSessionHandler: (value: number) => void;
  allocationSessionHandler: (value: number) => void;
  changeSessionHandler: (value: number) => void;
  type?: number;
}) => {
  return [
    {
      title: "نوع",
      dataIndex: "AssociationInfractionType_title",
      key: "AssociationInfractionType_title",
      width: 130,
    },
    {
      title: "اتهام",
      dataIndex: "AssociationPlaintiffType_title",
      key: "AssociationPlaintiffType_title",
      width: 130,
    },
    {
      title: "جزئیات",
      dataIndex: "details",
      key: "details",
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
      title: "اولویت",
      dataIndex: "AssociationTblPriiority_title",
      key: "AssociationTblPriiority_title",
      width: 120,
      render: (priority: string) => {
        return (
          <div className="count-report-container">
            {priority === "پایین" ? (
              <div className="count-report-wrapper">
                <div className="count-report-box box-count-report-green">پایین</div>
              </div>
            ) : priority === "عادی" ? (
              <div className="count-report-wrapper">
                <div className="count-report-box box-count-report-orange">عادی</div>
              </div>
            ) : priority === "بالا" ? (
              <div className="count-report-wrapper">
                <div className="count-report-box box-count-report-red">بالا</div>
              </div>
            ) : null}
          </div>
        );
      },
    },
    {
      title: "نام متهم",
      dataIndex: "studentName",
      key: "studentName",
      width: 100,
    },
    {
      title: "نام خانوادگی متهم",
      dataIndex: "studentFamily",
      key: "studentFamily",
      width: 180,
    },
    {
      title: "شماره دانشجویی متهم",
      dataIndex: "studentNumber",
      key: "studentNumber",
      width: 150,
    },
    {
      title: "شماره ملی متهم",
      dataIndex: "nationalCode",
      key: "nationalCode",
      width: 150,
    },
    {
      title: "سمت متهم",
      dataIndex: "accusedPosition",
      key: "accusedPosition",
      width: 100,
    },
    {
      title: "شماره اتهام",
      dataIndex: "id",
      key: "id",
      width: 100,
    },
    {
      title: "انتظار",
      dataIndex: "createDate",
      key: "createDate",
      width: 100,
      render: (createDate: string) => {
        if (createDate === null) {
          return "ثبت نشده";
        } else {
          const diffTime = moment(new Date(), "YYYY/M/D").diff(
            moment(createDate ?? new Date()),
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
        }
      },
    },
    {
      title: "نوع شاکی",
      dataIndex: "AssociationPlaintiffType_title",
      key: "AssociationPlaintiffType_title",
      width: 140,
    },
    ...(type === ALL_COMMITTEE_REALIZATION_COMMITTEE
      ? [
          {
            title: "وضعیت",
            dataIndex: "AssociationUnderstandingMeetingStatus_title",
            key: "AssociationUnderstandingMeetingStatus_title",
            width: 100,
          },
        ]
      : []),
    {
      title: "آخرین تغییر وضعیت",
      dataIndex: "lastChangeStatus",
      key: "lastChangeStatus",
      width: 140,
      render: (lastChangeStatus: string) => {
        return moment(lastChangeStatus ?? new Date())
          .locale("fa")
          .format("HH:mm - YYYY/M/D");
      },
    },
    ...(type === MEETING_WAITING_COMMITTEE_REALIZATION_COMMITTEE
      ? [
          {
            title: "تاریخ و ساعت جلسه",
            dataIndex: "meetingDate",
            key: "meetingDate",
            width: 160,
            render: (meetingDate: string) => {
              return moment(meetingDate ?? new Date())
                .locale("fa")
                .format("HH:mm - YYYY/M/D");
            },
          },
        ]
      : []),
    {
      title: "",
      dataIndex: "id",
      key: "id",
      fixed: "right" as any,
      ...(type === APPOINTMENT_WAITING_COMMITTEE_REALIZATION_COMMITTEE
        ? { width: 200 }
        : type === MEETING_WAITING_COMMITTEE_REALIZATION_COMMITTEE
          ? { width: 270 }
          : { width: 100 }),
      className: "tables-sticky-column-left",
      render: (value: number) => {
        return type === APPOINTMENT_WAITING_COMMITTEE_REALIZATION_COMMITTEE ? (
          <div className="btn-wrapper">
            <span onClick={() => checkClickHandler(value)} className="check-btn">
              بررسی
            </span>
            <span onClick={() => allocationSessionHandler(value)} className="check-btn">
              تخصیص جلسه
            </span>
          </div>
        ) : type === MEETING_WAITING_COMMITTEE_REALIZATION_COMMITTEE ? (
          <div className="btn-wrapper">
            <span onClick={() => checkClickHandler(value)} className="check-btn">
              بررسی
            </span>
            <span onClick={() => cancelSessionHandler(value)} className="return-btn">
              لغو جلسه
            </span>
            <span onClick={() => changeSessionHandler(value)} className="return-btn">
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
