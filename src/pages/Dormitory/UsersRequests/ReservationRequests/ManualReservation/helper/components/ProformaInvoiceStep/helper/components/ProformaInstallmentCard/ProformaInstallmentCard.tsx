import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { ProformaInstallmentCardProps } from "@pages/Dormitory/UsersRequests/ReservationRequests/ManualReservation/helper/components/ProformaInvoiceStep/helper/components/ProformaInstallmentCard/@types/@proformaInstallmentCard";

const ProformaInstallmentCard = ({ item }: ProformaInstallmentCardProps) => {
  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="border-neutral-4 bg-neutral-1 flex w-full items-stretch gap-2 overflow-hidden rounded-lg border p-2">
      <div className="bg-neutral-1 flex shrink-0 flex-col items-center justify-center rounded-lg p-2">
        <CustomTag color="orange" className="m-0! w-fit">
          {dataPlaceHolder({ data: item.label })}
        </CustomTag>
      </div>

      <div className="border-neutral-5 self-stretch border-l border-dashed" />

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex flex-col gap-1">
          <p className="footnote text-neutral-7 m-0">تاریخ سررسید</p>
          <p className="body-regular text-neutral-11 m-0">
            {dataPlaceHolder({ data: item.dueDate })}
          </p>
        </div>

        <div className="flex items-center gap-0.5 py-1">
          <p className="body-regular text-neutral-7 m-0">تومان</p>
          <p className="text-neutral-12 m-0 text-[20px] font-medium">
            {dataPlaceHolder({
              data: item.amount,
              isPrice: true,
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProformaInstallmentCard;
