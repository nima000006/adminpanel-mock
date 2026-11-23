import SingleVerticalItem from "@components/Renderers/SingleVerticalItem/SingleVerticalItem";

const ResidenceDetailAroundPlacesTableModel = () => {
  // todo[Atefeh]: the document of api in this section was not ready
  return [
    // {
    //   title: "آیکن",
    //   dataIndex: "iconName",
    //   key: "iconName",
    //   width: 50,
    //   render: (value: string) => {
    //     return (
    //       <span>
    //         {value === "metro" ? (
    //           <LeftCircleOutlined />
    //         ) : value === "mal" ? (
    //           <MenuUnfoldOutlined />
    //         ) : value === "park" ? (
    //           <QuestionOutlined />
    //         ) : null}
    //       </span>
    //     );
    //   },
    // },
    {
      title: "عنوان",
      dataIndex: "AssociationCategoryPlaces",
      key: "AssociationCategoryPlaces",
      width: 250,
      render: (value: { id: number; title: string }) => {
        return <SingleVerticalItem value={value?.title} />;
      },
    },
    {
      title: "توضیحات",
      dataIndex: "description",
      key: "description",
      width: 250,
      render: (value: string) => {
        return <SingleVerticalItem value={value} />;
      },
    },
  ];
};

export default ResidenceDetailAroundPlacesTableModel;
