import { Dropdown, MenuProps } from "antd";
import { AiOutlineFilter } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";

import { CustomButton } from "@components/CustomInputs";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import { ExcelCodes } from "@infra/config/excel-codes";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  ADMISSION_GENDER,
  RESERVABLE_CAPACITY_TYPE,
  SCHEDULE_TYPE,
} from "@pages/Dormitory/Admission/_shared/util";
import { MyAdmissionCancelledListItem } from "@pages/Dormitory/Admission/MyAdmission/MyAdmissionList/helper/components/MyAdmissionCancelledList/@types/@myAdmissionCancelledList";
import MyAdmissionCancelledListTableModel from "@pages/Dormitory/Admission/MyAdmission/MyAdmissionList/helper/components/MyAdmissionCancelledList/helper/model/MyAdmissionCancelledListTableModel";

const exportMenu: MenuProps = {
  items: [
    {
      label: "خروجی Excel",
      key: "excel",
    },
    {
      label: "خروجی PDF",
      key: "pdf",
    },
  ],
};

const mockData: MyAdmissionCancelledListItem[] = [
  {
    id: 1,
    requestNumber: "312454",
    requestType: "ایجاد",
    programTitle: "برنامه پذیرش تابستان ۱۴۰۵",
    residence: "خوابگاه شهید بهشتی",
    branch: "تهران جنوب",
    gender: ADMISSION_GENDER.male,
    reservableCapacity: RESERVABLE_CAPACITY_TYPE.bed,
    scheduleType: SCHEDULE_TYPE.monthly,
    reserveType: "UrgentReserve",
    paymentOption: "OncePayment",
    creator: "مجید سیانکی",
    createDate: "2024-04-21T20:20:00",
    lastActionDate: "2024-04-21T20:20:00",
  },
  {
    id: 2,
    requestNumber: "312455",
    requestType: "ایجاد",
    programTitle: "برنامه پذیرش پاییز ۱۴۰۵",
    residence: "خوابگاه فاطمه زهرا",
    branch: "تهران مرکز",
    gender: ADMISSION_GENDER.female,
    reservableCapacity: RESERVABLE_CAPACITY_TYPE.unit,
    scheduleType: SCHEDULE_TYPE.dailyFree,
    reserveType: "ReservationRequest",
    paymentOption: "InstallmentPayment",
    creator: "سارا محمدی",
    createDate: "2024-04-21T20:20:00",
    lastActionDate: "2024-04-22T10:15:00",
  },
  {
    id: 3,
    requestNumber: "312456",
    requestType: "ایجاد",
    programTitle: "برنامه پذیرش زمستان ۱۴۰۵",
    residence: "خوابگاه امیرکبیر",
    branch: "اصفهان",
    gender: ADMISSION_GENDER.both,
    reservableCapacity: RESERVABLE_CAPACITY_TYPE.building,
    scheduleType: SCHEDULE_TYPE.termic,
    reserveType: "UrgentReserve",
    paymentOption: "OncePayment",
    creator: "علی رضایی",
    createDate: "2024-04-22T10:15:00",
    lastActionDate: "2024-04-23T14:30:00",
  },
  {
    id: 4,
    requestNumber: "312457",
    requestType: "ایجاد",
    programTitle: "برنامه پذیرش بهار ۱۴۰۶",
    residence: "خوابگاه شهید رجایی",
    branch: "شیراز",
    gender: ADMISSION_GENDER.male,
    reservableCapacity: RESERVABLE_CAPACITY_TYPE.bed,
    scheduleType: SCHEDULE_TYPE.monthly,
    reserveType: "ReservationRequest",
    paymentOption: "OncePayment",
    creator: "مریم کریمی",
    createDate: "2024-04-23T14:30:00",
    lastActionDate: "2024-04-24T09:00:00",
  },
];

const MyAdmissionCancelledList = () => {
  const { params: url } = useQueryParams();

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="flex flex-col gap-4">
      <ToolBox
        rightSide={
          <div className="flex flex-wrap gap-3">
            <CustomButton icon={<AiOutlineFilter />} disabled>
              فیلتر پیشرفته
            </CustomButton>
          </div>
        }
        leftSide={
          <Dropdown menu={exportMenu} trigger={["click"]}>
            <CustomButton disabled icon={<IoIosArrowDown />} iconPlacement="end">
              خروجی
            </CustomButton>
          </Dropdown>
        }
      />

      <CustomTable<MyAdmissionCancelledListItem>
        dataSource={mockData}
        loading={false}
        columns={MyAdmissionCancelledListTableModel({
          status: url?.status,
        })}
        rowKey="id"
        draggableColumns
        draggableId={ExcelCodes.DORMITORY_MY_ADMISSION_CANCELLED_LIST_TABLE}
        pagination={paginationConfig}
        key={`table-${url?.pageSize || "8"}`}
      />
    </div>
  );
};

export default MyAdmissionCancelledList;
