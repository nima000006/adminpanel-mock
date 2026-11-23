import { Descriptions, DescriptionsProps, Row } from "antd";
import { PiBriefcaseLight, PiReceipt } from "react-icons/pi";
import { Link } from "react-router";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { dataPlaceHolder } from "@infra/helpers/utils";

import { OnAccountTransactionDetailDrawerProps } from "../@type/@onAccountTransactionDetailDrawerType";
import "./_onAccountTransactionDetailDrawerContent.scss";

const OnAccountTransactionDetailDrawerContent = ({
  closeDrawer,
  data,
  id,
}: OnAccountTransactionDetailDrawerProps) => {
  const TransactionData = data.find((item: any) => item.id === id);
  const userInfoItems: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "نام کسب و کار  ",
      children: TransactionData?.firstName,
    },
    {
      key: "2",
      label: "شعبه / واحد",
      children: TransactionData?.lastName,
    },
    {
      key: "3",
      label: "ذینفع",
      children: TransactionData?.nationalId,
    },
    {
      key: "4",
      label: "کد شعبه",
      children: TransactionData?.studentCode,
    },
    {
      key: "5",
      label: "استان",
      children: TransactionData?.mobile,
    },
    {
      key: "6",
      label: "شهر",
      children: TransactionData?.branchCode,
    },
    {
      key: "7",
      label: "رشته تحصیلی",
      children: TransactionData?.branchCode,
    },
    {
      key: "8",
      label: "شماره همراه",
      children: TransactionData?.business,
    },
  ];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="on-account-transaction-drawer-content-container">
      <CustomDrawerHeader title="جزئیات بیشتر تراکنش" closeDrawerHandler={closeDrawer} />

      <div>
        <CustomDivider
          text="اطلاعات تراکنش"
          extraContent={
            <Link to={""} className="divider-extra-content">
              <PiReceipt size={16} /> فاکتور
            </Link>
          }
        />
        <Row gutter={[16, 16]}>
          <SingleVerticalWithCol
            label="مبلغ علی الحساب (تومان)"
            value={dataPlaceHolder({ data: TransactionData?.amount, isPrice: true })}
            xs={12}
            lg={12}
            xl={12}
          />
          <SingleVerticalWithCol
            label="شناسه تراکنش"
            value={TransactionData?.transactionId}
            xs={12}
            lg={12}
            xl={12}
          />
          <SingleVerticalWithCol
            label="تاریخ و ساعت تراکنش"
            value={dataPlaceHolder({ data: TransactionData?.date, isDate: true })}
            xs={12}
            lg={12}
            xl={12}
          />
          <SingleVerticalWithCol
            label="سرویس"
            value={TransactionData?.service}
            xs={12}
            lg={12}
            xl={12}
          />
        </Row>
      </div>
      <div>
        <CustomDivider
          text="دریافت کننده علی الحساب"
          extraContent={
            <Link to={""} className="divider-extra-content">
              <PiBriefcaseLight size={16} /> پروفایل کسب و کار
            </Link>
          }
        />
        <Descriptions
          className="transaction-detail-user-descriptions"
          column={1}
          items={userInfoItems}
          labelStyle={{
            fontWeight: "bold",
            textAlign: "right",
            width: "180px",
          }}
        />
      </div>
    </div>
  );
};
export default OnAccountTransactionDetailDrawerContent;
