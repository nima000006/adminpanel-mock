import { JSX } from "react";

import { Button } from "antd";

import GameWithBack from "@assets/icons/GameWithBack";
import JobSearchWithBack from "@assets/icons/JobSearchWithBack";
import RoomWithBack from "@assets/icons/RoomWithBack";
import SelfWithBack from "@assets/icons/SelfWithBack";
import CustomCard from "@components/CustomCard/CustomCard";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import SingleVerticalItem from "@components/Renderers/SingleVerticalItem/SingleVerticalItem";
import { PADDING_40 } from "@infra/VARS/globalStyles/globalStyles";
import "./_billingDetailFactorContent.scss";

//product component
const lists = [
  { id: 1, title: "کاریابی", icon: <JobSearchWithBack />, bgColor: "job-search-back" },
  { id: 2, title: "سلف / غذا", icon: <SelfWithBack />, bgColor: "self-back" },
  { id: 3, title: "بازی", icon: <GameWithBack />, bgColor: "game-back" },
  { id: 4, title: "خوابگاه", icon: <RoomWithBack />, bgColor: "room-back" },
];

type ProductProps = {
  label: string;
  lists:
    | {
        id: number;
        title: string;
        icon: JSX.Element;
        bgColor: string;
      }[]
    | undefined;
};

