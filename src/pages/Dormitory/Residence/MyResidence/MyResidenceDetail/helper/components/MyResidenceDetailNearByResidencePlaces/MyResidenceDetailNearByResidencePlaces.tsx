import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import { ExcelCodes } from "@infra/config/excel-codes";
import {
  GetMyResidenceDataNearbyPlace,
  GetMyResidenceDataResponse,
} from "@pages/Dormitory/Residence/MyResidence/MyResidenceDetail/@types/@myResidenceDetail";
import MyResidenceDetailNearByResidencePlacesTableModel from "@pages/Dormitory/Residence/MyResidence/MyResidenceDetail/helper/components/MyResidenceDetailNearByResidencePlaces/helper/models/MyResidenceDetailNearByResidencePlacesTableModel/MyResidenceDetailNearByResidencePlacesTableModel";

const MyResidenceDetailNearByResidencePlaces = ({
  dataSource,
}: {
  dataSource: GetMyResidenceDataResponse | undefined;
}) => {
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <CustomTable<GetMyResidenceDataNearbyPlace>
      dataSource={dataSource?.nearbyPlaces ?? []}
      rowKey="uuid"
      loading={false}
      columns={MyResidenceDetailNearByResidencePlacesTableModel()}
      pagination={false}
      draggableColumns
      draggableId={ExcelCodes.DORMITORY_MY_RESIDENCE_DETAIL_NEAR_BY_RESIDENCE_PLACES}
    />
  );
};
export default MyResidenceDetailNearByResidencePlaces;
