import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { PersonnelListSegmentContentDataType } from "@pages/Organization/Business/BusinessDetail/helper/components/PositionsTab/drawer/ViewOrganizationPositionInfoDrawerContent/helper/components/PersonnelListSegmentContent/@types/@personnelListSegmentContent";

import PersonnelListSegmentContentTableModel from "../../model/PersonnelListSegmentContentTableModel";

const personnelListMockData: PersonnelListSegmentContentDataType[] = [
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

const PersonnelListSegmentContent = () => {
  return (
    <div>
      <CustomDivider text={"لیست پرسنل دارای این سمت"} />
      <CustomTable<PersonnelListSegmentContentDataType>
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
export default PersonnelListSegmentContent;
