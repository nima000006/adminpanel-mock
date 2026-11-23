import CustomTag from "@components/Renderers/CustomTag/CustomTag";

const InternationalAdmissionCreateFieldTableModel = () => {
  return [
    { title: "رشته تحصیلی", dataIndex: "filedTitle", key: "filedTitle", width: 255 },
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
      width: 260,
      render: (value: string) => {
        return <CustomTag className="w-fit">{value}</CustomTag>;
      },
    },
    { title: "واحد", dataIndex: "branchTitle", key: "branchTitle", width: 255 },
  ];
};

export default InternationalAdmissionCreateFieldTableModel;
