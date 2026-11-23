import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { GetMyResidenceDataNearbyPlace } from "@pages/Dormitory/Residence/MyResidence/MyResidenceDetail/@types/@myResidenceDetail";

const MyResidenceInfoSegmentPlacesTableModel =
  (): CustomColumnType<GetMyResidenceDataNearbyPlace>[] => {
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

export default MyResidenceInfoSegmentPlacesTableModel;
