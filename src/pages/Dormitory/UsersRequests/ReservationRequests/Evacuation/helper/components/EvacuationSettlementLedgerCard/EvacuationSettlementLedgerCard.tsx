import { Timeline } from "antd";
import { AiOutlineArrowLeft, AiOutlineDown } from "react-icons/ai";

import { CustomButton } from "@components/CustomInputs";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { EvacuationLedgerVariant } from "@pages/Dormitory/UsersRequests/ReservationRequests/Evacuation/@types/@evacuationSettlement";
import { EvacuationSettlementLedgerCardProps } from "@pages/Dormitory/UsersRequests/ReservationRequests/Evacuation/helper/components/EvacuationSettlementLedgerCard/@types/@evacuationSettlementLedgerCardTypes";

const HEADER_CLASS_BY_VARIANT: Record<EvacuationLedgerVariant, string> = {
  deposit: "bg-primary-1 border-primary-8 text-primary-7",
  debtor: "bg-dustred-1 border-dustred-6 text-dustred-6",
  creditor: "bg-yellow-1 border-orange-6 text-orange-6",
  settled: "bg-green-1 border-green-6 text-green-6",
};

const EvacuationSettlementLedgerCard = ({
  data,
}: EvacuationSettlementLedgerCardProps) => {
  const hasAmount = data.amountRial != null;
  const headerClassName = HEADER_CLASS_BY_VARIANT[data.variant];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="flex h-full w-full flex-col text-right" dir="rtl">
      <div
        className={`flex items-center justify-center rounded-t-2xl border-b border-dashed px-6 py-2 ${headerClassName}`}
      >
        <p className="text-center text-xl font-medium">{data.title}</p>
      </div>

      {hasAmount ? (
        <div className="bg-neutral-2 flex items-center justify-center px-6 py-2">
          <span className="text-neutral-13 text-xl font-medium">
            {dataPlaceHolder({
              data: data.amountRial,
              isPrice: true,
              isRial: true,
              currency: { isAvailable: true, type: "تومان" },
            })}
          </span>
        </div>
      ) : null}

      <div className="bg-neutral-2 flex flex-1 flex-col gap-4 rounded-b-2xl p-4">
        <p className="text-neutral-7 text-sm">جزییات هزینه ها و پرداخت ها</p>

        <Timeline
          mode="start"
          items={data.items.map((item) => {
            const isCreditor = item.side === "creditor";
            const absoluteAmount = Math.abs(item.amountRial);
            const sign = isCreditor ? "+" : "-";

            return {
              key: item.id,
              color: isCreditor ? "green" : "red",
              content: (
                <div className="flex w-full flex-col items-start gap-2 pb-2 text-right">
                  <span className="text-neutral-9 text-sm">{item.title}</span>
                  <span className="text-neutral-7 text-xs">
                    {isCreditor ? "بستانکار" : "بدهکار"}
                  </span>
                  <span className="text-neutral-13 text-base font-bold">
                    {dataPlaceHolder({
                      data: absoluteAmount,
                      isPrice: true,
                      isRial: true,
                    })}
                    {sign}
                  </span>
                  <CustomButton icon={<AiOutlineArrowLeft />} iconPlacement="end">
                    جزییات
                  </CustomButton>
                </div>
              ),
            };
          })}
        />

        {data.showViewAll ? (
          <div className="mt-auto flex justify-start">
            <CustomButton type="link" icon={<AiOutlineDown />} iconPlacement="end">
              مشاهده همه
            </CustomButton>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default EvacuationSettlementLedgerCard;
