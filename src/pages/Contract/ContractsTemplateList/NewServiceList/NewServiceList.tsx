import { useState } from "react";

import { Dropdown, Form, MenuProps, Row } from "antd";
import { AiOutlineClose, AiOutlineFilter, AiOutlinePlus } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { PiFilePdf, PiFileXls } from "react-icons/pi";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomBadge from "@components/Renderers/CustomBadge/CustomBadge";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomEmpty from "@components/Renderers/CustomEmpty/CustomEmpty";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { NewServiceListDataTypes } from "@pages/Contract/ContractsTemplateList/NewServiceList/@types/@newServiceList";

import AddFinancialLowsDrawerContent from "./helper/drawer/AddFinancialLowsDrawerContent/AddFinancialLowsDrawerContent";
import AddFinancialLowsModalContent from "./helper/modal/AddFinancialLowsModalContent";
import TemplateNewServiceListTableModel from "./helper/model/TemplateNewServiceListTableModel";

const exportMenu: MenuProps = {
  items: [
    {
      label: (
        <span className="flex items-center gap-2">
          <PiFileXls />
          خروجی Excel
        </span>
      ),
      key: "excel",
    },
    {
      label: (
        <span className="flex items-center gap-2">
          <PiFilePdf />
          خروجی PDF
        </span>
      ),
      key: "pdf",
    },
  ],
};

const mockData: NewServiceListDataTypes[] = [
  {
    id: 1,
    beneficiary: "شعبه مرکزی ",
    business: "دانشگاه آزاد اسلامی ",
    type: 1, // ثابت حقیقی
    branchType: "مرکزی",
    share: "30",
    supplier: true, // تامین کننده
  },
  {
    id: 2,
    beneficiary: "شعبه مرکزی ",
    business: "دانشگاه آزاد اسلامی ",
    type: 2, // ثابت حقیقی
    branchType: "مرکزی",
    share: "30",
    supplier: false,
  },
  {
    id: 3,
    beneficiary: "متغیر ",
    business: "دانشگاه آزاد اسلامی ",
    type: 3, //  متغیر حقیقی
    branchType: "منطقه",
    share: "20",
    supplier: false,
  },
  {
    id: 4,
    beneficiary: "متغیر ",
    business: "دانشگاه آزاد اسلامی ",
    type: 4, // ثابت حقوقی
    branchType: "مرکزی",
    share: "10",
    supplier: false,
  },
  {
    id: 5,
    beneficiary: "گروهی ",
    business: "دانشگاه آزاد اسلامی ",
    type: 5, //  گروهی
    branchType: "مرکزی",
    share: "30",
    supplier: true,
  },
];

const NewServiceList = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAddLowsModalOpen, setIsAddLowsModalOpen] = useState(false);
  const [form] = Form.useForm();

  //* ================================ Util Functions ================================
  // btn handler
  const addFinancialLowsHandler = () => {
    setIsAddLowsModalOpen(true);
  };

  // add modal handler
  const closeAddLowModalHandler = () => {
    setIsAddLowsModalOpen(false);
  };

  const confirmAddLowModalHandler = () => {
    setIsDrawerOpen(true);
    closeAddLowModalHandler();
  };

  // drawer handler
  const closeDrawerHandler = () => {
    setIsDrawerOpen(false);
  };

  //
  const editClickHandler = () => {};
  const deleteClickHandler = () => {};

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {/* ADD FINANCIAL LOWS MODAL */}
      {isAddLowsModalOpen && (
        <ConfirmationModalWithContent
          title="افزودن قانون مالی"
          isModalOpen={isAddLowsModalOpen}
          closeModalHandler={closeAddLowModalHandler}
          onConfirmClickHandler={confirmAddLowModalHandler}
          // isConfirmButtonLoading={}
          confirmBtnText="تایید و ثبت "
          content={<AddFinancialLowsModalContent form={form} />}
          showIcon={false}
        />
      )}

      {/* ADD FINANCIAL LOWS DRAWER */}
      {isDrawerOpen && (
        <CustomDrawer
          open={isDrawerOpen}
          onClose={closeDrawerHandler}
          closeIcon={<AiOutlineClose />}
          content={
            <AddFinancialLowsDrawerContent closeDrawer={closeDrawerHandler} form={form} />
          }
        />
      )}

      <div className="flex flex-col gap-10">
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol
            xl={8}
            lg={8}
            label="اکوسیستم"
            value="دانشگاه آزاد اسلامی"
          />
          <SingleVerticalWithCol xl={8} lg={8} label="سرویس" value="تغذیه" />
          <SingleVerticalWithCol xl={8} lg={8} label="خدمت" value="تغذیه" />
        </Row>

        <div className="flex flex-col gap-4">
          <CustomDivider text="قانون های مالی و ذینفعان" />
          <ToolBox
            rightSide={
              <CustomBadge count={[]}>
                <CustomButton icon={<AiOutlineFilter />}>فیلتر پیشرفته</CustomButton>
              </CustomBadge>
            }
            leftSide={
              <>
                <Dropdown menu={exportMenu} trigger={["click"]}>
                  <CustomButton>
                    خروجی <IoIosArrowDown />
                  </CustomButton>
                </Dropdown>
                <CustomButton
                  type="primary"
                  icon={<AiOutlinePlus />}
                  onClick={addFinancialLowsHandler}
                >
                  افزودن قوانین مالی
                </CustomButton>
              </>
            }
          />
          {mockData?.length >= 1 ? (
            <CustomAlert
              showIcon
              message="کل سهم های این خدمت تخصیص داده شده."
              type="success"
            />
          ) : null}

          {mockData?.length ? (
            <CustomTable<NewServiceListDataTypes>
              dataSource={mockData}
              columns={TemplateNewServiceListTableModel({
                editClickHandler,
                deleteClickHandler,
              })}
              // loading={}
              {...TABLE_PROPS(mockData.length ?? 0)}
              rowKey="id"
            />
          ) : (
            <CustomEmpty />
          )}
        </div>
        <div className="flex justify-end gap-2">
          <CustomButton type="default" onClick={addFinancialLowsHandler}>
            انصراف
          </CustomButton>
          <CustomButton
            type="primary"
            onClick={addFinancialLowsHandler}
            disabled={mockData?.length === 0}
          >
            ثبت و تایید خدمت
          </CustomButton>
        </div>
      </div>
    </>
  );
};
export default NewServiceList;
