import moment from "jalali-moment";

import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import CustomTooltip from "@components/Renderers/CustomTooltip/CustomTooltip";
import { CommitteeReport } from "@pages/Committee/HandleProcessing/Reports/CommitteeReport/helper/components/CommitteeReport/@types/@committeeReportTable";

import { COMMITTEE_ALL_REPORTS } from "../../../../../pages/Committee/HandleProcessing/Reports/CommitteeReport/@types/@typesCommitteeReport";
import { LimitText } from "../../../../helpers/utils";
import { FixedType } from "../../../modules/GeneralTypes/GeneralTypes";

export const CommitteeReportModel = ({
  checkClickHandler,
  type,
}: {
  checkClickHandler: (value: string) => void;
  type?: string;
}) => {
  return [
    {
      title: "شماره گزارشگر",
      dataIndex: "userId",
      key: "userId",
      width: 130,
    },
    {
      title: "تعداد گزارشات دوره جاری",
      dataIndex: "countReport",
      key: "countReport",
      width: 200,
      render: (_: string, records: CommitteeReport) => {
        const colorTagGenerator =
          records?.countReport <= 2
            ? "success"
            : records?.countReport > 2 && records?.countReport <= 5
              ? "orange"
              : "red";
        return <CustomTag color={colorTagGenerator}>{records?.countReport}</CustomTag>;
      },
    },
    {
      title: "نام گزارشگر",
      dataIndex: "reporterName",
      key: "reporterName",
      width: 100,
    },
    {
      title: "نام خانوادگی گزارشگر",
      dataIndex: "reporterFamily",
      key: "reporterFamily",
      width: 180,
    },
    {
      title: "سمت گزارشگر",
      dataIndex: "AssociationUser_post",
      key: "AssociationUser_post",
      width: 200,
    },
    {
      title: "دانشگاه گزارشگر",
      dataIndex: "AssociationUser_AssociationUni_title",
      key: "AssociationUser_AssociationUni_title",
      width: 130,
    },
    {
      title: "موضوع",
      dataIndex: "eventReport",
      key: "eventReport",
      width: 100,
      render: (subject: string) => {
        return (
          <CustomTooltip title={subject}>
            <p>{LimitText(subject, 10)}</p>
          </CustomTooltip>
        );
      },
    },
    {
      title: "شماره گزارش",
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
      title: "نوع",
      dataIndex: "AssociationRequestType_title",
      key: "AssociationRequestType_title",
      width: 140,
    },
    ...(type === COMMITTEE_ALL_REPORTS
      ? [
          {
            title: "وضعیت",
            dataIndex: "AssociationViolationStatus_title",
            key: "AssociationViolationStatus_title",
            width: 100,
          },
        ]
      : []),
    {
      title: "",
      dataIndex: "id",
      key: "id",
      fixed: "right" as FixedType | undefined,
      width: 100,
      className: "tables-sticky-column-left",
      render: (value: string) => {
        return (
          <span onClick={() => checkClickHandler(value)} className="check-btn">
            بررسی
          </span>
        );
      },
    },
  ];
};
