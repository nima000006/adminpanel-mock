import SingleVerticalItem from "@components/Renderers/SingleVerticalItem/SingleVerticalItem";
import { iconMap } from "@pages/Dorm/Residence/DormsMainDetail/utils/placesIcon";

import { TitleIdType } from "../../components/ResidenceDetail/@types/residenceDetailTypes";

const PlacesAroundDormitoryTableModel = () => {
  return [
    {
      title: "آیکن",
      dataIndex: "AssociationCategoryPlaces",
      key: "AssociationCategoryPlaces",
      width: 50,
      render: (value: TitleIdType) => <span>{iconMap[value?.id] || null}</span>,
    },

    {
      title: "عنوان",
      dataIndex: "AssociationCategoryPlaces",
      key: "AssociationCategoryPlaces",
      width: 250,
      render: (value: TitleIdType) => {
        return <SingleVerticalItem label="" value={value?.title} />;
      },
    },

    {
      title: "توضیحات",
      dataIndex: "description",
      key: "description",
      width: 250,
      render: (value: string) => {
        return <SingleVerticalItem label="" value={value} />;
      },
    },
  ];
};

export default PlacesAroundDormitoryTableModel;
