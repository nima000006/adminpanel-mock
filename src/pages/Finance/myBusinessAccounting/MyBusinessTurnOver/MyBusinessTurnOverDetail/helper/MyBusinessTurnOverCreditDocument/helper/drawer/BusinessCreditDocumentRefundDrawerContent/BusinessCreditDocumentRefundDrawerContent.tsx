import { Descriptions, DescriptionsProps, Row } from "antd";
import { PiReceipt, PiUser } from "react-icons/pi";
import { Link } from "react-router";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import paginationConfig from "@infra/helpers/TableHelpers/config/tableConfig";
import TABLE_PROPS from "@infra/helpers/TableHelpers/config/TableProps";
import { TOP_BAR_PROFILE_PAGE_ROUTE } from "@infra/router/routes/topBarItem";
import { dataSourceType } from "@pages/Finance/MyBranchAccounting/MyBranchTurnOver/MyBranchTurnOverDetail/helper/MyBranchTurnOverDebitDocument/helper/drawer/BranchCreditDocumentRefundDrawerContent/@types/@branchCreditDocumentRefundDrawerContent";

import BusinessCreditDocumentRefundDrawerContentTableModel from "../../model/BusinessCreditDocumentRefundDrawerContentTableModel";

import "./_businessCreditDocumentRefundDrawerContent.scss";

const dataSource: dataSourceType[] = [
  {
    id: 1,
    business: "صمیم رایانه",
    branch: "دانشجویار",
    shareOfReturn: 70000,
    sharePercentage: "66.6%",
  },
  {
    id: 2,
    business: "دانشگاه آزاد اسلامی",
    branch: "تهران جنوب",
    shareOfReturn: 700000,
    sharePercentage: "6.6%",
  },
  {
    id: 3,
    business: "دانشگاه آزاد اسلامی",
    branch: "تهران جنوب",
    shareOfReturn: 788800000,
    sharePercentage: "5.6%",
  },
  {
    id: 4,
    business: "دانشگاه آزاد اسلامی",
    branch: "تهران جنوب",
    shareOfReturn: 800000,
    sharePercentage: "7.6%",
  },
];

const itemsTypeOne: DescriptionsProps["items"] = [
  {
    key: "1",
    label: "نام",
    children: <p>علی</p>,
  },
  {
    key: "2",
    label: "نام خانوادگی",
    children: <p>رضایی</p>,
  },
  {
    key: "3",
    label: "کد ملی / کد فراگیر",
    children: <p>0021116090</p>,
  },
  {
    key: "4",
    label: "شماره دانشجویی",
    children: <p>40021441054099</p>,
  },
  {
    key: "5",
    label: "شماره همراه",
    children: <p>۰۹۱۲ ۲۴۵ ۵۹۱۰</p>,
  },
  {
    key: "6",
    label: "مقطع تحصیلی",
    children: <p>کارشناسی </p>,
  },
  {
    key: "7",
    label: "رشته تحصیلی",
    children: <p>مدیریت بازرگانی </p>,
  },
  {
    key: "8",
    label: "کسب و کار",
    children: <p>دانشگاه ازاد اسلامی</p>,
  },
  {
    key: "9",
    label: "واحد / شعبه",
    children: <p>تهران مرکز</p>,
  },
  {
    key: "10",
    label: "نام دانشکده",
    children: <p>مدیریت</p>,
  },
];
const BusinessCreditDocumentRefundDrawerContent = ({
  closeDrawerHandler,
}: {
  closeDrawerHandler: () => void;
}) => {
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="my-business-turn-over-credit-document-refund-drawer-content-container">
      <CustomDrawerHeader title="مشاهده سند" closeDrawerHandler={closeDrawerHandler} />
      <div>
        <CustomDivider
          text="اطلاعات سند"
          extraContent={
            <Link className="custom-link" to="#">
              <PiReceipt />
              مشاهده فاکتور
            </Link>
          }
        />
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol
            value="140,000,000 تومان"
            label="مبلغ"
            md={12}
            lg={12}
            xl={12}
          />
          <SingleVerticalWithCol
            label="شماره سند دانشجویار"
            value="1403020203"
            md={12}
            lg={12}
            xl={12}
          />
          <SingleVerticalWithCol
            value="1403/02/02, 10:20"
            label="تاریخ و زمان ثبت سند"
            md={12}
            lg={12}
            xl={12}
          />
          <SingleVerticalWithCol
            value="بستانکاری"
            label="نوع سند"
            md={12}
            lg={12}
            xl={12}
          />
          <SingleVerticalWithCol
            value="عودت وجه"
            label="علت بستانکاری"
            md={12}
            lg={12}
            xl={12}
          />
          <SingleVerticalWithCol
            value="تسویه نشده"
            label="وضعیت تسویه"
            md={12}
            lg={12}
            xl={12}
          />
          <SingleVerticalWithCol value="خوابگاه" label="سرویس" xl={12} md={12} lg={12} />
          <SingleVerticalWithCol
            value="شرح سند وارد شده توسط سیستم اینجا نمایش داده میشود.
شرح سند وارد شده توسط سیستم اینجا نمایش داده میشود.
شرح سند وارد شده توسط سیستم اینجا نمایش داده میشود.
شرح سند وارد شده توسط سیستم اینجا نمایش داده میشود."
            label="شرح سند"
            span={24}
          />
        </Row>
      </div>

      <div>
        <CustomDivider text="سهم ذینفعان" />
        <CustomTable<dataSourceType>
          rowKey="id"
          dataSource={dataSource}
          className="accounting-document-creditor-drawer-table-container"
          columns={BusinessCreditDocumentRefundDrawerContentTableModel()}
          pagination={paginationConfig}
          {...TABLE_PROPS(dataSource.length || 0)}
        />
        <CustomDivider
          text="کاربر دریافت کننده وجه عودت شده"
          extraContent={
            <Link className="custom-link" to={TOP_BAR_PROFILE_PAGE_ROUTE}>
              <PiUser />
              مشاهده پروفایل
            </Link>
          }
        />
        <Descriptions
          className="custom-description"
          items={itemsTypeOne}
          column={1}
          styles={{ label: { width: 165 } }}
        />
      </div>
    </div>
  );
};
export default BusinessCreditDocumentRefundDrawerContent;
