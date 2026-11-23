import CustomTag from "@components/Renderers/CustomTag/CustomTag";

export const FloorCreateFacilityListTableModel = () => {
  return [
    {
      title: "عنوان",
      dataIndex: "title",
      key: "title",
      width: 100,
    },
    {
      title: "نوع امکانات",
      dataIndex: "AssociationCategoryFacilityType_title",
      key: "AssociationCategoryFacilityType_title",
      width: 100,
      render: (value: string) => {
        return <CustomTag className="table-tags">{value}</CustomTag>;
      },
    },
  ];
};