//product component
const Product = ({ lists, label }: ProductProps) => {
  return (
    <div className="billing-true-servant-product">
      <div className="label">{label}</div>
      <div className="product-container">
        {lists
          ? lists?.map((item) => (
              <div className={`product-wrapper ${item.bgColor}`} key={item.id}>
                <span className="title">{item.title}</span>
                <span>{item.icon}</span>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
};

//btn generator
const BtnGenerator = ({
  type,
  onClick,
  deprecationStatus,
}: {
  deprecationStatus?: boolean;
  type: number;
  onClick?: () => void;
}) => {
  if (deprecationStatus) {
    return;
  }
  return type === 1 ? (
    <div className="overdue-btn-wrapper">
      <Button type="primary" className="overdue-btn" onClick={onClick}>
        سر رسید شده
      </Button>
    </div>
  ) : type === 2 ? (
    <div className="waiting-payment-btn-wrapper">
      <Button type="primary" className="waiting-payment-btn" onClick={onClick}>
        در انتظار پرداخت
      </Button>
    </div>
  ) : type === 3 ? (
    <div className="paying-installments-btn-wrapper">
      <Button type="primary" className="paying-installments-btn" onClick={onClick}>
        در حال پرداخت اقساط
      </Button>
    </div>
  ) : (
    <div className="settled-btn-wrapper">
      <Button type="primary" className="settled-btn" onClick={onClick}>
        تسویه شده
      </Button>
    </div>
  );
};

// billing detail
const BillingDetailFactorContent = () => {
  const btnType = 4;
  const realOrLegal = 1;

  // const onMainBtnClickHandler = (type: number) => {};
  return (
    <div className="billing-detail-factor-content-container">
      <div className="btn-wrapper">
        {
          <BtnGenerator
            type={btnType}
            deprecationStatus={false}
            //   onClick={() => {
            //     onMainBtnClickHandler(btnType);
            //   }}
          />
        }
        <Button type="primary" ghost>
          دانلود صورتحساب
        </Button>
      </div>
      {realOrLegal !== 1 ? (
        <>
          <CustomCard padding={PADDING_40}>
            <CustomDivider text="اطلاعات خریدار (حقیقی)" />
            <div className="grid-cols-3">
              <SingleVerticalItem label="نام خریدار" value="محمد احمدی" />
              <SingleVerticalItem label="شناسه خریدار" value="1650854196" />
              <SingleVerticalItem label="شماره همراه" value="09127026457" />
            </div>
            <div className="postal-code-address-wrapper">
              <SingleVerticalItem label="کد پستی" value="1651351968351" />
              <SingleVerticalItem
                label="آدرس"
                value="تهران - منطقه 18 - محله 17 شهریور - خیابان پرچین - مجتمع الماس - بلوک 3 - لاین شمال غربی - واحد 507"
              />
            </div>
          </CustomCard>

          <CustomCard padding={PADDING_40}>
            <CustomDivider text="اطلاعات خدمت دهنده (حقیقی)" />
            <div className="grid-cols-3">
              <SingleVerticalItem label="نام " value="محمد احمدی" />
              <SingleVerticalItem label="شناسه فروشنده (شناسه ملی)" value="1650854196" />
              <SingleVerticalItem label="شماره همراه" value="09127026457" />
              <SingleVerticalItem label="تلفن" value="09127026457" />
              <Product label="محصولات" lists={lists} />
            </div>
            <div className="postal-code-address-wrapper">
              <SingleVerticalItem label="کد پستی" value="1651351968351" />
              <SingleVerticalItem
                label="آدرس"
                value="تهران - منطقه 18 - محله 17 شهریور - خیابان پرچین - مجتمع الماس - بلوک 3 - لاین شمال غربی - واحد 507"
              />
            </div>
          </CustomCard>

          <CustomCard padding={PADDING_40}>
            <CustomDivider text="اطلاعات صورتحساب" />
            <div className="grid-cols-3">
              <SingleVerticalItem label="نوع صورتحساب " value="اصلاحی" />
              <SingleVerticalItem label="شماره صورتحساب مرجع" value="135135219658498" />
              <SingleVerticalItem label="رسمیت" value="رسمی" />
              <SingleVerticalItem label="تاریخ ایجاد" value="1402 / 12 / 12" />
              <SingleVerticalItem label="کاربر اقدام کننده" value="محمد احمدی" />
              <SingleVerticalItem label="شناسه کاربر اقدام کننده" value="065065405" />
              <SingleVerticalItem label="شماره منحصر به فرد مالیاتی" value="65409906" />
              <SingleVerticalItem label="وضعیت" value="فعال" />
            </div>
          </CustomCard>
          <CustomCard padding={PADDING_40}>
            <CustomDivider text="اطلاعات تسویه" />
            <div className="grid-cols-3">
              <SingleVerticalItem label="مبلغ نهایی (قابل پرداخت)" value="19,200" />
              <SingleVerticalItem label="مبلغ کل" value="120,000" />
              <SingleVerticalItem label="نوع تسویه" value="اقساطی (4)" />
              <SingleVerticalItem label="تخفیف" value="40,000" />
              <SingleVerticalItem label="جریمه" value="0" />
              <SingleVerticalItem label="مجموع جریمه دیرکرد" value="0" />
              <SingleVerticalItem label="مالیات" value="19,200" />
              <SingleVerticalItem label="کارمزد" value="20,000" />
            </div>
          </CustomCard>
        </>
      ) : (
        <>
          <CustomCard padding={PADDING_40}>
            <CustomDivider text="اطلاعات خریدار (حقوقی)" />
            <div className="grid-cols-3">
              <SingleVerticalItem label="نام خریدار" value="محمد احمدی" />
              <SingleVerticalItem label="شناسه خریدار" value="1650854196" />
              <SingleVerticalItem label="شناسه اقتصادی" value="165041980" />
              <SingleVerticalItem label="تلفن" value="021 - 66185322" />
              <SingleVerticalItem label="شماره همراه" value="09127026457" />
              <SingleVerticalItem label="شماره شعبه" value="25" />
            </div>
            <div className="postal-code-address-wrapper">
              <SingleVerticalItem label="کد پستی" value="1651351968351" />
              <SingleVerticalItem
                label="آدرس"
                value="تهران - منطقه 18 - محله 17 شهریور - خیابان پرچین - مجتمع الماس - بلوک 3 - لاین شمال غربی - واحد 507"
              />
            </div>
          </CustomCard>

          <CustomCard padding={PADDING_40}>
            <CustomDivider text="اطلاعات خدمت دهنده (حقوقی)" />
            <div className="grid-cols-3">
              <SingleVerticalItem label="نام " value="محمد احمدی" />
              <SingleVerticalItem label="شناسه فروشنده (شناسه ملی)" value="1650854196" />
              <SingleVerticalItem label="شناسه اقتصادی" value="01354089401" />
              <SingleVerticalItem label="تلفن" value="09127026457" />
              <SingleVerticalItem label="شماره همراه" value="09127026457" />
              <SingleVerticalItem label="شماره شعبه" value="25" />
            </div>
            <div className="postal-code-address-wrapper">
              <SingleVerticalItem label="کد پستی" value="1651351968351" />
              <SingleVerticalItem
                label="آدرس"
                value="تهران - منطقه 18 - محله 17 شهریور - خیابان پرچین - مجتمع الماس - بلوک 3 - لاین شمال غربی - واحد 507"
              />
            </div>
            <Product label="محصولات" lists={lists} />
          </CustomCard>

          <CustomCard padding={PADDING_40}>
            <CustomDivider text="اطلاعات صورتحساب" />
            <div className="grid-cols-3">
              <SingleVerticalItem label="نوع صورتحساب " value="اصلاحی" />
              <SingleVerticalItem label="شماره صورتحساب مرجع" value="135135219658498" />
              <SingleVerticalItem label="رسمیت" value="رسمی" />
              <SingleVerticalItem label="تاریخ ایجاد" value="1402 / 12 / 12" />
              <SingleVerticalItem label="کاربر اقدام کننده" value="محمد احمدی" />
              <SingleVerticalItem label="شناسه کاربر اقدام کننده" value="065065405" />
              <SingleVerticalItem label="شماره منحصر به فرد مالیاتی" value="65409906" />
              <SingleVerticalItem label="وضعیت" value="فعال" />
            </div>
          </CustomCard>

          <CustomCard padding={PADDING_40}>
            <CustomDivider text="اطلاعات تسویه" />
            <div className="grid-cols-3">
              <SingleVerticalItem label="مبلغ نهایی (قابل پرداخت)" value="19,200" />
              <SingleVerticalItem label="مبلغ کل" value="120,000" />
              <SingleVerticalItem label="نوع تسویه" value="اقساطی (4)" />
              <SingleVerticalItem label="تخفیف" value="40,000" />
              <SingleVerticalItem label="جریمه" value="0" />
              <SingleVerticalItem label="مجموع جریمه دیرکرد" value="0" />
              <SingleVerticalItem label="مالیات" value="19,200" />
              <SingleVerticalItem label="کارمزد" value="20,000" />
            </div>
          </CustomCard>
        </>
      )}
    </div>
  );
};
export default BillingDetailFactorContent;
