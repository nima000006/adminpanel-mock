import { Descriptions, DescriptionsProps, Row } from "antd";
import { PiBag, PiReceipt } from "react-icons/pi";
import { Link } from "react-router";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import "./_onAccountDocumentDrawerContent.scss";

const itemsTypeTwo: DescriptionsProps["items"] = [
  {
    key: "1",
    label: "نام کسب و کار ",
    children: <p>دانشگاه آزاد اسلامی</p>,
  },
  {
    key: "2",
    label: "شعبه / واحد",
    children: <p>تهران جنوب</p>,
  },
  {
    key: "3",
    label: "کد شعبه",
    children: <p>1564</p>,
  },
];
const OnAccountDocumentDrawerContent = ({
  closeDrawerHandler,
}: {
  closeDrawerHandler: () => void;
}) => {
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="my-turn-over-on-accountant-document-drawer-container">
      <CustomDrawerHeader title="مشاهده سند" closeDrawerHandler={closeDrawerHandler} />
      <div>
        <CustomDivider
          text="اطلاعات سند"
          extraContent={
            <Link className="custom-link" to="#">
              <PiReceipt />
              مشاهده فاکتور{" "}
            </Link>
          }
        />{" "}
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol
            value="140,000,000 "
            label="مبلغ (تومان)"
            xs={12}
            lg={12}
            xl={12}
          />
          <SingleVerticalWithCol
            label="شماره سند دانشجویار"
            value="1403020203"
            xs={12}
            lg={12}
            xl={12}
          />
          <SingleVerticalWithCol
            value="1403/02/02, 10:20"
            label="تاریخ و زمان ثبت سند"
            xs={12}
            lg={12}
            xl={12}
          />
          <SingleVerticalWithCol
            value="بستانکاری"
            label="نوع سند"
            xl={12}
            xs={12}
            lg={12}
          />
          <SingleVerticalWithCol
            value="عودت وجه"
            label="علت بستانکاری"
            xl={12}
            xs={12}
            lg={12}
          />
          <SingleVerticalWithCol
            value="تسویه نشده"
            label="وضعیت تسویه"
            xl={12}
            xs={12}
            lg={12}
          />
          <SingleVerticalWithCol value="خوابگاه" label="سرویس" xl={12} xs={12} lg={12} />
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
        <CustomDivider
          text="پرداخت شده به"
          extraContent={
            <Link className="custom-link" to="#">
              <PiBag />
              پروفایل کسب و کار{" "}
            </Link>
          }
        />
        <Descriptions
          className="custom-description"
          items={itemsTypeTwo}
          column={1}
          labelStyle={{ width: 165 }}
        />
      </div>
    </div>
  );
};
export default OnAccountDocumentDrawerContent;
