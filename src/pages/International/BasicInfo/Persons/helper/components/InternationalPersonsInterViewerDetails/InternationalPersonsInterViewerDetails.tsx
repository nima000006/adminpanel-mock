import { useState } from "react";

import { AiOutlineClose } from "react-icons/ai";
import { PiHash, PiPlus } from "react-icons/pi";
import { Link } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import ConfirmationModalWithContent from "@components/Modals/GeneralModals/ConfirmationModalWithContent/ConfirmationModalWithContent";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  INTERNATIONAL_BASIC_INFO_PERSONS_ROUTE,
  INTERNATIONAL_BASIC_INFO_ROUTE,
} from "@infra/router/routes/international";

import { dataSourceInterViewerType } from "./@types/dataSourceInterviewerType";
import InternationalPersonsInterViewerDetailsDrawerContent from "./helper/components/InternationalPersonsInterViewerDetailsDrawerContent/InternationalPersonsInterViewerDetailsDrawerContent";
import InternationalPersonsInterViewerDetailsViewDrawerContent from "./helper/components/InternationalPersonsInterViewerDetailsViewDrawerContent/InternationalPersonsInterViewerDetailsViewDrawerContent";
import InternationalPersonsInterViewerDetailsTableModel from "./helper/models/InternationalPersonsInterViewerDetailsTableModel/InternationalPersonsInterViewerDetailsTableModel";

import "./_internationalPersonsInterViewerDetails.scss";

const dataSource: dataSourceInterViewerType[] = [
  {
    id: 1,
    name: "سینا",
    lastName: "سوجه",
    internationalCode: "0021116090",
    mobileNumber: "۰۹۱۲۲۴۵۵۹۱۰",
    universityField: "تهران شمال",
  },
  {
    id: 2,
    name: "سینا",
    lastName: "سوجه",
    internationalCode: "0021116090",
    mobileNumber: "۰۹۱۲۲۴۵۵۹۱۰",
    universityField: "تهران شمال",
  },
  {
    id: 3,
    name: "سینا",
    lastName: "سوجه",
    internationalCode: "0021116090",
    mobileNumber: "۰۹۱۲۲۴۵۵۹۱۰",
    universityField: "تهران شمال",
  },
  {
    id: 4,
    name: "سینا",
    lastName: "سوجه",
    internationalCode: "0021116090",
    mobileNumber: "۰۹۱۲۲۴۵۵۹۱۰",
    universityField: "تهران شمال",
  },
  {
    id: 5,
    name: "سینا",
    lastName: "سوجه",
    internationalCode: "0021116090",
    mobileNumber: "۰۹۱۲۲۴۵۵۹۱۰",
    universityField: "تهران شمال",
  },
  {
    id: 6,
    name: "سینا",
    lastName: "سوجه",
    internationalCode: "0021116090",
    mobileNumber: "۰۹۱۲۲۴۵۵۹۱۰",
    universityField: "تهران شمال",
  },
  {
    id: 7,
    name: "سینا",
    lastName: "سوجه",
    internationalCode: "0021116090",
    mobileNumber: "۰۹۱۲۲۴۵۵۹۱۰",
    universityField: "تهران شمال",
  },
  {
    id: 8,
    name: "سینا",
    lastName: "سوجه",
    internationalCode: "0021116090",
    mobileNumber: "۰۹۱۲۲۴۵۵۹۱۰",
    universityField: "تهران شمال",
  },
  {
    id: 9,
    name: "سینا",
    lastName: "سوجه",
    internationalCode: "0021116090",
    mobileNumber: "۰۹۱۲۲۴۵۵۹۱۰",
    universityField: "تهران شمال",
  },
  {
    id: 10,
    name: "سینا",
    lastName: "سوجه",
    internationalCode: "0021116090",
    mobileNumber: "۰۹۱۲۲۴۵۵۹۱۰",
    universityField: "تهران شمال",
  },
];
const InternationalPersonsInterViewerDetails = () => {
  const [isOpenAddDrawer, setIsOpenAddDrawer] = useState(false);
  const [openDrawer, setOpenDrawer] = useState({ isOpen: false, id: "" });
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [data, setData] = useState<dataSourceInterViewerType[]>(dataSource);
  const { setSearchParams } = useQueryParams();

  useTitle({
    breadcrumbItems: [
      {
        title: <Link to={INTERNATIONAL_BASIC_INFO_ROUTE}>اطلاعات پایه</Link>,
      },
      {
        title: <Link to={INTERNATIONAL_BASIC_INFO_PERSONS_ROUTE}>افراد</Link>,
      },
      {
        title: "مصاحبه کننده‌ها",
      },
    ],
  });
  //* ================================ Util Functions ================================
  const openDrawerAddHandler = () => {
    setIsOpenAddDrawer(true);
  };

  const drawerViewHandler = (id: string) => {
    setOpenDrawer({ isOpen: true, id: id });
    setSearchParams({ id: id });
  };
  const closeDrawerHandler = () => {
    setOpenDrawer({ isOpen: false, id: "" });
    setSearchParams({});
  };

  const closeModalHandler = () => {
    setDeleteId(null);
  };
  const onConfirmClickHandler = () => {
    if (deleteId !== null) {
      setData((prev) => prev.filter((item) => item.id !== deleteId));
    }
    closeModalHandler();
  };
  const openDeleteModal = (id: number) => {
    setDeleteId(id);
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
      {isOpenAddDrawer && (
        <CustomDrawer
          onClose={() => setIsOpenAddDrawer(false)}
          open={isOpenAddDrawer}
          closeIcon={<AiOutlineClose />}
          content={
            <InternationalPersonsInterViewerDetailsDrawerContent
              closeDrawerHandler={() => setIsOpenAddDrawer(false)}
            />
          }
        />
      )}
      {openDrawer?.isOpen && (
        <CustomDrawer
          open={openDrawer?.isOpen}
          onClose={closeDrawerHandler}
          closeIcon={<AiOutlineClose />}
          content={
            <InternationalPersonsInterViewerDetailsViewDrawerContent
              closeDrawerHandler={closeDrawerHandler}
            />
          }
        />
      )}
      <div className="international-persons-interviewer-details">
        <CustomDivider
          text="مصاحبه کننده‌ها"
          extraContent={
            <div className="custom-button-container">
              <CustomButton className="custom-button-disabled" disabled icon={<PiHash />}>
                تعداد : {data.length}
              </CustomButton>
              <CustomButton
                type="primary"
                icon={<PiPlus />}
                iconPlacement="end"
                onClick={openDrawerAddHandler}
              >
                افزودن رشته
              </CustomButton>
            </div>
          }
        />
        <CustomTable
          dataSource={data}
          rowKey="id"
          columns={InternationalPersonsInterViewerDetailsTableModel({
            drawerViewHandler: drawerViewHandler,
            openDeleteModal: openDeleteModal,
          })}
          pagination={paginationConfig}
          {...TABLE_PROPS(data?.length)}
        />
      </div>
    </>
  );
};
export default InternationalPersonsInterViewerDetails;
