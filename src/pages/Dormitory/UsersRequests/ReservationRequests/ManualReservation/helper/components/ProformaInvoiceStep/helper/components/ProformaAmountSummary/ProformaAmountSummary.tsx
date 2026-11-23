import { dataPlaceHolder } from "@infra/helpers/utils";
import { ProformaAmountSummaryProps } from "@pages/Dormitory/UsersRequests/ReservationRequests/ManualReservation/helper/components/ProformaInvoiceStep/helper/components/ProformaAmountSummary/@types/@proformaAmountSummary";

const ProformaAmountSummary = ({
  label,
  amount,
  variant,
}: ProformaAmountSummaryProps) => {
  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div
      className={`flex flex-1 items-center justify-center rounded-lg p-3 ${
        variant === "deposit" ? "bg-yellow-1" : "bg-green-1"
      }`}
    >
      <div className="flex w-full flex-col items-center gap-1 text-center">
        <p className="body-regular text-neutral-8 m-0 w-full">{label}</p>
        <p className="text-neutral-11 m-0 w-full font-bold">
          {dataPlaceHolder({
            data: amount,
            isPrice: true,
            currency: { isAvailable: true, type: "تومان" },
          })}
        </p>
      </div>
    </div>
  );
};

export default ProformaAmountSummary;
