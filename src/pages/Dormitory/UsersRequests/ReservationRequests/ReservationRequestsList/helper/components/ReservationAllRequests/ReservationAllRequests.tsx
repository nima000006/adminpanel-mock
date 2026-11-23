import { Dropdown } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";

import { CustomButton } from "@components/CustomInputs";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import { ExcelCodes } from "@infra/config/excel-codes";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import ReservationAllRequestsTableModel from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsList/helper/components/ReservationAllRequests/helper/models/ReservationAllRequests/ReservationAllRequestsTableModel";

const dataSource = [
  {
    id: 1,
    lastName: "",
    username: "",
    branch: "",
    mobile: "",
    residenceName: "",
    createdDate: "",
    requestNumber: "12",
    firstName: "",
    admission: "برنامه پذیرش",
    scheduleType: 1,
    reserveBase: 2,
    reserveType: {
      title: "فوری",
      id: 2,
    },
    pendingPayment: "1",
    paid: "2",
    paymentDueDate: "0",
    lastModifier: "",
    lastModifiedDate: "",
    status: 1,
  },
];

const ReservationAllRequests = () => {
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
        columns={ReservationAllRequestsTableModel()}
        pagination={paginationConfig}
        // key={`table-${url?.pageSize || "8"} `}
        draggableColumns
        draggableId={ExcelCodes.DORMITORY_RESERVATION_ALL_REQUESTS_LIST}
      />
    </div>
  );
};

export default ReservationAllRequests;
