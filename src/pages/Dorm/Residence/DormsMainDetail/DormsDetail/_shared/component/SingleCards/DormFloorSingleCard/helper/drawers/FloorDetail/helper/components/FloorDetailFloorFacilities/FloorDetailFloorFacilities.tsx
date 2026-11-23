import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";

import { FloorDetailFloorFacilitiesProps } from "./@types/@floorDetailFloorFacilities";
import { FloorDetailFloorFacilitiesTableModel } from "./helper/models/FloorDetailFloorFacilities/FloorDetailFloorFacilitiesTableModel";

const FloorDetailFloorFacilities = ({
  data,
  loading,
}: FloorDetailFloorFacilitiesProps) => {
  return (
    <div>
      <CustomDivider text="امکانات" />
      <CustomTable
        dataSource={data ? data : []}
        columns={FloorDetailFloorFacilitiesTableModel}
        pagination={paginationConfig}
        rowKey="id"
        loading={loading}
        className="floor-detail-floor-facilities-table-model-container"
        {...TABLE_PROPS(data?.length || 0)}
      />
    </div>
  );
};

export default FloorDetailFloorFacilities;
