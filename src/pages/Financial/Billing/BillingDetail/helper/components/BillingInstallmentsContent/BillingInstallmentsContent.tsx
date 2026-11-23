import { Button, Steps, Tabs } from "antd";
import moment from "jalali-moment";

import CustomCard from "@components/CustomCard/CustomCard";
import SingleVerticalItem from "@components/Renderers/SingleVerticalItem/SingleVerticalItem";
import { PADDING_20 } from "@infra/VARS/globalStyles/globalStyles";
import "./_billingInstallmentsContent.scss";

//Settlement and installments content
type Data = {
  finalPrice: string;
  fine: string;
  dueDate: string;
  settleDate: string;
  accNumber: string;
  paymentType: string;
  receiverId: string;
  terminalNumber: string;
  traceNumber: string;
  referenceNumber: string;
};
type StepsDataType = {
  id: number;
  title: string;
  subTitle: string;
  status: "error" | "wait" | "process" | "finish" | undefined;
  data: Data;
};
const stepsData: StepsDataType[] = [
  {
    id: 1,
    title: "قسط اول",
    subTitle: "تسویه شده",
    status: "finish",
    data: {
      accNumber: "a",
      dueDate: new Date().toISOString(),
      finalPrice: "a",
      fine: "a",
      paymentType: "a",
      receiverId: "a",
      referenceNumber: "a",
      settleDate: new Date().toISOString(),
      terminalNumber: "a",
      traceNumber: "a",
    },
  },
  {
    id: 2,
    title: "قسط دوم",
    subTitle: "سر رسید شده",
    status: "error",
    data: {
      accNumber: "12345678912345",
      dueDate: new Date().toISOString(),
      finalPrice: "a",
      fine: "a",
      paymentType: "a",
      receiverId: "a",
      referenceNumber: "a",
      settleDate: new Date().toISOString(),
      terminalNumber: "a",
      traceNumber: "a",
    },
  },
  {
    id: 3,
    title: "قسط سوم",
    subTitle: "در انتظار تسویه",
    status: "process",
    data: {
      accNumber: "a",
      dueDate: new Date().toISOString(),
      finalPrice: "a",
      fine: "a",
      paymentType: "a",
      receiverId: "a",
      referenceNumber: "a",
      settleDate: new Date().toISOString(),
      terminalNumber: "a",
      traceNumber: "a",
    },
  },
];

const DescGenerator = ({
  data,
  title,
  subTitle,
}: {
  data: Data;
  title: string;
  subTitle: string;
}) => {
  const showFactor = () => {};
  return (
    <div className="billing-installments-descGenerator">
      <div className="title-wrapper">
        <span className="title">{title}</span>
        <span className="sub-title">{subTitle}</span>
      </div>

      <CustomCard padding={PADDING_20} className="custom-card-contents">
        <SingleVerticalItem label="مبلغ نهایی" value={data?.finalPrice} />
        <SingleVerticalItem label="جریمه دیرکرد" value={data?.fine} />
        <SingleVerticalItem
          label="تاریخ سر رسید"
          value={moment(new Date(data?.dueDate)).locale("fa").format("HH:mm - YYYY/M/D")}
        />
        <SingleVerticalItem
          label="تاریخ تسویه"
          value={moment(new Date(data?.settleDate))
            .locale("fa")
            .format("HH:mm - YYYY/M/D")}
        />
        <SingleVerticalItem label="شماره صورتحساب مربوطه" value={data?.accNumber} />
        <SingleVerticalItem label=" روش پرداخت" value={data?.paymentType} />

        {subTitle === "تسویه شده" ? (
          <>
            <SingleVerticalItem label="شناسه پذیرنده" value={data?.receiverId} />
            <SingleVerticalItem label="شماره پایانه" value={data?.terminalNumber} />
            <SingleVerticalItem label="شماره پیگیری" value={data?.traceNumber} />
            <SingleVerticalItem label="شماره مرجع" value={data?.referenceNumber} />
            <div className="btn-wrapper">
              <Button
                type="primary"
                ghost
                className="desc-generator-btn"
                onClick={showFactor}
              >
                مشاهده فاکتور
              </Button>
            </div>
          </>
        ) : (
          <div className="btn-wrapper">
            <Button
              type="primary"
              ghost
              className="desc-generator-btn"
              onClick={showFactor}
            >
              مشاهده فاکتور
            </Button>
            <Button
              type="primary"
              ghost
              className="desc-generator-btn"
              onClick={showFactor}
            >
              ارسال اعلان تسویه
            </Button>
          </div>
        )}
      </CustomCard>
    </div>
  );
};

