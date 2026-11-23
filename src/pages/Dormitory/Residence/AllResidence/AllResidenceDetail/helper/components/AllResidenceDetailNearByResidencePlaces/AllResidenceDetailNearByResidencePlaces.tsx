import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import { ExcelCodes } from "@infra/config/excel-codes";
import {
  GetResidenceDataNearbyPlace,
  GetResidenceDataResponse,
} from "@pages/Dormitory/Residence/ActiveResidence/ActiveResidenceDetail/helper/components/ActiveResidenceBuildingList/helper/drawer/ModifyBuildingDrawerContent/@types/@modifyBuildingDrawerContentTypes";
import AllResidenceDetailNearByResidencePlacesTableModel from "@pages/Dormitory/Residence/AllResidence/AllResidenceDetail/helper/components/AllResidenceDetailNearByResidencePlaces/helper/models/AllResidenceDetailNearByResidencePlacesTableModel/AllResidenceDetailNearByResidencePlacesTableModel";

const AllResidenceDetailNearByResidencePlaces = ({
  dataSource,
}: {
  dataSource: GetResidenceDataResponse | undefined;
}) => {
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <CustomTable<GetResidenceDataNearbyPlace>
      dataSource={dataSource?.nearbyPlaces ?? []}
      rowKey="uuid"
      loading={false}
      columns={AllResidenceDetailNearByResidencePlacesTableModel()}
      pagination={false}
      draggableColumns
      draggableId={ExcelCodes.DORMITORY_ALL_RESIDENCE_DETAIL_NEAR_BY_RESIDENCE_PLACES}
    />
  );
};
export default AllResidenceDetailNearByResidencePlaces;
