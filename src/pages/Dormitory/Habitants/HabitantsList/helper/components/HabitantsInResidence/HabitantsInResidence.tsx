import { Dropdown } from "antd";
import { AiOutlineFilter, AiOutlineLogout } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";

import { CustomButton } from "@components/CustomInputs";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import { ExcelCodes } from "@infra/config/excel-codes";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import HabitantsInResidenceTableModel from "@pages/Dormitory/Habitants/HabitantsList/helper/components/HabitantsInResidence/helper/models/HabitantsInResidence/HabitantsInResidenceTableModel";

const dataSource = [
  {
    id: 1,
    remainDays: 15,
    requestNumber: "12",
    firstName: "",
    lastName: "",
    username: "",
    mobile: "",
    pendingPayment: "1",
    paid: "2",
    paymentDueDate: "0",
    branch: "",
    residenceName: "",
    assigendAccommodation: "",
    startDate: "",
    endDate: "",
  },
];

const HabitantsInResidence = () => {
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
          <div className="flex flex-wrap gap-2">
            <CustomButton icon={<AiOutlineLogout />} danger disabled>
              ثبت گروهی تخلیه اسکان
            </CustomButton>
            <Dropdown trigger={["click"]} disabled>
              <CustomButton disabled icon={<IoIosArrowDown />} iconPlacement="end">
                خروجی
              </CustomButton>
            </Dropdown>
          </div>
        }
      />

      <CustomTable
        dataSource={dataSource}
        rowKey="id"
        // loading={isResearchChancellorListLoading || isResearchChancellorListCountLoading}
        columns={HabitantsInResidenceTableModel()}
        pagination={paginationConfig}
        // key={`table-${url?.pageSize || "8"} `}
        draggableColumns
        draggableId={ExcelCodes.DORMITORY_HABITANTS_IN_RESIDENCE_LIST}
      />
    </div>
  );
};

export default HabitantsInResidence;
