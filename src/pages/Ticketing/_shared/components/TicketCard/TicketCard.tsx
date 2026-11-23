import { Badge } from "antd";
import { MdOutlineFolderOpen } from "react-icons/md";

import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import SamimServiceTag from "@components/Renderers/SamimServiceTag/SamimServiceTag";
import { TicketCardProps } from "@pages/Ticketing/_shared/components/TicketCard/@types/@ticketCard";
import {
  ticketStatusMap,
  priorityMap,
  ticketTypeMap,
} from "@pages/Ticketing/_shared/utils/utils";
import CustomConvertTimeToDays from "@pages/Ticketing/Agent/AgentTicketList/helper/components/CustomConvertTimeToDays/CustomConvertTimeToDays";

import TicketRate from "../TicketRate/TicketRate";

const TicketCard = ({
  ticketNumber,
  title,
  description,
  userName,
  userCode,
  date,
  ribbonStatus,
  priority,
  topTag,
  service,
  step,
  stepIcon,
  waitingTime,
  actionButtons,
  rate,
  assign,
  closedBy,
  borderColor,
}: TicketCardProps) => {
  return (
    <div
      className={`relative rounded-lg border border-dashed p-6 ${
        borderColor ?? "border-neutral-5"
      }`}
    >
      {ribbonStatus && (
        <div className="absolute -top-4 -right-0.5">
          <Badge.Ribbon
            text={ticketStatusMap[ribbonStatus]?.label}
            color={ticketStatusMap[ribbonStatus]?.color}
            placement="start"
          />
        </div>
      )}

      <div className="mb-2! flex items-center justify-between max-[700px]:flex-col">
        {/* Ticket number */}
        <div className="flex items-center gap-2 max-[500px]:flex-col">
          <span className="body-regular text-neutral-8">شماره تیکت</span>
          <span className="regular text-neutral-12">#{ticketNumber}</span>
        </div>

        {/* Tag */}
        <CustomTag
          variant="outlined"
          className="flex items-center gap-1"
          icon={<MdOutlineFolderOpen />}
        >
          {topTag}
        </CustomTag>
      </div>

      {/* Title */}
      <h3 className="h4-medium mb-2! line-clamp-1">{title}</h3>

      {/* Description */}
      <p className="text-neutral-10 body-regular mb-6! line-clamp-2">{description}</p>

      {/* User & date */}
      <div className="mb-6! flex flex-wrap items-center gap-4">
        {userName && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="body-regular text-neutral-8">کاربر </span>
            <span className="footnote text-primary-6!">{userName}</span>
            <span className="regular neutral-12">({userCode})</span>
          </div>
        )}

        {assign && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="body-regular text-neutral-8">تخصیص به </span>
            <span className="footnote text-primary-6!">{assign}</span>
          </div>
        )}

        {closedBy && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="body-regular text-neutral-8">بسته شده توسط</span>
            <span className="footnote text-primary-6!">{closedBy}</span>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-2">
          <span className="body-regular text-neutral-8">تاریخ و زمان ثبت تیکت </span>
          <span className="regular text-neutral-12">{date}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between max-[700px]:flex-wrap max-[700px]:gap-2">
        <div className="flex flex-wrap items-center gap-2">
          {service && <SamimServiceTag service={service} />}

          {step && (
            <CustomTag
              variant="outlined"
              className="flex items-center gap-1"
              color={ticketTypeMap[step]?.color ?? "default"}
              icon={stepIcon}
            >
              {ticketTypeMap[step]?.label}
            </CustomTag>
          )}

          {priority && (
            <CustomTag
              variant="outlined"
              color={priorityMap[priority]?.color ?? "default"}
            >
              {priorityMap[priority]?.label ?? "فاقد اولویت"}
            </CustomTag>
          )}

          {waitingTime && <CustomConvertTimeToDays seconds={+waitingTime} />}
          {rate && <TicketRate isForTable {...rate} />}
        </div>

        {actionButtons && actionButtons}
      </div>
    </div>
  );
};
export default TicketCard;
