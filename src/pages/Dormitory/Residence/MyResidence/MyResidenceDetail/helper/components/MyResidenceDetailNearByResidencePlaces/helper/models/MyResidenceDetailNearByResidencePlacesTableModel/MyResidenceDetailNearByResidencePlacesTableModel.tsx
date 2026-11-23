import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import { GetMyResidenceDataNearbyPlace } from "@pages/Dormitory/Residence/MyResidence/MyResidenceDetail/@types/@myResidenceDetail";

const MyResidenceDetailNearByResidencePlacesTableModel =
  (): CustomColumnType<GetMyResidenceDataNearbyPlace>[] => {
    return [
      {
        title: "عنوان",
        dataIndex: "title",
        key: "title",
        width: 100,
      },
      {
        title: "توضیحات",
        dataIndex: "description",
        key: "description",
      },
    ];
  };
export default MyResidenceDetailNearByResidencePlacesTableModel;
