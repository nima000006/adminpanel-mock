import { dataPlaceHolder } from "../../../../helpers/utils";
import { ALL, CANCELED, HELD } from "../../../../models/sessionListStatus";
import { FixedType } from "../../../modules/GeneralTypes/GeneralTypes";

type Records = {
  meetingTime: string;
  topicMeeting: string;
  AssociationPersonnel_title: string;
  lastModifiedDate: string;
  AssociationMeetingPlace_title: string;
  AssociationSessionStatus_title: string;
  meetingDate: string;
  id: number;
  meetingEndTime: string;
  uniId: number;
};

export const SessionListModel = ({
  viewClickHandler,
  addAccusationHandler,
  type,
}: {
  viewClickHandler: (value: string) => void;
  addAccusationHandler: (value: string) => void;
  type: number;
}) => {
  return [
    {
      title: "شماره جلسه",
      dataIndex: "id",
      key: "id",
      width: 130,
    },
    {
      title: "عنوان جلسه",
      dataIndex: "topicMeeting",
      key: "topicMeeting",
      width: 130,
    },
    {
      title: "تاریخ جلسه",
      dataIndex: "meetingDate",
      key: "meetingDate",
      width: 130,
      render: (registerDate: string) => {
        return dataPlaceHolder({
          data: registerDate,
          isDate: true,
          customDateFormat: "HH:mm - YYYY/M/D",
        });
      },
    },
    {
      title: "بازه زمانی",
      dataIndex: "period",
      key: "period",
      width: 200,
      render: (_: unknown, value: Records) => {
        return (
          <>
            {value?.meetingTime && value.meetingEndTime ? (
              <div className="period-wrapper">
                <span>
                  {dataPlaceHolder({
                    data: value?.meetingTime?.slice(0, 5),
                  })}
                </span>
                <span>الی</span>
                <span>
                  {dataPlaceHolder({
                    data: value.meetingEndTime?.slice(0, 5),
                  })}
                </span>
              </div>
            ) : (
              "-"
            )}
          </>
        );
      },
    },
    {
      title: "مکان جلسه",
      dataIndex: "AssociationMeetingPlace_title",
      key: "AssociationMeetingPlace_title",
      width: 150,
    },
    {
      title: "دبیر جلسه",
      dataIndex: "AssociationPersonnel_title",
      key: "AssociationPersonnel_title",
      width: 180,
    },
    {
      title: "اعضای اصلی حاضر",
      dataIndex: "membersPresent",
      key: "membersPresent",
      width: 150,
    },
    {
      title: "تعداد مدعوین",
      dataIndex: "guestsNum",
      key: "guestsNum",
      width: 150,
    },
    {
      title: "تعداد دستور جلسه",
      dataIndex: "sessionAgendasNum",
      key: "sessionAgendasNum",
      width: 150,
    },
    ...(type === ALL
      ? [
          {
            title: "وضعیت",
            dataIndex: "AssociationSessionStatus_title",
            key: "AssociationSessionStatus_title",
            width: 100,
          },
        ]
      : []),
    {
      title: "اخرین تغییر وضعیت",
      dataIndex: "lastModifiedDate",
      key: "lastModifiedDate",
      width: 150,
      render: (registerDate: string) => {
        return dataPlaceHolder({
          data: registerDate,
          isDate: true,
          customDateFormat: "HH:mm - YYYY/M/D",
        });
      },
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      fixed: "right" as FixedType,
      className: "tables-sticky-column-left",
      ...(type === HELD
        ? { width: 100 }
        : type === CANCELED
          ? { width: 100 }
          : { width: 200 }),
      render: (value: string) => {
        return type === CANCELED ? (
          <span onClick={() => viewClickHandler(value)} className="check-btn">
            مشاهده
          </span>
        ) : type === HELD ? (
          <span onClick={() => viewClickHandler(value)} className="check-btn">
            مشاهده
          </span>
        ) : (
          <div className="btn-wrapper">
            <span onClick={() => viewClickHandler(value)} className="check-btn">
              مشاهده
            </span>
            <span onClick={() => addAccusationHandler(value)} className="check-btn">
              افزودن اتهام
            </span>
          </div>
        );
      },
    },
  ];
};
