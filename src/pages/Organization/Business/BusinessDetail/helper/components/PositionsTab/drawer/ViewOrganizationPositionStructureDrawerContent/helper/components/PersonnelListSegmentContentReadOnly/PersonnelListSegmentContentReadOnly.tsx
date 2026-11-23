import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { PersonnelListSegmentContentReadOnlyType } from "@pages/Organization/Business/BusinessDetail/helper/components/PositionsTab/drawer/ViewOrganizationPositionStructureDrawerContent/helper/components/PersonnelListSegmentContentReadOnly/@types/@personnelListSegmentContentReadOnly";

import PersonnelListSegmentContentTableModel from "../../../../ViewOrganizationPositionInfoDrawerContent/helper/model/PersonnelListSegmentContentTableModel";

const personnelListMockData: PersonnelListSegmentContentReadOnlyType[] = [
  {
    firstName: "شیرین",
    lastName: "نجفی",
    position: "مدیر",
    nationalCode: "123456789",
    personnelCode: "12",
    startDate: "1403 / 10 / 10",
    endDate: "1403 / 10 / 10",
    createDate: "1403 / 10 / 10",
    lastEditDate: "1403 / 10 / 10",
    creator: "شیرین نجفی",
  },
];

const PersonnelListSegmentContentReadOnly = () => {
  return (
    <div>
      <CustomDivider text={"لیست پرسنل دارای این سمت"} />
      <CustomTable<PersonnelListSegmentContentReadOnlyType>
        dataSource={personnelListMockData}
        columns={PersonnelListSegmentContentTableModel()}
        pagination={paginationConfig}
        rowKey="id"
        //   loading={}
        {...TABLE_PROPS(personnelListMockData?.length)}
      />
    </div>
  );
};
export default PersonnelListSegmentContentReadOnly;
