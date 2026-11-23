import { Descriptions, DescriptionsProps } from "antd";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "@infra/helpers/utils";

const mockData = {
  title: "جبران خسارت",
  number: "45155465412312.134246456",
  paymentMethod: "قسطی/4قسط",
};

const mockPayableAmounts = [
  {
    id: 1,
    title: "پیش پرداخت",
    amount: "15000000",
  },
  {
    id: 2,
    title: "قسط اول",
    amount: "15000000",
  },
  {
    id: 3,
    title: "قسط دوم",
    amount: "15000000",
  },
];

const AddFactorThirdStepDrawerContent = () => {
  const factorInfoItems: DescriptionsProps["items"] = mockData
    ? [
        {
          key: "1",
          label: "عنوان ",
          children: dataPlaceHolder({
            data: mockData.title,
          }),
        },
        {
          key: "2",
          label: "شماره فاکتور",
          children: dataPlaceHolder({ data: mockData.number }),
        },
        {
          key: "3",
          label: "روش پرداخت",
          children: dataPlaceHolder({ data: mockData.paymentMethod }),
        },
      ]
    : [];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <CustomDivider text="جزییات فاکتور" />
        <Descriptions
          className="all-transaction-detail-user-descriptions"
          column={1}
          items={factorInfoItems}
          styles={{
            label: {
              fontWeight: "bold",
              textAlign: "right",
              width: "150px",
            },
            content: {
              textAlign: "left",
            },
          }}
        />
      </div>

      <div className="flex flex-col gap-6">
        <CustomDivider text="مبلغ قابل پرداخت فاکتور " />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-2">
          {mockPayableAmounts.map((item) => (
            <div className="border-neutral-4 bg-neutral-1 flex gap-2 rounded-lg border p-2">
              <div className="bg-neutral-1 flex shrink-0 flex-col items-center justify-center gap-2 rounded-lg p-2">
                <CustomTag color="orange" className="w-fit">
                  {item?.title}
                </CustomTag>
              </div>

              <div className="border-neutral-5 self-stretch border-l border-dashed" />

              <div className="flex min-w-0 flex-1 flex-col items-stretch gap-1">
                <div className="flex flex-col gap-1">
                  <span className="text-neutral-7 text-xs">تاریخ سررسید</span>
                  <span className="text-neutral-11 text-sm">
                    {dataPlaceHolder({
                      data: "1402/01/01",
                      isDate: true,
                      customDateFormat: "YYYY/MM/DD",
                    })}
                  </span>
                </div>

                <span className="text-neutral-12 text-[20px] font-medium">
                  {dataPlaceHolder({
                    data: item?.amount,
                    isPrice: true,
                    isRial: true,
                    currency: { isAvailable: true, type: "تومان" },
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddFactorThirdStepDrawerContent;
