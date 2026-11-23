import moment from "jalali-moment";

import { ConsultingCenterSessionList } from "@pages/Committee/ConsultingCenter/ConsultingCenterSessionList/helper/components/ConsultingCenterSessionListTable/@types/@ConsultingCenterSessionListTable";

import {
  COMMITTEE_CONSULTING_CENTER_SESSION_LIST_ALL,
  COMMITTEE_CONSULTING_CENTER_SESSION_LIST_AWAITED_MEETING,
  COMMITTEE_CONSULTING_CENTER_SESSION_LIST_CANCELED,
} from "../../../../../../pages/Committee/ConsultingCenter/ConsultingCenterSessionList/ConsultingCenterSessionListTabsUtil";
import { FixedType } from "../../../../modules/GeneralTypes/GeneralTypes";

export const ConsultingCenterSessionListModel = ({
  cancelSessionHandler,
  type,
}: {
  cancelSessionHandler: (value: number) => void;
  type?: number;
}) => {
  return [
    {
      title: "شماره جلسه",
      dataIndex: "id",
      key: "id",
      width: 120,
      searchable: true,
    },
    {
      title: "نوع جلسه",
      dataIndex: "AssociationMeetingType_title",
      key: "AssociationMeetingType_title",
      width: 130,
      searchable: true,
    },
    {
      title: "تاریخ جلسه",
      dataIndex: "meetingDate",
      key: "meetingDate",
      width: 120,
      render: (sessionDate: string) => {
        return moment(sessionDate ?? new Date())
          .locale("fa")
          .format("YYYY/M/D");
      },
    },
    {
      title: "بازه زمانی",
      dataIndex: "meetingStartTime",
      key: "meetingStartTime",
      width: 130,
      render: (_: string, records: ConsultingCenterSessionList) => {
        return (
          <div className="time-wrapper">
            <span className="absent-btn">{records?.meetingStartTime}</span>
            <span className="absent-btn">الی</span>
            <span className="absent-btn">{records?.meetingEndTime}</span>
          </div>
        );
      },
    },
    {
      title: "مکان جلسه",
      dataIndex: "AssociationMeetingPlace_title",
      key: "AssociationMeetingPlace_title",
      width: 150,
      searchable: true,
    },
    ...(type === COMMITTEE_CONSULTING_CENTER_SESSION_LIST_CANCELED
      ? [
          {
            title: "علت لغو",
            dataIndex: "reasonCanceling",
            key: "reasonCanceling",
            width: 100,
          },
        ]
      : []),
    {
      title: "مشاور",
      dataIndex: "AssociationConsultant_title",
      key: "AssociationConsultant_title",
      width: 100,
      searchable: true,
    },

    ...(type === COMMITTEE_CONSULTING_CENTER_SESSION_LIST_ALL
      ? [
          {
            title: "وضعیت",
            dataIndex: "AssociationMeetingStatus_title",
            key: "AssociationMeetingStatus_title",
            width: 150,
          },
        ]
      : []),

    ...(type === COMMITTEE_CONSULTING_CENTER_SESSION_LIST_AWAITED_MEETING
      ? [
          {
            title: "",
            dataIndex: "id",
            key: "id",
            fixed: "right" as FixedType,
            className: "tables-sticky-column-left",
            width: 75,
            render: (value: number) => {
              return (
                <span
                  onClick={() => cancelSessionHandler(value)}
                  className="cancel-session-btn"
                >
                  لغو جلسه
                </span>
              );
            },
          },
        ]
      : []),
  ];
};
