import { useState } from "react";

import { AiOutlineFilter } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";

import { dataSourceBranchesTypes } from "./@types/@dataSourceBranchTypes";
import InternationalBranchesInternationalTableModel from "./helper/InternationalBranchesInternationalTableModel/InternationalBranchesInternationalTableModel";
import "./_internationalBranchesInternational.scss";

const dataSource: dataSourceBranchesTypes[] = [
  {
    id: 1,
    name: "تهران جنوب",
    fieldsCountGroups: 3,
    fieldsCounts: 5,
  },
  {
    id: 2,
    name: "تهران شمال",
    fieldsCountGroups: 3,
    fieldsCounts: 5,
  },
  {
    id: 3,
    name: " رودهن",
    fieldsCountGroups: 3,
    fieldsCounts: 5,
  },
  {
    id: 4,
    name: "ترکیه",
    fieldsCountGroups: 3,
    fieldsCounts: 5,
  },
  {
    id: 5,
    name: "دبی",
    fieldsCountGroups: 3,
    fieldsCounts: 5,
  },
  {
    id: 6,
    name: "بابلسر",
    fieldsCountGroups: 3,
    fieldsCounts: 5,
  },
  {
    id: 7,
    name: "تهران شرق",
    fieldsCountGroups: 3,
    fieldsCounts: 5,
  },
  {
    id: 8,
    name: "زنجان",
    fieldsCountGroups: 3,
    fieldsCounts: 5,
  },
  {
    id: 9,
    name: "تبریز",
    fieldsCountGroups: 3,
    fieldsCounts: 5,
  },
  {
    id: 10,
    name: "رشت",
    fieldsCountGroups: 3,
    fieldsCounts: 5,
  },
];
const InternationalBranchesInternational = () => {
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [data, setData] = useState<dataSourceBranchesTypes[]>(dataSource);

  //* ================================ Util Functions ================================
  const closeModalHandler = () => {
    setDeleteId(null);
  };
  const openDeleteModal = (id: number) => {
    setDeleteId(id);
  };

  const onConfirmClickHandler = () => {
    if (deleteId !== null) {
      setData((prev) => prev.filter((item) => item.id !== deleteId));
    }
    closeModalHandler();
  };
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

  return (
    <>
      {deleteId !== null ? (
        <ConfirmationModalWithContent
          isModalOpen={true}
          backBtnText="انصراف"
          confirmBtnText="حذف کن"
          title="حذف از لیست"
          content="آیا از حذف انتخاب شده از لیست اطمینان دارید؟"
          closeModalHandler={closeModalHandler}
          onConfirmClickHandler={onConfirmClickHandler}
        />
      ) : null}
      <div className="international-branches-international-container">
        <CustomDivider text="لیست واحد‌های دانشگاهی" />
        <ToolBox
          rightSide={
            <CustomButton icon={<AiOutlineFilter />}>فیلتر پیشرفته</CustomButton>
          }
          leftSide={
            <CustomButton icon={<IoIosArrowDown />} iconPlacement="end">
              خروجی
            </CustomButton>
          }
        />
        <CustomAlert
          showIcon
          message="راهنما"
          description="با انتخاب واحد دانشگاهی مورد نظر، امکان افزودن آن به فهرست واحدهای دانشگاهی پذیرنده دانشجویان بین‌المللی فراهم می‌شود. بدین ترتیب، دانشجویان بین‌المللی می‌توانند از این واحد دانشگاهی به عنوان یکی از گزینه‌های تحصیلی خود در فرایند پذیرش استفاده نمایند."
          type="info"
          className="custom-alert custom-alert-duplicate"
        />
        <CustomTable
          dataSource={data}
          rowKey="id"
          columns={InternationalBranchesInternationalTableModel({
            openDeleteModal: openDeleteModal,
          })}
          pagination={paginationConfig}
          {...TABLE_PROPS(data?.length)}
          className="international-branches-international-table-container"
        />
      </div>
    </>
  );
};
export default InternationalBranchesInternational;
