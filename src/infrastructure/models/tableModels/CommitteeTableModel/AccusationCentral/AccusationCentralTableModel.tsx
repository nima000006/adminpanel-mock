import moment from "jalali-moment";

import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import CustomTooltip from "@components/Renderers/CustomTooltip/CustomTooltip";
import {
  ACCUSATION_CENTRAL_LIST_ALL_CODE,
  ACCUSATION_CENTRAL_LIST_CENTRAL_COMMITTEE_CODE,
  ACCUSATION_CENTRAL_LIST_READY_CODE,
  ACCUSATION_CENTRAL_LIST_REFERRED_CODE,
  ACCUSATION_CENTRAL_LIST_UNDERSTANDING_CODE,
} from "@pages/Committee/HandleProcessing/utils/Utils";

import {
  AccusationCentralTableModelPropsType,
  ResponsibleUnitType,
} from "./@types/@accusationCentralTableModel";
import { ACCUSATION_APPEAL_LIST_READY_CODE } from "../../../../../pages/Committee/HandleProcessing/AccusationAppeal/AccusationAppealList/@types/@accusationAppealList";
import { LimitText, dataPlaceHolder } from "../../../../helpers/utils";
import { FixedType } from "../../../modules/GeneralTypes/GeneralTypes";

const AccusationCentralTableModel = ({
  checkClickHandler,
  rejectMeetingHandler,
  allocationMeetingHandler,
  changeSessionHandler,
  type,
}: AccusationCentralTableModelPropsType) => {
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
      dataIndex: "AssociationInfractions_title",
      key: "AssociationInfractions_title",
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
      width: 200,
      render: (value: string) => {
        const colorTagGenerator =
          value === "پايين" ? "success" : value === "عادی" ? "gold" : "red";
        return <CustomTag color={colorTagGenerator}>{value}</CustomTag>;
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
      dataIndex: "AssociationPlaintiffType_title",
      key: "AssociationPlaintiffType_title",
      width: 150,
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
        return dataPlaceHolder({ data: createDate, isDate: true });
      },
    },
    {
      title: "انتظار",
      dataIndex: "createDate",
      key: "createDate",
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

    {
      title: "نوع شاکی",
      dataIndex: "AssociationPlaintiffType_title",
      key: "AssociationPlaintiffType_title",
      width: 140,
    },
    ...(type === ACCUSATION_CENTRAL_LIST_ALL_CODE
      ? [
          {
            title: "وضعیت",
            dataIndex: "AssociationStatusCentrulCommittee_title",
            key: "AssociationStatusCentrulCommittee_title",
            width: 100,
          },
        ]
      : []),
    ...(type === ACCUSATION_CENTRAL_LIST_REFERRED_CODE
      ? [
          {
            title: "واحد مسئول",
            dataIndex: "responsibleUnit",
            key: "responsibleUnit",
            width: 120,
            render: (_: string, record: ResponsibleUnitType) => {
              const isWarding = record?.AssociationReferral_CentralReferralToCustody
                ? "ارجاع به حراست"
                : false;
              const isEducationional =
                record?.AssociationReferral_CentralReferralToEducAssistant
                  ? "ارجاع به معاون آموزشی"
                  : false;
              const isStudent = record?.AssociationReferral_CentralReferralToStudentVice
                ? "ارجاع به معاون دانشجویی"
                : false;
              const isResearch =
                record?.AssociationReferral_CentralReferralToResearchAssistant
                  ? "ارجاع به معاون پژوهشی"
                  : false;

              return (
                <CustomTooltip
                  title={`${isWarding ? isWarding : ""} ${
                    isEducationional ? isEducationional : ""
                  } ${isStudent ? isStudent : ""} ${isResearch ? isResearch : ""}`}
                >
                  <p>
                    {LimitText(
                      `${isWarding ? isWarding : ""} ${
                        isEducationional ? isEducationional : ""
                      } ${isStudent ? isStudent : ""} ${isResearch ? isResearch : ""}`,
                      10
                    )}
                  </p>
                </CustomTooltip>
              );
            },
          },
        ]
      : []),
    ...(type === ACCUSATION_CENTRAL_LIST_UNDERSTANDING_CODE
      ? [
          {
            title: "نوع تفهیم",
            dataIndex: "AssociationInfractionType_title",
            key: "AssociationInfractionType_title",
            width: 100,
          },
        ]
      : []),
    {
      title: "آخرین تغییر وضعیت",
      dataIndex: "dateLastStatusChange",
      key: "dateLastStatusChange",
      width: 140,
      render: (value: string) => {
        return dataPlaceHolder({ data: value, isDate: true });
      },
    },
    ...(type === ACCUSATION_CENTRAL_LIST_CENTRAL_COMMITTEE_CODE
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
            dataIndex: "AssociationCentrulMeeting_meetingNumbe",
            key: "AssociationCentrulMeeting_meetingNumbe",
            width: 160,
          },
        ]
      : []),

    {
      title: "",
      dataIndex: "id",
      key: "id",
      fixed: "right" as FixedType | undefined,
      ...(type === ACCUSATION_CENTRAL_LIST_READY_CODE ||
      type === ACCUSATION_CENTRAL_LIST_CENTRAL_COMMITTEE_CODE
        ? { width: 270 }
        : { width: 100 }),
      className: "tables-sticky-column-left",
      render: (value: number) => {
        return type === ACCUSATION_APPEAL_LIST_READY_CODE ? (
          <div className="btn-wrapper">
            <span onClick={() => checkClickHandler(value)} className="check-btn">
              بررسی
            </span>
            <span onClick={() => allocationMeetingHandler(value)} className="check-btn">
              تخصیص جلسه
            </span>
          </div>
        ) : type === ACCUSATION_CENTRAL_LIST_CENTRAL_COMMITTEE_CODE ? (
          <div className="btn-wrapper">
            <span onClick={() => checkClickHandler(value)} className="check-btn">
              بررسی
            </span>
            <span onClick={() => changeSessionHandler(value)} className="check-btn">
              تغییر جلسه
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

export default AccusationCentralTableModel;
