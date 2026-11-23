import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";

import { BuildingDetailBuildingFacilitiesProps } from "./@types/@buildingDetailBuildingFacilities";
import BuildingDetailBuildingFacilitiesTableModel from "./helper/models/BuildingDetailBuildingFacilities/BuildingDetailBuildingFacilitiesTableModel";

const BuildingDetailBuildingFacilities = ({
  data,
  loading,
}: BuildingDetailBuildingFacilitiesProps) => {
  return (
    <div>
      <CustomDivider text="امکانات ساختمان" />
      <CustomTable
        dataSource={data}
        rowKey="id"
        loading={loading}
        columns={BuildingDetailBuildingFacilitiesTableModel()}
        pagination={paginationConfig}
        className="residence-building-facility-detail-table"
        {...TABLE_PROPS(data?.length || 0)}
      />
    </div>
  );
};

export default BuildingDetailBuildingFacilities;
