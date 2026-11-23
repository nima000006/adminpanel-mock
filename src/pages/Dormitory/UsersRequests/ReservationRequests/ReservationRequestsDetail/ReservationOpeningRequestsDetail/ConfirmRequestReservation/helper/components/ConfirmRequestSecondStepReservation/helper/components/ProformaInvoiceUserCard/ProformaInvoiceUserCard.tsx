import { Descriptions } from "antd";
import { PiUser } from "react-icons/pi";

import { dataPlaceHolder } from "@infra/helpers/utils";
import { ProformaInvoiceUserCardProps } from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/ReservationOpeningRequestsDetail/ConfirmRequestReservation/helper/components/ConfirmRequestSecondStepReservation/helper/components/ProformaInvoiceUserCard/@types/@proformaInvoiceUserCardTypes";

const ProformaInvoiceUserCard = ({ data }: ProformaInvoiceUserCardProps) => {
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="border-neutral-4 bg-neutral-1 flex h-full flex-col gap-4 rounded-lg border p-3">
      <div className="flex items-center gap-2">
        <PiUser size={16} className="text-neutral-8 shrink-0" />
        <span className="footnote text-neutral-10">مشخصات کاربر</span>
      </div>

      <Descriptions
        column={2}
        colon={false}
        styles={{
          label: {
            color: "var(--neutral-8)",
            textAlign: "start",
            paddingInlineEnd: 0,
          },
          content: {
            color: "var(--neutral-11)",
            textAlign: "start",
          },
        }}
        items={[
          {
            key: "firstName",
            label: "نام",
            children: dataPlaceHolder({ data: data?.firstName }),
          },
          {
            key: "lastName",
            label: "نام خانوادگی",
            children: dataPlaceHolder({ data: data.lastName }),
          },
          {
            key: "userGroup",
            label: "گروه کاربری",
            children: dataPlaceHolder({ data: data?.userGroup }),
          },
          {
            key: "nationalCode",
            label: "کدملی/فراگیر",
            children: (
              <span dir="ltr">{dataPlaceHolder({ data: data?.nationalCode })}</span>
            ),
          },
        ]}
      />

      <div className="border-neutral-5 w-full border-t border-dashed" />

      <Descriptions
        column={1}
        colon={false}
        layout="horizontal"
        styles={{
          label: {
            color: "var(--neutral-8)",
            textAlign: "start",
            paddingInlineEnd: 0,
          },
          content: {
            color: "var(--neutral-11)",
            textAlign: "end",
          },
        }}
        items={[
          {
            key: "unit",
            label: "شعبه/واحد",
            children: dataPlaceHolder({ data: data?.unit }),
          },
          {
            key: "phoneNumber",
            label: "شماره تماس",
            children: <span dir="ltr">{data?.phoneNumber}</span>,
          },
          {
            ...(data.userGroup === "دانشجو" && {
              key: "education",
              label: "اطلاعات تحصیلی",
              children: (
                <div className="flex flex-wrap items-center justify-end gap-2">
                  <span className="text-neutral-12">
                    {dataPlaceHolder({ data: data?.degree })}
                  </span>
                  <span className="border-neutral-4 self-stretch border-l" />
                  <span className="text-neutral-12">
                    {dataPlaceHolder({ data: data?.major })}
                  </span>
                </div>
              ),
            }),
            ...(data.userGroup === "کارمند" && {
              key: "education",
              label: "اطلاعات کارمندی",
              children: (
                <div className="flex flex-wrap items-center justify-end gap-2">
                  <span className="text-neutral-12">
                    {dataPlaceHolder({ data: data?.position })}
                  </span>
                </div>
              ),
            }),
          },
        ]}
      />
    </div>
  );
};

export default ProformaInvoiceUserCard;
