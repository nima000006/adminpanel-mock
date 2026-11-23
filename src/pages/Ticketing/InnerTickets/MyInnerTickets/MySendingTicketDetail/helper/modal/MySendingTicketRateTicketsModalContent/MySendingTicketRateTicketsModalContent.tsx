import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomRate from "@components/Renderers/CustomRate/CustomRate";
import { MySendingTicketRateTicketsModalContentProps } from "@pages/Ticketing/InnerTickets/MyInnerTickets/MySendingTicketDetail/helper/modal/MySendingTicketRateTicketsModalContent/@types/@mySendingTicketRateTicketsModalContentTypes";

const MySendingTicketRateTicketsModalContent = ({
  rate,
  setRate,
}: MySendingTicketRateTicketsModalContentProps) => {
  return (
    <div className="flex flex-col gap-5">
      <CustomAlert
        showIcon
        title="ثبت رضایت از روند پاسخگویی"
        description="در صورت تمایل، می‌توانید به روند پاسخ‌گویی به مشکل ثبت‌شده امتیاز دهید. در صورت رضایت کامل ۵ ستاره و در صورت نارضایتی ۱ ستاره ثبت نمایید."
        type="info"
        className="custom-alert"
      />
      <div className="gap-1-2 flex justify-center">
        <CustomRate defaultValue={0} value={rate} onChange={(value) => setRate(value)} />
      </div>
    </div>
  );
};
export default MySendingTicketRateTicketsModalContent;
