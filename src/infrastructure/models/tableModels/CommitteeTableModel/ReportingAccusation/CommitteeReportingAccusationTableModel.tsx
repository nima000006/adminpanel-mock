import { dataPlaceHolder } from "../../../../helpers/utils";

export const CommitteeReportingAccusationTableModel = () => {
  return [
    {
      title: "اتهام",
      dataIndex: "AssociationViolationStudent_AssociationInfractions_title",
      key: "AssociationViolationStudent_AssociationInfractions_title",
      width: 250,
    },
    {
      title: "نوع شاکی",
      dataIndex: "AssociationViolationStudent_AssociationPlaintiffType_title",
      key: "AssociationViolationStudent_AssociationPlaintiffType_title",
      width: 150,
    },
    {
      title: "وضعیت",
      dataIndex: "certainty",
      key: "certainty",
      width: 100,
    },
    {
      title: "مرجع تصمیم",
      dataIndex: "AssociationCommittee_title",
      key: "AssociationCommittee_title",
      width: 100,
    },
    {
      title: "دانشگاه",
      dataIndex: "AssociationViolationStudent_uniStudent",
      key: "AssociationViolationStudent_uniStudent",
      width: 200,
    },
    {
      title: "رشته",
      dataIndex: "AssociationViolationStudent_fieldStudent",
      key: "AssociationViolationStudent_fieldStudent",
      width: 200,
    },
    {
      title: "مقطع",
      dataIndex: "AssociationViolationStudent_gradeStudent",
      key: "AssociationViolationStudent_gradeStudent",
      width: 120,
    },
    {
      title: "اعتبار",
      dataIndex: "",
      key: "",
      width: 100,
    },
    {
      title: "تاریخ ثبت",
      dataIndex: "AssociationViolationStudent_createDate",
      key: "AssociationViolationStudent_createDate",
      width: 150,
      render: (value: string) => {
        return <span>{dataPlaceHolder({ data: value, isDate: true })}</span>;
      },
    },
    {
      title: "آخرین تغییر وضعیت",
      dataIndex: "executionDate",
      key: "executionDate",
      width: 150,
    },
  ];
};
