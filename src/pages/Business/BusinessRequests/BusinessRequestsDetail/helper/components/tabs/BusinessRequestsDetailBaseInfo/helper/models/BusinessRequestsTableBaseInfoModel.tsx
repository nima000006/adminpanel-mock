import CustomTag from "@components/Renderers/CustomTag/CustomTag";

const BusinessRequestsTableBaseInfoModel = () => {
  return [
    {
      title: "نوع اطلاعات پایه",
      dataIndex: "baseInfoType",
      key: "baseInfoType",
      width: 825,
    },
    {
      title: "تعداد",
      dataIndex: "count",
      key: "count",
      width: 80,
    },
    {
      title: "وضعیت",
      dataIndex: "status",
      key: "status",
      width: 109,
      render: () => {
        return (
          <CustomTag className="custom-tag-business-type" color={"red"}>
            تعریف نشده
          </CustomTag>
        );
      },
    },
  ];
};
export default BusinessRequestsTableBaseInfoModel;
