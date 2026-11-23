import { useEffect, useState } from "react";

import { Dropdown, Form } from "antd";
import { AiOutlineClose, AiOutlineFilter, AiOutlinePlus } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";

import { CustomButton } from "@components/CustomInputs";
import AdvanceFilterModal from "@components/Modals/AdvanceFilterModal/AdvanceFilterModal";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomBadge from "@components/Renderers/CustomBadge/CustomBadge";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import { ExcelCodes } from "@infra/config/excel-codes";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import useQueryParams from "@infra/hooks/useQueryParams";
import AddToStaffsListDrawerContent from "@pages/Dormitory/Staffs/_shared/components/AddToStaffsListDrawerContent/AddToStaffsListDrawerContent";
import DeactivationStaffsModalContent from "@pages/Dormitory/Staffs/_shared/components/DeactivationStaffsModalContent/DeactivationStaffsModalContent";
import ViewStaffsDrawerContent from "@pages/Dormitory/Staffs/_shared/components/ViewStaffsDrawerContent/ViewStaffsDrawerContent";
import { DormitoryAllStaffsAdvanceFilterFormType } from "@pages/Dormitory/Staffs/AllStaffs/AllStaffsList/@types/@allStaffsListTypes";
import useDormitoryAllStaffsAdvanceFilter from "@pages/Dormitory/Staffs/AllStaffs/AllStaffsList/helper/hooks/useDormitoryAllStaffsAdvanceFilter";
import AllStaffsListTableModel from "@pages/Dormitory/Staffs/AllStaffs/AllStaffsList/helper/model/AllStaffsListTableModel/AllStaffsListTableModel";

const mockData = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    position: "Manager",
    business: "Business 1",
    branch: "Branch 1",
    residenceName: "Residence 1",
    username: "1234567890",
    personnelCode: "1234567890",
    mobile: "1234567890",
  },
];

const AllStaffsList = () => {
  const { params: url } = useQueryParams();

  const [isAdvanceModalOpen, setIsAdvanceModalOpen] = useState(false);
  const [badgeCount, setBadgeCount] = useState(() => {
    return url?.badger ?? 0;
  });

  const [isAddToStaffsListDrawerOpen, setIsAddToStaffsListDrawerOpen] = useState(false);
  const [isViewStaffsDrawerOpen, setIsViewStaffsDrawerOpen] = useState({
    isOpen: false,
    id: -1,
  });
  const [deactivateModal, setDeactivateModal] = useState({
    isOpen: false,
    id: -1,
  });

  const [form] = Form.useForm<DormitoryAllStaffsAdvanceFilterFormType>();

  const { filterItemsList } = useDormitoryAllStaffsAdvanceFilter();

  useTitle({
    breadcrumbItems: [
      {
        title: "اقامتگاه‌ها",
      },
      {
        title: "کارمندان اقامتگاه",
      },
      {
        title: "همه‌کارمندان اقامتگاه",
      },
    ],
  });

  //? ================================ Effects ================================
  useEffect(() => {
    setBadgeCount(url?.badger ?? 0);
  }, [url?.badger]);

  //* ================================ Util Functions ================================

  const viewStaffDetailHandler = (id: number) => {
    setIsViewStaffsDrawerOpen({ isOpen: true, id });
  };

  const disableStaffHandler = (id: number) => {
    setDeactivateModal({ isOpen: true, id });
  };

  const addToStaffsListHandler = () => {
    setIsAddToStaffsListDrawerOpen(true);
  };

  const closeDeactivateModal = () => {
    setDeactivateModal({ isOpen: false, id: -1 });
  };

  const confirmDeactivateHandler = () => {};

  const closeAddToStaffsListDrawerHandler = () => {
    setIsAddToStaffsListDrawerOpen(false);
  };

  const closeViewStaffsDrawerHandler = () => {
    setIsViewStaffsDrawerOpen({ isOpen: false, id: -1 });
  };

  const closeAdvanceFilterHandler = () => {
    // form?.resetFields();
    setIsAdvanceModalOpen(false);
  };

  // table column
  const column = AllStaffsListTableModel({
    viewStaffDetailHandler,
    disableStaffHandler,
  });

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {/* ADVANCE FILTER MODAL */}
      {isAdvanceModalOpen && (
        <AdvanceFilterModal
          isModalOpen={isAdvanceModalOpen}
          closeModalHandler={closeAdvanceFilterHandler}
          filterItemsList={filterItemsList}
          badgeCounter={(amount) => setBadgeCount(amount.toString())}
          form={form}
          defaultParams={url}
        />
      )}

      {/* ADD TO STAFFS LIST DRAWER */}
      {isAddToStaffsListDrawerOpen && (
        <CustomDrawer
          onClose={closeAddToStaffsListDrawerHandler}
          open={isAddToStaffsListDrawerOpen}
          closeIcon={<AiOutlineClose />}
          content={
            <AddToStaffsListDrawerContent
              closeAddToStaffsListDrawerHandler={closeAddToStaffsListDrawerHandler}
              isAllStaffs={true}
            />
          }
        />
      )}

      {/* VIEW STAFFS LIST DRAWER */}
      {isViewStaffsDrawerOpen?.isOpen && (
        <CustomDrawer
          onClose={closeViewStaffsDrawerHandler}
          open={isViewStaffsDrawerOpen.isOpen}
          closeIcon={<AiOutlineClose />}
          content={
            <ViewStaffsDrawerContent
              closeViewStaffsDrawerHandler={closeViewStaffsDrawerHandler}
              isAllStaffs={true}
            />
          }
        />
      )}

      {/* DEACTIVATION MODAL */}
      {deactivateModal?.isOpen && (
        <ConfirmationModalWithContent
          title="غیر فعالسازی (انتقال به آرشیو)"
          isModalOpen={deactivateModal?.isOpen}
          confirmBtnText="تایید و غیرفعالسازی"
          isDangerous={true}
          backBtnText="انصراف"
          closeModalHandler={closeDeactivateModal}
          onConfirmClickHandler={confirmDeactivateHandler}
          content={<DeactivationStaffsModalContent />}
          width={400}
          isConfirmButtonLoading={false}
          showIcon={false}
        />
      )}

      <div className="flex flex-col gap-4">
        <ToolBox
          className="mt-4"
          rightSide={
            <CustomBadge count={badgeCount}>
              <CustomButton
                icon={<AiOutlineFilter />}
                onClick={() => setIsAdvanceModalOpen(true)}
              >
                فیلتر پیشرفته
              </CustomButton>
            </CustomBadge>
          }
          leftSide={
            <div className="flex flex-wrap gap-2">
              <CustomButton
                type="primary"
                icon={<AiOutlinePlus />}
                onClick={addToStaffsListHandler}
              >
                افزودن کارمندان به لیست
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
          dataSource={mockData}
          rowKey="id"
          // loading={false}
          columns={column}
          pagination={paginationConfig}
          // key={`table-${url?.pageSize || "8"} `}
          draggableColumns
          draggableId={ExcelCodes.DORMITORY_ALL_STAFFS_LIST_TABLE}
        />
      </div>
    </>
  );
};

export default AllStaffsList;
