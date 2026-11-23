import { useState } from "react";

import { Dropdown, Form, MenuProps } from "antd";
import { AiOutlineFilter, AiOutlinePlus } from "react-icons/ai";
import { FiArchive } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from "react-router";

import { CustomButton } from "@components/CustomInputs";
import AdvanceFilterModal from "@components/Modals/AdvanceFilterModal/AdvanceFilterModal";
import CustomBadge from "@components/Renderers/CustomBadge/CustomBadge";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import { ExcelCodes } from "@infra/config/excel-codes";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import { makeSearchParams } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  DORMITORY_ACTIVE_ADMISSION_DETAIL_PAGE_ROUTE,
  DORMITORY_MY_ADMISSION_CREATION_PAGE_ROUTE,
} from "@infra/router/routes/dormitory";
import {
  ADMISSION_GENDER,
  RESERVABLE_CAPACITY_TYPE,
  SCHEDULE_TYPE,
} from "@pages/Dormitory/Admission/_shared/util";
import {
  MyAdmissionActiveListAdvanceFilterFormType,
  MyAdmissionActiveListItem,
} from "@pages/Dormitory/Admission/MyAdmission/MyAdmissionList/helper/components/MyAdmissionActiveList/@types/@myAdmissionActiveList";
import useMyAdmissionActiveListAdvanceFilter from "@pages/Dormitory/Admission/MyAdmission/MyAdmissionList/helper/components/MyAdmissionActiveList/helper/hooks/useMyAdmissionActiveListAdvanceFilter";
import MyAdmissionActiveListTableModel from "@pages/Dormitory/Admission/MyAdmission/MyAdmissionList/helper/components/MyAdmissionActiveList/helper/model/MyAdmissionActiveListTableModel";

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

const mockData: MyAdmissionActiveListItem[] = [
  {
    id: 1,
    programTitle: "برنامه پذیرش تابستان ۱۴۰۵",
    isVisibleToUsers: true,
    residence: "خوابگاه شهید بهشتی",
    branch: "تهران جنوب",
    managementType: "خودگردان",
    gender: ADMISSION_GENDER.male,
    reservableCapacity: RESERVABLE_CAPACITY_TYPE.bed,
    scheduleType: SCHEDULE_TYPE.monthly,
    reserveType: "UrgentReserve",
    paymentOption: "OncePayment",
    allowedStayEndDate: "2026/09/22 12:00:00",
    contractId: "۲۳۷۱۴۳۷",
    creator: "مجید سیانکی",
    createDate: "2024-04-21T20:20:00",
  },
  {
    id: 2,
    programTitle: "برنامه پذیرش پاییز ۱۴۰۵",
    isVisibleToUsers: false,
    residence: "خوابگاه فاطمه زهرا",
    branch: "تهران مرکز",
    managementType: "پیمانکاری",
    gender: ADMISSION_GENDER.female,
    reservableCapacity: RESERVABLE_CAPACITY_TYPE.unit,
    scheduleType: SCHEDULE_TYPE.dailyFree,
    reserveType: "ReservationRequest",
    paymentOption: "InstallmentPayment",
    allowedStayEndDate: "2026/09/18 12:00:00",
    contractId: "۲۳۷۱۴۳۸",
    creator: "سارا محمدی",
    createDate: "2024-04-21T20:20:00",
  },
  {
    id: 3,
    programTitle: "برنامه پذیرش زمستان ۱۴۰۵",
    isVisibleToUsers: true,
    residence: "خوابگاه امیرکبیر",
    branch: "اصفهان",
    managementType: "خودگردان",
    gender: ADMISSION_GENDER.both,
    reservableCapacity: RESERVABLE_CAPACITY_TYPE.building,
    scheduleType: SCHEDULE_TYPE.termic,
    reserveType: "UrgentReserve",
    paymentOption: "OncePayment",
    allowedStayEndDate: "2026/09/15 12:00:00",
    contractId: "۲۳۷۱۴۳۹",
    creator: "علی رضایی",
    createDate: "2024-04-22T10:15:00",
  },
  {
    id: 4,
    programTitle: "برنامه پذیرش بهار ۱۴۰۶",
    isVisibleToUsers: true,
    residence: "خوابگاه شهید رجایی",
    branch: "شیراز",
    managementType: "خودگردان",
    gender: ADMISSION_GENDER.male,
    reservableCapacity: RESERVABLE_CAPACITY_TYPE.bed,
    scheduleType: SCHEDULE_TYPE.monthly,
    reserveType: "ReservationRequest",
    paymentOption: "OncePayment",
    allowedStayEndDate: "2026/09/13 12:00:00",
    contractId: "۲۳۷۱۴۴۰",
    creator: "مریم کریمی",
    createDate: "2024-04-23T14:30:00",
  },
];

