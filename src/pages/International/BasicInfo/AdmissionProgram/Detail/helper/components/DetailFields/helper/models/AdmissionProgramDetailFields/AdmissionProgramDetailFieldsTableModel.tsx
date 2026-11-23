import CustomTag from "@components/Renderers/CustomTag/CustomTag";

const AdmissionProgramDetailFieldsTableModel = () => {
  return [
    {
      title: "رشته تحصیلی",
      dataIndex: "fieldTitle",
      key: "fieldTitle",
      width: 150,
    },
    {
      title: "گروه رشته",
      dataIndex: "studyGroupTitle",
      key: "studyGroupTitle",
      width: 150,
      render: (value: string) => {
        return (
          <CustomTag className="w-fit" color="green">
            {value}
          </CustomTag>
        );
      },
    },
    {
      title: "مقطع",
      dataIndex: "degreeTitle",
      key: "degreeTitle",
      width: 150,
      render: (value: string) => {
        return <CustomTag className="w-fit">{value}</CustomTag>;
      },
    },
    {
      title: "واحد",
      dataIndex: "branchTitle",
      key: "branchTitle",
      width: 150,
    },
  ];
};

export default AdmissionProgramDetailFieldsTableModel;
