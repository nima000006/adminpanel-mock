import { PiWarningCircle } from "react-icons/pi";

import CustomCard from "@components/Renderers/CustomCard/CustomCard";
import { CustomChart } from "@components/Renderers/CustomChart";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import FinanceBusinessOwnerCardTitle from "@pages/Reports/myReport/StaticReports/Finance/FinanceBusinessOwner/helper/components/_shared/helper/components/FinanceBusinessOwnerCardTitle/FinanceBusinessOwnerCardTitle";
import { FinanceBusinessOwnerPaymentMockDataType } from "@pages/Reports/myReport/StaticReports/Finance/FinanceBusinessOwner/helper/components/FinanceBusinessOwnerPayment/@types/@financeBusinessOwnerPayment";
import FinanceBusinessOwnerPaymentTableModel from "@pages/Reports/myReport/StaticReports/Finance/FinanceBusinessOwner/helper/components/FinanceBusinessOwnerPayment/helper/models/FinanceBusinessOwnerPaymentTableModel";

const mockData = [
  {
    category: "",
    paid: 18,
    waiting: 32,
    payable: 48,
    unavailable: 22,
  },
];

const dataSource: FinanceBusinessOwnerPaymentMockDataType[] = [
  {
    id: 1,
    paymentDate: "07/20/2026",
    paidAmount: 90000000,
    business: "دانشگاه آزاد",
    branch: "تهران جنوب",
    service: "FOOD",
  },
  {
    id: 2,
    paymentDate: "07/20/2026",
    paidAmount: 90000000,
    business: "دانشگاه آزاد",
    branch: "تهران جنوب",
    service: "CONSULTANT",
  },
  {
    id: 3,
    paymentDate: "07/20/2026",
    paidAmount: 90000000,
    business: "دانشگاه آزاد",
    branch: "تهران جنوب",
    service: "ROOM",
  },
  {
    id: 4,
    paymentDate: "07/20/2026",
    paidAmount: 90000000,
    business: "دانشگاه آزاد",
    branch: "تهران جنوب",
    service: "FOOD",
  },
];
const FinanceBusinessOwnerPayment = () => {
  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

  return (
    <>
      <CustomCard
        title={
          <FinanceBusinessOwnerCardTitle
            title="وضعیت پرداخت‌ اسناد"
            icon={<PiWarningCircle className="text-warning-500" />}
          />
        }
        className="mt-10! pb-5!"
      >
        <CustomChart
          type="bar"
          data={{
            dataset: mockData,
            xAxis: [
              {
                scaleType: "band",
                data: [""],
                categoryGapRatio: 0.2,
                barGapRatio: 5,
              },
            ],
            yAxis: [
              {
                position: "right",
                min: 0,
                max: 60,
                tickNumber: 7,
                valueFormatter: (value: unknown) => `${value}m`,
              },
            ],
            series: [
              {
                dataKey: "unavailable",
                label: "غیر قابل پرداخت",
                color: "var(--color-error-500)",
              },
              {
                dataKey: "payable",
                label: "قابل پرداخت",
                color: "var(--color-primary-5)",
              },
              {
                dataKey: "waiting",
                label: "در صف پرداخت",
                color: "var(--color-orange-6)",
              },
              {
                dataKey: "paid",
                label: "پرداخت شده",
                color: "var(--color-green)",
              },
            ],
            margin: {
              top: 20,
              bottom: 40,
              left: 20,
              right: 20,
            },
          }}
          config={{
            height: 400,
            grid: {
              horizontal: true,
              vertical: false,
            },
            legend: {
              direction: "row",
              position: {
                vertical: "bottom",
                horizontal: "middle",
              },
            },
          }}
        />
      </CustomCard>
      <CustomDivider text="پرداختی ها" />
      <CustomTable<FinanceBusinessOwnerPaymentMockDataType>
        dataSource={dataSource}
        rowKey="id"
        loading={false}
        columns={FinanceBusinessOwnerPaymentTableModel()}
        pagination={false}
      />
    </>
  );
};

export default FinanceBusinessOwnerPayment;
