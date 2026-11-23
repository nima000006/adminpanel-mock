import { Col, Row } from "antd";
import { PiGauge, PiWarningCircle } from "react-icons/pi";

import { CustomSelect } from "@components/CustomInputs";
import CustomCard from "@components/Renderers/CustomCard/CustomCard";
import { CustomChart } from "@components/Renderers/CustomChart";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTable from "@components/Renderers/CustomTable/CustomTable";
import FinanceBusinessOwnerCardTitle from "@pages/Reports/myReport/StaticReports/Finance/FinanceBusinessOwner/helper/components/_shared/helper/components/FinanceBusinessOwnerCardTitle/FinanceBusinessOwnerCardTitle";
import { FinanceBusinessOwnerServiceMockDataType } from "@pages/Reports/myReport/StaticReports/Finance/FinanceBusinessOwner/helper/components/FinanceBusinessOwnerService/@types/@financeBusinessOwnerService";
import FinanceBusinessOwnerServiceBox from "@pages/Reports/myReport/StaticReports/Finance/FinanceBusinessOwner/helper/components/FinanceBusinessOwnerService/helper/components/FinanceBusinessOwnerServiceBox/FinanceBusinessOwnerServiceBox";
import FinanceBusinessOwnerServiceTableModel from "@pages/Reports/myReport/StaticReports/Finance/FinanceBusinessOwner/helper/components/FinanceBusinessOwnerService/helper/models/FinanceBusinessOwnerServiceTableModel";

const mockData = [
  { id: 0, value: 42, label: "بیمه" },
  { id: 1, value: 18, label: "فروشگاه" },
  { id: 2, value: 15, label: "جوایزگاه" },
  { id: 3, value: 10, label: "کتاب آموزشی" },
  { id: 4, value: 8, label: "غذایی" },
];

const dataSource: FinanceBusinessOwnerServiceMockDataType[] = [
  {
    id: 1,
    service: "FOOD",
    grossInCome: 100000,
    sharePartnersAmount: 50000,
    turnOverAmount: 10000,
    netIncome: 70000,
  },
  {
    id: 2,
    service: "ROOM",
    grossInCome: 100000,
    sharePartnersAmount: 50000,
    turnOverAmount: 10000,
    netIncome: 70000,
  },
  {
    id: 3,
    service: "CONSULTANT",
    grossInCome: 100000,
    sharePartnersAmount: 50000,
    turnOverAmount: 10000,
    netIncome: 70000,
  },
  {
    id: 4,
    service: "ROOM",
    grossInCome: 100000,
    sharePartnersAmount: 50000,
    turnOverAmount: 10000,
    netIncome: 70000,
  },
];
const FinanceBusinessOwnerService = () => {
  return (
    <>
      <Row gutter={[16, 16]} className="mt-10">
        <Col xl={12} lg={12} md={24} xs={24}>
          <CustomCard
            className="h-full!"
            title={
              <FinanceBusinessOwnerCardTitle
                title="وضعیت سرویس‌ها"
                icon={<PiWarningCircle className="text-warning-500" />}
              />
            }
          >
            <div className="flex flex-col gap-2">
              <FinanceBusinessOwnerServiceBox
                leftTitle="بیمه"
                rightTitle="کمترین درآمد"
                icon={<PiGauge color="green" />}
                iconBgClass="bg-green-100"
              />
              <FinanceBusinessOwnerServiceBox
                leftTitle="فروشگاه"
                rightTitle="بیشترین درآمد"
                icon={<PiGauge color="red" />}
                iconBgClass="bg-red-100"
              />
            </div>
          </CustomCard>
        </Col>
        <Col xl={12} lg={12} md={24} xs={24}>
          <CustomCard
            className="pb-12!"
            title={
              <>
                <FinanceBusinessOwnerCardTitle
                  title="درآمد در سرویس‌ها"
                  icon={<PiWarningCircle className="text-warning-500" />}
                />
                <CustomSelect name="search" options={[]} className="mb-5" />
              </>
            }
          >
            <CustomChart
              type="pie"
              data={{
                series: [
                  {
                    data: mockData,
                  },
                ],
              }}
              config={{
                height: 200,

                colors: [
                  "var(--color-green-6)", // بیمه
                  "var(--color-dustred-6)", // فروشگاه
                  "var(--color-primary-6)", // خوابگاه
                  "var(--color-volcano-6)", // کتاب آموزشی
                  "var(--color-yellow)", // غذایی
                ],
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
        </Col>
      </Row>
      <CustomDivider text="درآمد به تفکیک سرویس" />
      <CustomTable<FinanceBusinessOwnerServiceMockDataType>
        dataSource={dataSource}
        rowKey="id"
        loading={false}
        columns={FinanceBusinessOwnerServiceTableModel()}
        pagination={false}
      />
    </>
  );
};

export default FinanceBusinessOwnerService;
