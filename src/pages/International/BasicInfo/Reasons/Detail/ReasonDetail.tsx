import { useState } from "react";

import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineFilter } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { PiHash } from "react-icons/pi";
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
  INTERNATIONAL_BASIC_INFO_REASONS_ROUTE,
  INTERNATIONAL_BASIC_INFO_ROUTE,
} from "@infra/router/routes/international";

import AddReasonDrawerContent from "./helper/modals/AddReason/AddReasonDrawerContent";
import EditReasonDrawerContent from "./helper/modals/EditReasonDrawerContent/EditReasonDrawerContent";
import ViewReasonDrawerContent from "./helper/modals/ViewReasonDrawerContent/ViewReasonDrawerContent";
import InternationalReasonDetailTableModel from "./helper/models/InternationalReasonDetail/InternationalReasonDetailTableModel";
import "./_reasonDetail.scss";

const dataSource = [
  {
    id: 1,
    title: "معدل پایین‌تر از حد مورد نیاز",
    description:
      " بسیاری از دانشگاه‌ها معدل حداقل مشخصی را برای پذیرش تعیین می‌کنند. اگر معدل شما به این حد نرسد، احتمال رد درخواست شما بسیار زیاد است.",
  },
  {
    id: 2,
    title: "نمرات آزمون‌های ورودی ضعیف",
    description:
      "نمرات پایین در این آزمون‌ها نشان‌دهنده عدم آمادگی کافی برای تحصیل در سطح دانشگاهی است.",
  },
  {
    id: 3,
    title: "نامه‌های توصیه ضعیف",
    description:
      "نامه‌های توصیه از سوی اساتید یا کارفرمایان قبلی شما، به کمیته پذیرش کمک می‌کند تا به توانایی‌ها، پتانسیل و شخصیت شما پی ببرند. نامه‌های ضعیف یا کلیشه‌ای، تأثیر منفی بر تصمیم کمیته پذیرش خواهد داشت.",
  },
  {
    id: 4,
    title: "تجربه تحقیقاتی یا کاری ناکافی",
    description:
      "بسیاری از دانشگاه‌ها به دنبال دانشجویانی هستند که تجربه تحقیقاتی یا کاری مرتبط با رشته مورد نظر داشته باشند. اگر شما تجربه کافی در این زمینه نداشته باشید، احتمال رد درخواست شما افزایش می‌یابد.",
  },
];

const ReasonDetail = () => {
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [isViewDrawerOpen, setIsViewDrawerOpen] = useState(false);

  const { params } = useQueryParams();

  useTitle({
    breadcrumbItems: [
      {
        title: <Link to={INTERNATIONAL_BASIC_INFO_ROUTE}>اطلاعات پایه</Link>,
      },
      {
        title: <Link to={INTERNATIONAL_BASIC_INFO_REASONS_ROUTE}>انواع دلایل</Link>,
      },
      {
        title:
          params?.statusId === "1"
            ? "رد درخواست"
            : params?.statusId === "2"
              ? "تأیید درخواست"
              : params?.statusId === "3"
                ? "اصلاح درخواست"
                : "",
      },
    ],
  });
  //* ================================ Util Functions ================================
  const openAddDrawerHandler = () => {
    setIsAddDrawerOpen(true);
  };
  const closeAddDrawerHandler = () => {
    setIsAddDrawerOpen(false);
  };
  const closeViewDrawerHandler = () => {
    setIsViewDrawerOpen(false);
  };
  const closeEditDrawerHandler = () => {
    setIsEditDrawerOpen(false);
  };
  const onClickHandlerView = () => {
    setIsViewDrawerOpen(true);
  };
  const onClickHandlerEdit = () => {
    setIsEditDrawerOpen(true);
  };
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

  return (
    <>
      {isAddDrawerOpen && (
        <CustomDrawer
          onClose={closeAddDrawerHandler}
          open={isAddDrawerOpen}
          className="international-reason-detail-page-drawer"
          closeIcon={<AiOutlineClose />}
          content={<AddReasonDrawerContent closeDrawerHandler={closeAddDrawerHandler} />}
        />
      )}
      {isEditDrawerOpen && (
        <CustomDrawer
          onClose={closeEditDrawerHandler}
          open={isEditDrawerOpen}
          className="international-reason-detail-page-drawer"
          closeIcon={<AiOutlineClose />}
          content={
            <EditReasonDrawerContent closeDrawerHandler={closeEditDrawerHandler} />
          }
        />
      )}
      {isViewDrawerOpen && (
        <CustomDrawer
          onClose={closeViewDrawerHandler}
          open={isViewDrawerOpen}
          className="international-reason-detail-page-drawer"
          closeIcon={<AiOutlineClose />}
          content={
            <ViewReasonDrawerContent closeDrawerHandler={closeViewDrawerHandler} />
          }
        />
      )}
      <div className="international-reason-detail-page-container">
        <CustomDivider
          text="لیست دلایل تعریف شده"
          extraContent={
            <div className="divider-btn">
              <CustomButton
                className="cursor-default! border-transparent! text-[#1f1f1f]!"
                disabled
                icon={<PiHash />}
              >
                تعداد دلایل: {dataSource.length}
              </CustomButton>
              <CustomButton
                type="primary"
                icon={<AiOutlinePlus />}
                iconPlacement="end"
                onClick={openAddDrawerHandler}
              >
                افزودن دلیل
              </CustomButton>
            </div>
          }
        />
        <ToolBox
          rightSide={
            <CustomButton
              icon={<AiOutlineFilter />}
              //   onClick={onClickHomeActionBarFilter}
            >
              فیلتر پیشرفته
            </CustomButton>
          }
          leftSide={
            <CustomButton>
              خروجی <IoIosArrowDown />
            </CustomButton>
          }
        />
        <CustomTable
          dataSource={dataSource}
          rowKey="id"
          columns={InternationalReasonDetailTableModel({
            onClickHandlerView: onClickHandlerView,
            onClickHandlerEdit: onClickHandlerEdit,
          })}
          pagination={paginationConfig}
          // todo[Atefeh]: uncomment when api got ready
          // pagination={manualPaginationConfig({
          //   total: habitantsListCount?.data,
          //   onChange: (page, pageSize) => {
          //     setSearchParams({
          //       ...params,
          //       page: page?.toString(),
          //       pageSize: pageSize?.toString(),
          //     });
          //   },
          //   pageNumber: params?.page ? Number(params?.page) : 1,
          //   defaultPageSize: params?.pageSize ? Number(params?.pageSize) : 8,
          // })}
          // loading={isGetHabitantsListLoading || isGetHabitantsListCountLoading}
          className="international-reason-detail-table-model-container"
          // key={`table-${params?.pageSize || "8"}`}
          {...TABLE_PROPS(dataSource?.length)}
        />
      </div>
    </>
  );
};

export default ReasonDetail;
