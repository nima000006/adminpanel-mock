import { Descriptions } from "antd";

import { ProformaInfoCardProps } from "@pages/Dormitory/UsersRequests/ReservationRequests/ManualReservation/helper/components/ProformaInvoiceStep/helper/components/ProformaInfoCard/@types/@proformaInfoCard";
import {
  LOWER_STYLES,
  toDescriptionItems,
  UPPER_STYLES,
} from "@pages/Dormitory/UsersRequests/ReservationRequests/ManualReservation/helper/components/ProformaInvoiceStep/helper/components/ProformaInfoCard/helper/utils";

const ProformaInfoCard = ({ icon: Icon, label, up, down }: ProformaInfoCardProps) => {
  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="border-neutral-4 bg-neutral-1 flex h-full flex-col gap-4 rounded-lg border p-3">
      <div className="flex items-center gap-2">
        <Icon size={16} className="text-neutral-8 shrink-0" />
        <span className="footnote text-neutral-10">{label}</span>
      </div>

      <Descriptions
        column={2}
        colon={false}
        styles={UPPER_STYLES}
        items={toDescriptionItems(up)}
      />

      <div className="border-neutral-5 w-full border-t border-dashed" />

      <Descriptions
        column={1}
        colon={false}
        layout="horizontal"
        styles={LOWER_STYLES}
        items={toDescriptionItems(down)}
      />
    </div>
  );
};

export default ProformaInfoCard;
