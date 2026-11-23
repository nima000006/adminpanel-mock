import { Descriptions } from "antd";
import { PiBuildings } from "react-icons/pi";

import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { ProformaInvoiceResidenceCardProps } from "@pages/Dormitory/UsersRequests/ReservationRequests/ReservationRequestsDetail/ReservationOpeningRequestsDetail/ConfirmRequestReservation/helper/components/ConfirmRequestSecondStepReservation/helper/components/ProformaInvoiceResidenceCard/@types/@proformaInvoiceResidenceCardTypes";

const ProformaInvoiceResidenceCard = ({ data }: ProformaInvoiceResidenceCardProps) => {
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="border-neutral-4 bg-neutral-1 flex h-full flex-col gap-4 rounded-lg border p-3">
      <div className="flex items-center gap-2">
        <PiBuildings size={16} className="text-neutral-8 shrink-0" />
        <span className="footnote text-neutral-10">مشخصات اسکان</span>
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
            key: "residence",
            label: "اقامتگاه",
            children: dataPlaceHolder({ data: data.residence }),
          },
          {
            key: "building",
            label: "ساختمان",
            children: dataPlaceHolder({ data: data.building }),
          },
          {
            key: "floor",
            label: "طبقه",
            children: dataPlaceHolder({ data: data.floor }),
          },
          {
            key: "unit",
            label: "واحد اقامتی",
            children: dataPlaceHolder({ data: data.unit }),
          },
          {
            key: "bed",
            label: "تخت",
            span: 2,
            children: (
              <span className="inline-flex flex-wrap items-center gap-1">
                <span>{dataPlaceHolder({ data: data.bed })}</span>
                <span className="footnote text-neutral-7">
                  {dataPlaceHolder({ data: data.bedDetails })}
                </span>
              </span>
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
            color: "var(--neutral-10)",
            textAlign: "end",
            justifyContent: "space-between",
          },
        }}
        items={[
          {
            key: "admissionProgram",
            label: "برنامه پذیرش",
            children: (
              <div className="flex flex-wrap items-center justify-end gap-2">
                <CustomTag color="blue" className="m-0!">
                  {dataPlaceHolder({ data: data.admissionProgramTag })}
                </CustomTag>
                <span className="border-neutral-4 self-stretch border-l" />
                <span className="footnote text-primary-6">
                  {dataPlaceHolder({ data: data.admissionProgramTitle })}
                </span>
              </div>
            ),
          },
          {
            key: "stayRange",
            label: "بازه اسکان",
            children: dataPlaceHolder({ data: data.stayRangeLabel }),
          },
        ]}
      />
    </div>
  );
};

export default ProformaInvoiceResidenceCard;