//installment Content
const InstallmentsContent = () => {
  return (
    <div className="installment-content-container">
      <Steps
        orientation="vertical"
        size="small"
        current={3}
        items={stepsData?.map((item) => {
          return {
            description: (
              <DescGenerator
                data={item?.data}
                title={item?.title}
                subTitle={item?.subTitle}
              />
            ),
            status: item?.status,
          };
        })}
      />
    </div>
  );
};

//related bills content
const RelatedBillsContent = () => {
  const dataArray = [
    {
      id: 1,
      factorNo: "65402019658",
      createDate: new Date().toISOString(),
      status: "ابطال شده",
      finalPrice: "2,000,000",
      fine: "2,000,000",
      dueDate: new Date().toISOString(),
      settleDate: new Date().toISOString(),
      user: "محمد احمدی",
      userId: "65402019658",
    },
    {
      id: 2,
      factorNo: "65402019658",
      createDate: new Date().toISOString(),
      status: "ابطال شده",
      finalPrice: "2,000,000",
      fine: "2,000,000",
      dueDate: new Date().toISOString(),
      settleDate: new Date().toISOString(),
      user: "محمد احمدی",
      userId: "65402019658",
    },
    {
      id: 3,
      factorNo: "65402019658",
      createDate: new Date().toISOString(),
      status: "ابطال شده",
      finalPrice: "2,000,000",
      fine: "2,000,000",
      dueDate: new Date().toISOString(),
      settleDate: new Date().toISOString(),
      user: "محمد احمدی",
      userId: "65402019658",
    },
  ];
  return (
    <div className="billing-related-bills-content-container">
      {dataArray?.map((item) => (
        <CustomCard
          padding={PADDING_20}
          key={item.id}
          className="billing-related-bills-content"
        >
          <SingleVerticalItem label="شماره فاکتور مربوطه" value={item.factorNo} />
          <SingleVerticalItem
            label="تاریخ ایجاد"
            value={moment(new Date(item.createDate))
              .locale("fa")
              .format("HH:mm - YYYY/M/D")}
          />
          <SingleVerticalItem label="وضعیت" value={item.status} />
          <SingleVerticalItem label="مبلغ نهایی" value={item.finalPrice} />
          <SingleVerticalItem label="جریمه دیرکرد" value={item.fine} />
          <SingleVerticalItem
            label="تاریخ سر رسید"
            value={moment(new Date(item.dueDate)).locale("fa").format("HH:mm - YYYY/M/D")}
          />
          <SingleVerticalItem
            label="تاریخ تسویه"
            value={moment(new Date(item.settleDate))
              .locale("fa")
              .format("HH:mm - YYYY/M/D")}
          />
          <SingleVerticalItem label="کاربر اقدام کننده" value={item.user} />
          <SingleVerticalItem label="شناسه کاربر اقدام کننده" value={item.userId} />
          <Button
            type="primary"
            ghost
            className="desc-generator-btn"
            // onClick={showFactor}
          >
            مشاهده فاکتور
          </Button>
        </CustomCard>
      ))}
    </div>
  );
};

//billing installment tabs
const BillingInstallmentsContent = () => {
  const onTabChange = () => {};
  const onTabEdit = () => {};

  const tabsItems = [
    {
      label: "تسویه و اقساط",
      children: <InstallmentsContent />,
      key: "1",
    },
    {
      label: "صورتحساب های مرتبط",
      children: <RelatedBillsContent />,
      key: "2",
    },
  ];
  return (
    <div className="billing-installment-content-container">
      <Tabs
        type="line"
        onChange={onTabChange}
        // activeKey={"1"}
        onEdit={onTabEdit}
        items={tabsItems}
        className="bulling-detail-tabs-container"
      />
    </div>
  );
};
export default BillingInstallmentsContent;
