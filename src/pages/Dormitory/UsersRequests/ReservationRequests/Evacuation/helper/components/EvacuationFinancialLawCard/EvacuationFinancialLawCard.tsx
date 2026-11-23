import { useState } from "react";

import { Form } from "antd";
import { AiOutlineClose, AiOutlineInfoCircle } from "react-icons/ai";

import {
  CustomButton,
  CustomInputNumber,
  CustomSingleCheckbox,
} from "@components/CustomInputs";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDrawer from "@components/Renderers/CustomDrawer/CustomDrawer";
import { dataPlaceHolder } from "@infra/helpers/utils";
import EvacuationReasonCostDrawerContent from "@pages/Dormitory/UsersRequests/ReservationRequests/_shared/drawer/EvacuationReasonCostDrawerContent/EvacuationReasonCostDrawerContent";
import EvacuationSystemicPercentageDrawerContent from "@pages/Dormitory/UsersRequests/ReservationRequests/_shared/drawer/EvacuationSystemicPercentageDrawerContent/EvacuationSystemicPercentageDrawerContent";
import {
  EVACUATION_LAW,
  EVACUATION_TIMING,
} from "@pages/Dormitory/UsersRequests/ReservationRequests/Evacuation/@types/@evacuation";
import { EvacuationFinancialLawCardProps } from "@pages/Dormitory/UsersRequests/ReservationRequests/Evacuation/helper/components/EvacuationFinancialLawCard/@types/@evacuationFinancialLawCardTypes";