const MyAdmissionActiveList = () => {
  const { params: url } = useQueryParams();
  const navigate = useNavigate();

  const [badgeCount, setBadgeCount] = useState(() => {
    return url?.badger ?? 0;
  });
  const [isAdvanceModalOpen, setIsAdvanceModalOpen] = useState(false);

  const [form] = Form.useForm<MyAdmissionActiveListAdvanceFilterFormType>();

  const { filterItemsList } = useMyAdmissionActiveListAdvanceFilter();

  //* ================================ Util Functions ================================
  const viewAdmissionHandler = (id: number) => {
    navigate({
      pathname: DORMITORY_ACTIVE_ADMISSION_DETAIL_PAGE_ROUTE,
      search: makeSearchParams({
        id,
        // Marks list origin so active detail breadcrumb and contract links use the My-admission routes.
        from: "my",
      }),
    });
  };

  const deactivateAdmissionHandler = (_id: number) => {};

  const createAdmissionHandler = () => {
    navigate({
      pathname: DORMITORY_MY_ADMISSION_CREATION_PAGE_ROUTE,
    });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {isAdvanceModalOpen && (
        <AdvanceFilterModal
          isModalOpen={isAdvanceModalOpen}
          closeModalHandler={() => setIsAdvanceModalOpen(false)}
          filterItemsList={filterItemsList}
          badgeCounter={(amount) => setBadgeCount(amount.toString())}
          form={form}
          defaultParams={url}
        />
      )}

      <div className="flex flex-col gap-4">
        <ToolBox
          rightSide={
            <div className="flex flex-wrap gap-3">
              <CustomBadge count={badgeCount}>
                <CustomButton
                  icon={<AiOutlineFilter />}
                  onClick={() => setIsAdvanceModalOpen(true)}
                >
                  فیلتر پیشرفته
                </CustomButton>
              </CustomBadge>
            </div>
          }
          leftSide={
            <div className="flex flex-wrap gap-2">
              <CustomButton type="primary" ghost disabled icon={<FiArchive />}>
                آرشیو
              </CustomButton>

              <CustomButton
                type="primary"
                onClick={createAdmissionHandler}
                icon={<AiOutlinePlus />}
                iconPlacement="end"
              >
                ایجاد برنامه پذیرش
              </CustomButton>

              <Dropdown menu={exportMenu} trigger={["click"]}>
                <CustomButton disabled icon={<IoIosArrowDown />} iconPlacement="end">
                  خروجی
                </CustomButton>
              </Dropdown>
            </div>
          }
        />

        <CustomTable<MyAdmissionActiveListItem>
          dataSource={mockData}
          loading={false}
          columns={MyAdmissionActiveListTableModel({
            onView: viewAdmissionHandler,
            onDeactivate: deactivateAdmissionHandler,
          })}
          rowKey="id"
          draggableColumns
          draggableId={ExcelCodes.DORMITORY_MY_ADMISSION_ACTIVE_LIST_TABLE}
          pagination={paginationConfig}
          key={`table-${url?.pageSize || "8"}`}
        />
      </div>
    </>
  );
};

export default MyAdmissionActiveList;
