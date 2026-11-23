import moment from "jalali-moment";

import { AdditionalResearchWardingList } from "../../../../../../components/Committee/Committee/AdditionalResearch/ResearchChancellor/ResearchChancellorListTableAccused/@types/@researchChancellorListTableAccused";
import { COMMITTEE_ADDITIONAL_EDUCATION_CHANCELLOR_LIST_REGISTERED } from "../../../../../../pages/Committee/AdditionalResearch/EducationChancellor/EducationChancellorListTabs/@types/@educationChancellorListTabs";
import { dataPlaceHolder } from "../../../../../helpers/utils";
import { FixedType } from "../../../../modules/GeneralTypes/GeneralTypes";
export const EducationListReporterModel = ({
  checkClickHandler,
  type,
}: {
  checkClickHandler: (value: number, isAccusation: boolean | null) => void;
  type?: number;
}) => {
  return [
    {
      title: "شماره گزارشگر",
      dataIndex: "userId",
      key: "userId",
      width: 100,
    },
    {
      title: "نام گزارشگر",
      dataIndex: "reporterName",
      key: "reporterName",
      width: 130,
    },
    {
      title: "نام خانوادگی گزارشگر",
      dataIndex: "reporterFamily",
      key: "reporterFamily",
      width: 150,
    },
    {
      title: "سمت گزارشگر",
      dataIndex: "",
      key: "",
      width: 130,
    },
    {
      title: "دانشگاه گزارشگر",
      dataIndex: "reporterUni",
      key: "reporterUni",
      width: 120,
    },
    {
      title: "موضوع گزارش",
      dataIndex: "eventReport",
      key: "eventReport",
      width: 100,
    },
    {
      title: "نوع گزارش",
      dataIndex: "AssociationRequestType_title",
      key: "AssociationRequestType_title",
      width: 120,
    },
    {
      title: "شماره گزارش",
      dataIndex: "id",
      key: "id",
      width: 150,
    },
    {
      title: "تاریخ ثبت",
      dataIndex: "createDate",
      key: "createDate",
      width: 150,
      render: (createDate: string) => {
        return dataPlaceHolder({
          data: createDate,
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
    ...(type === COMMITTEE_ADDITIONAL_EDUCATION_CHANCELLOR_LIST_REGISTERED
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
