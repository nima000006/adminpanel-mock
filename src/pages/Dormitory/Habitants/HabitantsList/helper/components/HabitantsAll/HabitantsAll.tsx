import { Dropdown } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";

import { CustomButton } from "@components/CustomInputs";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import { ExcelCodes } from "@infra/config/excel-codes";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import HabitantsAllTableModel from "@pages/Dormitory/Habitants/HabitantsList/helper/components/HabitantsAll/helper/models/HabitantsAll/HabitantsAllTableModel";
import { HabitantsStatus } from "@pages/Dormitory/Habitants/HabitantsList/helper/utils";

const dataSource = [
  {
    id: 1,
    requestNumber: "12",
    firstName: "",
    lastName: "",
    username: "",
    mobile: "",
    status: HabitantsStatus.pendingEvacuation,
    branch: "",
    residenceName: "",
    assigendAccommodation: "",
    pendingPayment: "1",
    paid: "2",
    paymentDueDate: "0",
    startDate: "",
    endDate: "",
  },
];

const HabitantsAll = () => {
  return (
    <div className="flex flex-col gap-6">
      <ToolBox
        className="mt-4"
        rightSide={
          <div className="flex flex-wrap gap-2">
            <CustomButton
              icon={<AiOutlineFilter />}
              // onClick={() => setIsAdvanceModalOpen(true)}
              disabled
            >
              فیلتر پیشرفته
            </CustomButton>
          </div>
        }
        leftSide={
          <Dropdown trigger={["click"]} disabled>
            <CustomButton disabled icon={<IoIosArrowDown />} iconPlacement="end">
              خروجی
            </CustomButton>
          </Dropdown>
        }
      />

      <CustomTable
        dataSource={dataSource}
        rowKey="id"
        // loading={isResearchChancellorListLoading || isResearchChancellorListCountLoading}
        columns={HabitantsAllTableModel()}
        pagination={paginationConfig}
        // key={`table-${url?.pageSize || "8"} `}
        draggableColumns
        draggableId={ExcelCodes.DORMITORY_HABITANTS_ALL_LIST}
      />
    </div>
  );
};

export default HabitantsAll;
