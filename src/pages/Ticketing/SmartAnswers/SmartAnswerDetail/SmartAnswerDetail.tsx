import { Link } from "react-router";

import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import { TICKETING_SMART_ANSWERS_LIST_PAGE_ROUTE } from "@infra/router/routes/ticketing";
import MessageBox from "@pages/Ticketing/_shared/components/MessageBox/MessageBox";

import SmartAnswerDetailInfoCard from "./helper/components/SmartAnswerDetailInfoCard/SmartAnswerDetailInfoCard";
import HomePageImageOn from "../../../../assets/images/HomePageImageOn.webp";

const CHAT_MESSAGES: any[] = [
  {
    id: "1",
    senderType: "customer",
    senderName: "ماریانا فلاح",
    text: "مشکلم حل نشده ها!!!",
    time: "۱۰:۱۰ | ۲۵ مهر ۱۴۰۴",
    img: HomePageImageOn,
  },
  {
    id: "2",
    senderType: "expert",
    senderName: "ماریانا فلاحی",
    senderRole: "کارشناس ارشد",
    text: "حل نمیشه آقا تلاش نکن دروغیه",
    time: "۱۰:۱۱ | ۲۵ مهر ۱۴۰۴",
  },
  {
    id: "3",
    senderType: "admin",
    senderName: "سینا سیوحه",
    senderRole: "کارشناس",
    text: "مشکل نیست حل میشه یبار دیگه امتحان کن.",
    time: "۱۰:۱۱ | ۲۵ مهر ۱۴۰۴",
  },
  {
    id: "4",
    senderType: "admin",
    senderName: "سینا سیوحه",
    senderRole: "کارشناس",
    text: `در حال حاضر من با یک مشکل جدی در اپلیکیشن پرداخت مواجه هستم. 
هر بار که سعی می‌کنم پرداختی انجام دهم، اپلیکیشن به طور ناگهانی بسته می‌شود 
و هیچ پیامی هم نمایش نمی‌دهد.

این موضوع باعث شده نتوانم پرداخت را انجام بدهم و واقعاً کلافه‌کننده شده. 
اگر کسی می‌تواند راه‌حلی برای این مشکل پیدا کند، ممنون می‌شوم.`,
    time: "۱۰:۱۲ | ۲۵ مهر ۱۴۰۴",
    img: HomePageImageOn,
  },
];

const SmartAnswerDetail = () => {
  useTitle({
    breadcrumbItems: [
      {
        title: <Link to={TICKETING_SMART_ANSWERS_LIST_PAGE_ROUTE}>پاسخ‌های هوشمند</Link>,
      },
      {
        title: "مشاهده پاسخ",
      },
    ],
  });
  return (
    <div className="flex flex-col gap-10">
      <SmartAnswerDetailInfoCard />
      <div className="flex flex-col gap-6">
        {CHAT_MESSAGES.map((message: any) => (
          <MessageBox key={message.id} message={message} />
        ))}
      </div>
    </div>
  );
};

export default SmartAnswerDetail;
