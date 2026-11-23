import { useState } from "react";

import { AiOutlineClose, AiOutlineFilter } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { PiHash, PiPlus } from "react-icons/pi";
import { Link } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import ToolBox from "@components/Renderers/ToolBox/ToolBox";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  INTERNATIONAL_BASIC_INFO_BRANCHES_ROUTE,
  INTERNATIONAL_BASIC_INFO_ROUTE,
} from "@infra/router/routes/international";

import { dataSourceInternationalDetailsTypes } from "./@types/@dataSourceInternationalDetailsTypes";
import InternationalBranchesInternationalDetailsAddDrawerContent from "./helper/components/InternationalBranchesInternationalDetailsAddDrawerContent/InternationalBranchesInternationalDetailsAddDrawerContent";
import InternationalBranchesInternationalDetailsEditDrawerContent from "./helper/components/InternationalBranchesInternationalDetailsEditDrawerContent/InternationalBranchesInternationalDetailsEditDrawerContent";
import InternationalBranchesInternationalDetailsFieldDrawerContent from "./helper/components/InternationalBranchesInternationalDetailsFieldDrawerContent/InternationalBranchesInternationalDetailsFieldDrawerContent";
import InternationalBranchesInternationalDetailsTableModel from "./helper/models/InternationalBranchesInternationalDetailsTableModel";
import "./_internationalBranchesInternationalDetails.scss";

const dataSource: dataSourceInternationalDetailsTypes[] = [
  {
    id: 1,
    name: "مهندسی کامپیوتر",
    groupName: "IT", //فناوری اطلاعات
    degree: ["کارشناسی ارشد", "کارشناسی پیوسته", "کاردانی پیوسته"],
  },
  {
    id: 2,
    name: "مهندسی صنایع",
    groupName: "ET", //فنی مهندسی
    degree: ["کارشناسی ارشد", "کارشناسی پیوسته", "کاردانی پیوسته"],
  },
  {
    id: 3,
    name: "پزشکی",
    groupName: "HT", //بهداشت و درمان
    degree: [],
  },
  {
    id: 4,
    name: "روانشانسی",
    groupName: "HU", // علوم انسانی
    degree: ["کارشناسی ارشد", "کارشناسی پیوسته", "کاردانی پیوسته"],
  },
  {
    id: 5,
    name: "مهندسی کامپیوتر",
    groupName: "IT",
    degree: ["کارشناسی ارشد", "کارشناسی پیوسته", "کاردانی پیوسته"],
  },
  {
    id: 6,
    name: "سینما",
    groupName: "AR", // هنر
    degree: ["کارشناسی ارشد", "کارشناسی پیوسته", "کاردانی پیوسته"],
  },
  {
    id: 7,
    name: "ریاضیات پایه",
    groupName: "BS", //علوم پایه
    degree: ["کارشناسی ارشد", "کارشناسی پیوسته", "کاردانی پیوسته"],
  },
  {
    id: 8,
    name: "مهندسی کامپیوتر",
    groupName: "IT",
    degree: ["کارشناسی ارشد", "کارشناسی پیوسته", "کاردانی پیوسته"],
  },
  {
    id: 9,
    name: "مهندسی کامپیوتر",
    groupName: "IT",
    degree: ["کارشناسی ارشد", "کارشناسی پیوسته", "کاردانی پیوسته"],
  },
  {
    id: 10,
    name: "مهندسی کامپیوتر",
    groupName: "IT",
    degree: ["کارشناسی ارشد", "کارشناسی پیوسته", "کاردانی پیوسته"],
  },
];
const InternationalBranchesInternationalDetails = () => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [OpenDrawerAdd, setOpenDrawerAdd] = useState({ isOpen: false, id: -1 });
  const [OpenDrawerEdit, setOpenDrawerEdit] = useState({ isOpen: false, id: -1 });
  const { params, setSearchParams } = useQueryParams();
  useTitle({
    breadcrumbItems: [
      {
        title: <Link to={INTERNATIONAL_BASIC_INFO_ROUTE}>اطلاعات پایه</Link>,
      },
      {
        title: (
          <Link to={INTERNATIONAL_BASIC_INFO_BRANCHES_ROUTE}>واحد‌های دانشگاهی</Link>
        ),
      },
      {
        title: params?.name,
      },
    ],
  });

  //* ================================ Util Functions ================================
  const openDrawerFieldHandler = () => {
    setIsOpenDrawer(true);
  };
  const onClickHandlerAdd = (id: number) => {
    setOpenDrawerAdd({ isOpen: true, id });
    setSearchParams({ ...params, fieldId: id.toString() });
  };

  const closeDrawerAddHandler = () => {
    setOpenDrawerAdd({ isOpen: false, id: -1 });
    const newParams = { ...params };
    delete newParams.fieldId;
    setSearchParams(newParams);
  };
  const onClickHandlerEdit = (id: number) => {
    setOpenDrawerEdit({ isOpen: true, id });
    setSearchParams({ ...params, fieldId: id.toString() });
  };
  const closeDrawerEditHandler = () => {
    setOpenDrawerEdit({ isOpen: false, id: -1 });
    const newParams = { ...params };
    delete newParams.fieldId;
    setSearchParams(newParams);
  };
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

  return (
    <>
      {isOpenDrawer && (
        <CustomDrawer
          closeIcon={<AiOutlineClose />}
          content={
            <InternationalBranchesInternationalDetailsFieldDrawerContent
              closeDrawerHandler={() => setIsOpenDrawer(false)}
            />
          }
          onClose={() => setIsOpenDrawer(false)}
          open={isOpenDrawer}
        />
      )}
      {OpenDrawerAdd.isOpen && (
        <CustomDrawer
          closeIcon={<AiOutlineClose />}
          content={
            <InternationalBranchesInternationalDetailsAddDrawerContent
              closeDrawerAddHandler={closeDrawerAddHandler}
            />
          }
          onClose={closeDrawerAddHandler}
          open={OpenDrawerAdd.isOpen}
        />
      )}
      {OpenDrawerEdit.isOpen && (
        <CustomDrawer
          closeIcon={<AiOutlineClose />}
          content={
            <InternationalBranchesInternationalDetailsEditDrawerContent
              closeDrawerEditHandler={closeDrawerEditHandler}
            />
          }
          onClose={closeDrawerEditHandler}
          open={OpenDrawerEdit.isOpen}
        />
      )}
      <div className="international-branches-international-details">
        <CustomDivider titlePlacement="center" text={params?.name} />
        <CustomDivider
          text="رشته‌های بین‌الملل"
          extraContent={
            <div className="custom-button-container">
              <CustomButton className="custom-button-disabled" disabled icon={<PiHash />}>
                تعداد رشته‌ها: {dataSource.length}
              </CustomButton>
              <CustomButton
                type="primary"
                icon={<PiPlus />}
                iconPlacement="end"
                onClick={openDrawerFieldHandler}
              >
                افزودن رشته
              </CustomButton>
            </div>
          }
        />
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
        <CustomTable
          dataSource={dataSource}
          rowKey="id"
          columns={InternationalBranchesInternationalDetailsTableModel({
            onClickHandlerAdd: onClickHandlerAdd,
            onClickHandlerEdit: onClickHandlerEdit,
          })}
          pagination={paginationConfig}
          {...TABLE_PROPS(dataSource?.length)}
          className="mt-5!"
        />
      </div>
    </>
  );
};
export default InternationalBranchesInternationalDetails;
