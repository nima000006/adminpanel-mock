import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import { GetResidenceDataNearbyPlace } from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceBuildingList/helper/drawer/ModifyBuildingDrawerContent/@types/@modifyBuildingDrawerContentTypes";

const AllResidenceDetailNearByResidencePlacesTableModel =
  (): CustomColumnType<GetResidenceDataNearbyPlace>[] => {
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
export default AllResidenceDetailNearByResidencePlacesTableModel;
