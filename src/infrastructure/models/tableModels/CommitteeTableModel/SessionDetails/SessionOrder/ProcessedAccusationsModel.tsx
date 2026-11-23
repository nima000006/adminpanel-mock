import { FixedType } from "../../../../modules/GeneralTypes/GeneralTypes";

type Records = {
  nationalCode: string;
  AssociationTblPriiority_title: string;
  primaryProvider: string;
  studentNumber: string;
  studentPhoneNumber: string;
  studentName: string;
  AssociationInfractions_title: string;
  AssociationInfractionType_title: string;
  AssociationPlaintiffType_title: string;
  id: number;
  meeting: number;
  studentFamily: string;
  createDate: string;
  reviewPeriod: string;
  preliminaryProcessing?: boolean | null;
  AssociationSessionProblems_confirmationVerdict?: boolean | null;
};

export const ProcessedAccusationsModel = ({
  checkClickHandler,
  confirmationClickHandler,
  reVotingClickHandler,
}: {
  checkClickHandler: (value: string) => void;
  confirmationClickHandler: (value: string) => void;
  reVotingClickHandler: (value: string) => void;
}) => {
  return [
    {
      title: "نوع",
      dataIndex: "AssociationInfractionType_title",
      key: "AssociationInfractionType_title",
      width: 100,
    },
    {
      title: "اتهام",
      dataIndex: "AssociationInfractions_title",
      key: "AssociationInfractions_title",
      width: 300,
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
    // todo:[Atefeh]: uncomment when property got ready
    // {
    //   title: "سمت متهم",
    //   dataIndex: "degree",
    //   key: "degree",
    //   width: 130,
    // },
    {
      title: "تخمین زمان",
      dataIndex: "reviewPeriod",
      key: "reviewPeriod",
      width: 100,
    },
    {
      title: "ارائه دهنده",
      dataIndex: "primaryProvider",
      key: "primaryProvider",
      width: 100,
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      fixed: "right" as FixedType,
      width: 270,
      className: "tables-sticky-column-left",
      render: (value: string, records: Records) => {
        return (
          <div className="btn-wrapper">
            <span onClick={() => checkClickHandler(value)} className="check-btn">
              رسیدگی
            </span>
            <span onClick={() => reVotingClickHandler(value)} className="reject-btn">
              رای گیری مجدد
            </span>
            {!records?.AssociationSessionProblems_confirmationVerdict && (
              <span onClick={() => confirmationClickHandler(value)} className="check-btn">
                تایید حکم
              </span>
            )}
          </div>
        );
      },
    },
  ];
};
