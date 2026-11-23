import moment from "jalali-moment";

import { AccusationList } from "@components/Committee/HandleProcessing/Accusations/AccusationsListTable/@types/@accusationsListTable";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import CustomTooltip from "@components/Renderers/CustomTooltip/CustomTooltip";

import {
  ACCUSATION_LIST_ADDITIONAL_RESEARCH,
  ACCUSATION_LIST_ALL,
  ACCUSATION_LIST_PRIMARY_COMMITTEE,
  ACCUSATION_LIST_READY_MEETING,
  ACCUSATION_LIST_UNDERSTANDING,
} from "../../../../../pages/Committee/HandleProcessing/Accusations/AccusationsList/@types/@typesAccusationsList";
import { dataPlaceHolder, LimitText } from "../../../../helpers/utils";

export const AccusationsListModel = ({
  checkClickHandler,
  rejectMeetingHandler,
  allocationMeetingHandler,
  type,
}: {
  checkClickHandler: (value: number) => void;
  rejectMeetingHandler: (value: number) => void;
  allocationMeetingHandler: (value: number) => void;
  type?: string;
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
      dataIndex: "AssociationInfractions_title",
      key: "AssociationInfractions_title",
      width: 300,
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
      width: 100,
      render: (_: string, records: AccusationList) => {
        const colorTagGenerator =
          records?.AssociationTblPriiority_title === "پایین"
            ? "success"
            : records?.AssociationTblPriiority_title === "عادی"
              ? "orange"
              : records?.AssociationTblPriiority_title === "بالا"
                ? "red"
                : "";
        return (
          <CustomTag color={colorTagGenerator}>
            {records?.AssociationTblPriiority_title}
          </CustomTag>
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
      title: "تاریخ ثبت",
      dataIndex: "createDate",
      key: "createDate",
      width: 100,
      render: (createDate: string) => {
        return moment(createDate ?? new Date())
          .locale("fa")
          .format("YYYY/M/D");
      },
    },
    {
      title: "انتظار",
      dataIndex: "createDate",
      key: "createDate",
      width: 100,
      render: (_: string, record: any) => {
        const diffTime = moment(new Date(), "YYYY/M/D").diff(
          moment(record?.registerDate ?? new Date()),
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

    {
      title: "نوع شاکی",
      dataIndex: "AssociationPlaintiffType_title",
      key: "AssociationPlaintiffType_title",
      width: 140,
    },
    ...(type === ACCUSATION_LIST_ALL
      ? [
          {
            title: "وضعیت",
            dataIndex: "AssociationViolationStatus_title",
            key: "AssociationViolationStatus_title",
            width: 100,
          },
        ]
      : []),
    ...(type === ACCUSATION_LIST_ADDITIONAL_RESEARCH
      ? [
          {
            title: "واحد مسئول",
            dataIndex: "responsibleUnit",
            key: "responsibleUnit",
            width: 120,
            render: (details: string) => {
              return (
                <CustomTooltip title={details}>
                  <p>{LimitText(details, 10)}</p>
                </CustomTooltip>
              );
            },
          },
        ]
      : []),
    ...(type === ACCUSATION_LIST_UNDERSTANDING
      ? [
          {
            title: "نوع تفهیم",
            dataIndex: "understanding",
            key: "understanding",
            width: 100,
          },
        ]
      : []),
    {
      title: "آخرین تغییر وضعیت",
      dataIndex: "dateLastStatusChange",
      key: "dateLastStatusChange",
      width: 140,
      render: (dateLastStatusChange: string) => {
        return dataPlaceHolder({
          data: dateLastStatusChange,
          isDate: true,
          customDateFormat: "HH:mm - YYYY/M/D",
        });
      },
    },
    ...(type === ACCUSATION_LIST_PRIMARY_COMMITTEE
      ? [
          {
            title: "تاریخ و ساعت جلسه",
            dataIndex: "meetingDate",
            key: "meetingDate",
            width: 160,
            render: (registerDate: string) => {
              return moment(registerDate ?? new Date())
                .locale("fa")
                .format("HH:mm - YYYY/M/D");
            },
          },
          {
            title: "شماره جلسه",
            dataIndex: "meetingNum",
            key: "meetingNum",
            width: 160,
          },
        ]
      : []),

    {
      title: "",
      dataIndex: "id",
      key: "id",
      fixed: "right" as any,
      ...(type === ACCUSATION_LIST_READY_MEETING
        ? { width: 200 }
        : type === ACCUSATION_LIST_PRIMARY_COMMITTEE
          ? { width: 270 }
          : { width: 100 }),
      className: "tables-sticky-column-left",
      render: (value: number) => {
        return type === ACCUSATION_LIST_READY_MEETING ? (
          <div className="btn-wrapper">
            <span onClick={() => checkClickHandler(value)} className="check-btn">
              بررسی
            </span>
            <span onClick={() => allocationMeetingHandler(value)} className="check-btn">
              تخصیص جلسه
            </span>
          </div>
        ) : type === ACCUSATION_LIST_PRIMARY_COMMITTEE ? (
          <div className="btn-wrapper">
            <span onClick={() => checkClickHandler(value)} className="check-btn">
              بررسی
            </span>
            <span onClick={() => allocationMeetingHandler(value)} className="check-btn">
              تخصیص جلسه
            </span>
            <span onClick={() => rejectMeetingHandler(value)} className="return-btn">
              عودت جلسه
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
