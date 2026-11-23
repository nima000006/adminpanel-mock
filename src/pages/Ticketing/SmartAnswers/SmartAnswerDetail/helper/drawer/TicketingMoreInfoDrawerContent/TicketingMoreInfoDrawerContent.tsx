import { Descriptions, DescriptionsProps } from "antd";
import { PiUser } from "react-icons/pi";
import { Link } from "react-router";

import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomDrawerHeader from "@components/Renderers/CustomDrawer/CustomDrawerHeader/CustomDrawerHeader";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { TOP_BAR_PROFILE_PAGE_ROUTE } from "@infra/router/routes/topBarItem";
import {
  answerType,
  statusMessages,
} from "@pages/Ticketing/SmartAnswers/SmartAnswersList/helper/utils/utils";

import { TicketingMoreInfoDrawerContentProps } from "./@types/@ticketingMoreInfoDrawerContentTyps";

const TicketingMoreInfoDrawerContent = ({
  closeDrawerHandler,
}: TicketingMoreInfoDrawerContentProps) => {
  //* ================================ Util Functions ================================

  const smartSupportInfoItems: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "تاریخ و زمان شروع مکالمه",
      children: "۱۸ مهر ۱۴۰۴ , 10:10",
    },
    {
      key: "2",
      label: "تاریخ و زمان پایان مکالمه",
      children: "۱۸ مهر ۱۴۰۴ , 10:10",
    },
    {
      key: "3",
      label: "وضعیت",
      children: (
        <CustomTag color={statusMessages[3]?.color}>{statusMessages[3]?.text}</CustomTag>
      ),
    },
    {
      key: "4",
      label: "ورژن پشتیبان هوشمند",
      children: "1.0.0",
    },
    {
      key: "5",
      label: "میانگین مدت پاسخگویی",
      children: "2.321 ثانیه",
    },
    {
      key: "6",
      label: "تیکت مربوطه",
      children: <Link to={""}>مشاهده تیکت</Link>,
    },
    {
      key: "7",
      label: "ارزیابی درستی پاسخ‌ها",
      children: <CustomTag color={answerType[2]?.color}>{answerType[2]?.text}</CustomTag>,
    },
  ];

  const userInfoItems: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "نام ",
      children: "علی",
    },
    {
      key: "2",
      label: "نام خانوادگی",
      children: "رضایی",
    },
    {
      key: "3",
      label: "کد ملی / کد فراگیر",
      children: "1234567890",
    },
    {
      key: "4",
      label: "شماره پرسنلی",
      children: "10052",
    },
    {
      key: "5",
      label: "شماره همراه",
      children: "091255555",
    },
    {
      key: "6",
      label: "شعبه / واحد",
      children: "تهران مرکز",
    },
    {
      key: "7",
      label: "سمت",
      children: "مدیر خوابگاه",
    },
  ];

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div>
      <CustomDrawerHeader
        title="اطلاعات بیشتر پشتیبانی هوشمند"
        closeDrawerHandler={closeDrawerHandler}
      />
      <div>
        <CustomDivider text="اطلاعات پشتیبانی هوشمند" />
        <Descriptions
          className="all-transaction-detail-user-descriptions"
          column={1}
          items={smartSupportInfoItems}
          labelStyle={{
            fontWeight: "bold",
            textAlign: "right",
            width: "180px",
          }}
        />
      </div>

      <div>
        <CustomDivider
          text="کاربر دریافت کننده وجه عودت شده"
          extraContent={
            <Link
              className="text-primary-6! flex items-center justify-center gap-1"
              to={TOP_BAR_PROFILE_PAGE_ROUTE}
            >
              <PiUser />
              پروفایل کاربر
            </Link>
          }
        />

        <Descriptions
          className="all-transaction-detail-user-descriptions"
          column={1}
          items={userInfoItems}
          labelStyle={{
            fontWeight: "bold",
            textAlign: "right",
            width: "180px",
          }}
        />
      </div>
    </div>
  );
};
export default TicketingMoreInfoDrawerContent;
