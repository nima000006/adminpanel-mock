import { ProformaInfoCardProps } from "@pages/Dormitory/UsersRequests/ReservationRequests/ManualReservation/helper/components/ProformaInvoiceStep/helper/components/ProformaInfoCard/@types/@proformaInfoCard";

export const UPPER_STYLES = {
  label: {
    color: "var(--neutral-8)",
    textAlign: "start" as const,
    paddingInlineEnd: 0,
  },
  content: {
    color: "var(--neutral-11)",
    textAlign: "start" as const,
  },
};

export const LOWER_STYLES = {
  label: {
    color: "var(--neutral-8)",
    textAlign: "start" as const,
    paddingInlineEnd: 0,
  },
  content: {
    color: "var(--neutral-11)",
    textAlign: "end" as const,
    justifyContent: "space-between",
  },
};

export const toDescriptionItems = (fields: ProformaInfoCardProps["up"]) =>
  Object.entries(fields).map(([key, field]) => ({
    key,
    label: field.label,
    span: field.span,
    children: field.value,
  }));
