import { Descriptions, DescriptionsProps, Row } from "antd";
import { PiReceipt } from "react-icons/pi";
import { Link } from "react-router";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FINANCE_MY_INVOICES_AND_DOCS_FACTOR_DETAIL_PAGE_ROUTE } from "@infra/router/routes/finance";

import { MyBranchInvoicesAndDocsDebtDetailDrawerContentPropsType } from "./@types/@myBranchInvoicesAndDocsDebtDetailDrawerContentPropsType";
import "./_myBranchInvoicesAndDocsDetailDebtDocumentDrawerContent.scss";

const userInfoItemsPaymentOnAccount: DescriptionsProps["items"] = [
  {
    key: "1",
    label: "نام کسب و کار",
    children: "دانشگاه آزاد اسلامی",
  },
  {
    key: "2",
    label: " شعبه / واحد (ذینفع)",
    children: "تهران جنوب",
  },
  {
    key: "3",
    label: "کد شعبه",
    children: "1564",
  },
];

const MyBranchInvoicesAndDocsDetailDebtDocumentDrawerContent = ({
  closeDrawerHandler,
}: MyBranchInvoicesAndDocsDebtDetailDrawerContentPropsType) => {
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <div className="my-branch-invoices-and-docs-detail-debt-drawer-content-container">
      <CustomDrawerHeader title="مشاهده سند" closeDrawerHandler={closeDrawerHandler} />
      <CustomDivider
        text="اطلاعات سند"
        extraContent={
          <Link
            className="custom-link"
            to={FINANCE_MY_INVOICES_AND_DOCS_FACTOR_DETAIL_PAGE_ROUTE}
          >
            <PiReceipt />
            مشاهده فاکتور
          </Link>
        }
      />
      <Row gutter={[16, 16]}>
        <SingleVerticalWithCol
          xl={12}
          lg={12}
          md={12}
          label="مبلغ (تومان)"
          value={dataPlaceHolder({ data: "700000", isPrice: true, isRial: true })}
        />
        <SingleVerticalWithCol
          xl={12}
          lg={12}
          md={12}
          label="شماره سند دانشجویار"
          value="1403020203"
        />
        <SingleVerticalWithCol
          xl={12}
          lg={12}
          md={12}
          label="تاریخ و زمان ثبت سند"
          value={dataPlaceHolder({
            data: "2025-10-22T17:51:39.588656",
            isDate: true,
            customDateFormat: "YYYY/MM/DD, HH:mm",
          })}
        />
        <SingleVerticalWithCol xl={12} lg={12} md={12} label="نوع سند" value="بدهکاری" />
        <SingleVerticalWithCol
          xl={12}
          lg={12}
          md={12}
          label="علت بدهکاری"
          value="عودت وجه"
        />
        <SingleVerticalWithCol
          xl={12}
          lg={12}
          md={12}
          label="وضعیت تسویه"
          value="تسویه نشده"
        />
        <SingleVerticalWithCol xl={12} lg={12} md={12} label="سرویس" value="خوابگاه" />
        <SingleVerticalWithCol
          span={24}
          label="شرح سند"
          value="شرح سند وارد شده توسط سیستم اینجا نمایش داده میشود.
شرح سند وارد شده توسط سیستم اینجا نمایش داده میشود.
شرح سند وارد شده توسط سیستم اینجا نمایش داده میشود.
شرح سند وارد شده توسط سیستم اینجا نمایش داده میشود."
        />
      </Row>

      <CustomDivider
        text="پرداخت شده به"
        extraContent={
          <Link className="custom-link" to="#">
            <PiReceipt />
            پروفایل کسب و کار
          </Link>
        }
      />

      <Descriptions
        className="custom-descriptions"
        column={1}
        items={userInfoItemsPaymentOnAccount}
        labelStyle={{
          fontWeight: "bold",
          textAlign: "right",
          width: "180px",
        }}
      />
    </div>
  );
};
export default MyBranchInvoicesAndDocsDetailDebtDocumentDrawerContent;
