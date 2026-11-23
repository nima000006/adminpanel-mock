import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { GetResidenceDataNearbyPlace } from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceBuildingList/helper/drawer/ModifyBuildingDrawerContent/@types/@modifyBuildingDrawerContentTypes";

const ResidenceInfoSegmentPlacesTableModel =
  (): CustomColumnType<GetResidenceDataNearbyPlace>[] => {
    return [
      {
        title: "عنوان",
        dataIndex: "title",
        key: "title",
        width: 150,
        render: (value?: string) => dataPlaceHolder({ data: value }),
      },
      {
        title: "توضیحات",
        dataIndex: "description",
        key: "description",
        render: (value?: string) => dataPlaceHolder({ data: value }),
      },
    ];
  };

export default ResidenceInfoSegmentPlacesTableModel;