const EvacuationFinancialLawCard = ({ form, data }: EvacuationFinancialLawCardProps) => {
  const [isReasonCostDrawer, setIsReasonCostDrawer] = useState(false);
  const [isSystemicPercentageDrawer, setIsSystemicPercentageDrawer] = useState(false);

  // مبلغ منتخب از فرم؛ اگر خالی بود از selectedAmountRial
  const selectedAmount = Form.useWatch("selectedAmount", form) ?? data.selectedAmountRial;

  // وضعیت چک‌باکس محاسبه نشود؛ اگر خالی بود از skipChargeDefault
  const skipCharge = Form.useWatch("skipCharge", form) ?? data.skipChargeDefault;

  // زودتر از موعد: باند زرد و متن‌های باقی‌مانده
  const isEarly = data.timing === EVACUATION_TIMING.early;

  // دیرتر از موعد: باند قرمز و متن‌های مازاد
  const isLate = data.timing === EVACUATION_TIMING.late;

  // قانون دلخواه: اینپوت آزاد و امکان آلرت
  const isCustom = data.law === EVACUATION_LAW.custom;

  // قانون ثابت: لیبل بدون کلمه دلخواه
  const isFixed = data.law === EVACUATION_LAW.fixed;

  // مبلغ باند: تیک روشن صفر، وگرنه مبلغ منتخب
  const effectiveAmount = skipCharge ? 0 : selectedAmount;

  // درصد باند نسبت به مبلغ سیستمی
  const effectivePercent =
    data.systemAmountRial > 0
      ? Math.round((effectiveAmount / data.systemAmountRial) * 100)
      : 0;

  // آلرت افزایش: فقط زودتر از موعد و دلخواه و مبلغ بیشتر از سیستمی
  const showIncreaseAlert =
    isEarly && isCustom && effectiveAmount > data.systemAmountRial;

  // آلرت کاهش: فقط دیرتر از موعد و دلخواه و مبلغ کمتر از سیستمی
  const showDecreaseAlert = isLate && isCustom && effectiveAmount < data.systemAmountRial;

  // مود دراور علت: زودتر از موعد increase، دیرتر decrease
  const reasonCostMode = isEarly ? "increase" : "decrease";

  const amountBandClassName = isEarly ? "bg-yellow-1" : "bg-dustred-1";
  const instructionIconClassName = isEarly ? "text-orange-6" : "text-dustred-5";

  const instructionTitle = isEarly
    ? "هزینه اقامت روز های باقی مانده را با کاربر حساب کن ! به کاربر برگردون"
    : "هزینه اقامت روز های مازاد را با کاربر حساب کن ! از کاربر بگیر";

  const calculationLabel = isEarly
    ? "نحوه محاسبه هزینه روزهای باقی مانده"
    : "نحوه محاسبه هزینه مازاد اقامت";

  const skipChargeLabel = isEarly
    ? "هزینه روزهای باقی مانده اقامت محاسبه نشود."
    : "هزینه روزهای مازاد اقامت محاسبه نشود.";

  const amountFieldLabel = isFixed ? "مبلغ منتخب" : "مبلغ منتخب دلخواه";

  const amountBandSubtitle = isEarly
    ? "(بابت مجموع هزینه روزهای باقی‌مانده اقامت)"
    : "(بابت مجموع هزینه روزهای مازاد اقامت)";

  // راهنمای اینپوت: دیرتر از موعد با تیک روشن متن رایگان، وگرنه از بک‌اند
  const amountInputHint =
    skipCharge && isLate
      ? "هزینه اقامت روزهای مازاد رایگان میباشد"
      : (data.amountInputHint ?? data.rangeHint);

  //* ================================ Util Functions ================================

  // تیک روشن: مبلغ صفر | تیک خاموش: برگشت به مبلغ اولیه
  const skipChargeChangeHandler = (checked: boolean) => {
    if (checked) {
      form.setFieldsValue({ selectedAmount: 0, skipCharge: true });
      return;
    }
    form.setFieldsValue({
      skipCharge: false,
      selectedAmount: data.selectedAmountRial || data.systemAmountRial,
    });
  };

  const openReasonCostDrawerHandler = () => {
    setIsReasonCostDrawer(true);
  };

  const closeReasonCostDrawerHandler = () => {
    setIsReasonCostDrawer(false);
  };

  const openSystemicPercentageDrawerHandler = () => {
    setIsSystemicPercentageDrawer(true);
  };

  const closeSystemicPercentageDrawerHandler = () => {
    setIsSystemicPercentageDrawer(false);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <>
      {isReasonCostDrawer && (
        <CustomDrawer
          title=""
          open={isReasonCostDrawer}
          onClose={closeReasonCostDrawerHandler}
          closeIcon={<AiOutlineClose />}
          content={
            <EvacuationReasonCostDrawerContent
              mode={reasonCostMode}
              selectedAmountRial={effectiveAmount}
              systemAmountRial={data.systemAmountRial}
              closeDrawerHandler={closeReasonCostDrawerHandler}
            />
          }
        />
      )}

      {isSystemicPercentageDrawer && (
        <CustomDrawer
          title=""
          open={isSystemicPercentageDrawer}
          onClose={closeSystemicPercentageDrawerHandler}
          closeIcon={<AiOutlineClose />}
          content={
            <EvacuationSystemicPercentageDrawerContent
              closeDrawerHandler={closeSystemicPercentageDrawerHandler}
            />
          }
        />
      )}

      <div className="border-neutral-5 bg-neutral-1 flex w-full max-w-[560px] flex-col gap-6 rounded-2xl border p-6">
        <div className="flex items-center gap-2">
          <AiOutlineInfoCircle className={instructionIconClassName} size={16} />
          <p className="text-neutral-11 flex-1 text-base font-medium">
            {instructionTitle}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1">
            <span className="text-neutral-12 text-sm font-bold">{calculationLabel}</span>
            <AiOutlineInfoCircle className="text-neutral-7" size={14} />
          </div>
          {data.showSystemPercentLink ? (
            <CustomButton type="link" onClick={openSystemicPercentageDrawerHandler}>
              محاسبه مبلغ هزینه اقامتی با درصد سیستمی
            </CustomButton>
          ) : null}
        </div>

        <div
          className={`${amountBandClassName} flex flex-col items-center gap-4 rounded-xl px-5 py-4 text-center`}
        >
          <p className="text-neutral-13 m-0 text-xl font-medium">مبلغ منتخب</p>
          <p className="text-neutral-13 m-0 text-xl font-bold">
            {dataPlaceHolder({
              data: effectiveAmount,
              isPrice: true,
              isRial: true,
              currency: { isAvailable: true, type: "تومان" },
            })}
          </p>
          <div className="text-neutral-13 text-xs">
            <p className="m-0">
              محاسبه <span className="font-bold">{effectivePercent}%</span> هزینه روزانه
            </p>
            <p className="m-0">{amountBandSubtitle}</p>
          </div>
        </div>

        <CustomInputNumber
          name="selectedAmount"
          label={amountFieldLabel}
          isPrice
          min={0}
          disabled={!data.isAmountEditable || skipCharge}
          suffix="ریال"
          extra={amountInputHint}
          className="w-full"
        />

        <div className="flex justify-start">
          <CustomSingleCheckbox
            name="skipCharge"
            valuePropName="checked"
            disabled={data.isSkipChargeDisabled}
            onChange={(event) => skipChargeChangeHandler(event.target.checked)}
          >
            {skipChargeLabel}
          </CustomSingleCheckbox>
        </div>

        {showIncreaseAlert ? (
          <CustomAlert
            type="error"
            showIcon
            title="افزایش هزینه اقامتی بابت روزهای باقی مانده"
            description="چرا هزینه روز های باقی مانده بیشتر از هزینه اقامتی است؟ علت را وارد کنید"
            action={
              <CustomButton
                type="link"
                className="text-dustred-6!"
                onClick={openReasonCostDrawerHandler}
              >
                علت و توضیحات افزایش هزینه
              </CustomButton>
            }
          />
        ) : null}

        {showDecreaseAlert ? (
          <CustomAlert
            type="error"
            showIcon
            title="کاهش هزینه اقامتی بابت روزهای مازاد"
            description="چرا هزینه روز های مازاد کمتر از هزینه اقامتی است؟ علت را وارد کنید"
            action={
              <CustomButton
                type="link"
                danger
                className="text-dustred-6!"
                onClick={openReasonCostDrawerHandler}
              >
                علت و توضیحات کسورات
              </CustomButton>
            }
          />
        ) : null}
      </div>
    </>
  );
};

export default EvacuationFinancialLawCard;
