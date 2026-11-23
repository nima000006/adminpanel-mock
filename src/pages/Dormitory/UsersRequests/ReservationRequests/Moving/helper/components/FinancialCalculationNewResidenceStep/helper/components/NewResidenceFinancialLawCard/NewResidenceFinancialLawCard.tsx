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
import { EVACUATION_LAW } from "@pages/Dormitory/UsersRequests/ReservationRequests/Evacuation/@types/@evacuation";
import { NewResidenceFinancialLawCardProps } from "@pages/Dormitory/UsersRequests/ReservationRequests/Moving/helper/components/FinancialCalculationNewResidenceStep/helper/components/NewResidenceFinancialLawCard/@types/@newResidenceFinancialLawCardTypes";

const NewResidenceFinancialLawCard = ({
  form,
  data,
}: NewResidenceFinancialLawCardProps) => {
  const [isReasonCostDrawer, setIsReasonCostDrawer] = useState(false);
  const [isSystemicPercentageDrawer, setIsSystemicPercentageDrawer] = useState(false);

  // مبلغ منتخب اقامت جدید از فرم؛ اگر خالی بود از selectedAmountRial
  const selectedAmount =
    Form.useWatch("newResidenceSelectedAmount", form) ?? data.selectedAmountRial;

  // وضعیت چک‌باکس کسر نشود؛ اگر خالی بود از skipChargeDefault
  const skipCharge =
    Form.useWatch("newResidenceSkipCharge", form) ?? data.skipChargeDefault;

  // قانون دلخواه: امکان آلرت افزایش یا کاهش
  const isCustom = data.law === EVACUATION_LAW.custom;

  // قانون ثابت: لیبل بدون کلمه دلخواه
  const isFixed = data.law === EVACUATION_LAW.fixed;

  // مبلغ کامل بدون کسر روزهای سپری‌شده؛ اگر خالی بود از systemAmountRial
  const fullAmountRial = data.fullAmountRial ?? data.systemAmountRial;

  // مبلغ باند: تیک روشن مبلغ کامل، وگرنه مبلغ منتخب
  const effectiveAmount = skipCharge ? fullAmountRial : selectedAmount;

  /**
   * درصد کسر داخل باند
   * تیک روشن یا مبلغ بیشتر از سیستمی: صفر
   * مبلغ برابر مقدار اولیه: selectedPercent
   * مبلغ برابر سیستمی: systemPercent
   * در غیر این صورت: نسبت سیستمی به منتخب
   */
  const effectivePercent =
    skipCharge || selectedAmount > data.systemAmountRial
      ? 0
      : selectedAmount === data.selectedAmountRial
        ? data.selectedPercent
        : selectedAmount === data.systemAmountRial
          ? (data.systemPercent ?? 100)
          : selectedAmount > 0
            ? Math.round((data.systemAmountRial / selectedAmount) * 100)
            : 0;

  // آلرت افزایش: دلخواه و تیک خاموش و مبلغ بیشتر از سیستمی
  const showIncreaseAlert =
    isCustom && !skipCharge && selectedAmount > data.systemAmountRial;

  // آلرت کاهش: دلخواه و تیک خاموش و مبلغ کمتر از سیستمی
  const showDecreaseAlert =
    isCustom && !skipCharge && selectedAmount < data.systemAmountRial;

  // مود دراور علت: کاهش یا افزایش
  const reasonCostMode = showDecreaseAlert ? "decrease" : "increase";

  const amountFieldLabel = isFixed ? "مبلغ منتخب" : "مبلغ منتخب دلخواه";
  const amountInputHint = data.amountInputHint ?? data.rangeHint;

  //* ================================ Util Functions ================================

  // تیک روشن: مبلغ کامل | تیک خاموش: برگشت به مبلغ اولیه
  const skipChargeChangeHandler = (checked: boolean) => {
    if (checked) {
      form.setFieldsValue({
        newResidenceSelectedAmount: fullAmountRial,
        newResidenceSkipCharge: true,
      });
      return;
    }
    form.setFieldsValue({
      newResidenceSkipCharge: false,
      newResidenceSelectedAmount: data.selectedAmountRial || data.systemAmountRial,
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
          <AiOutlineInfoCircle className="text-primary-6" size={16} />
          <p className="text-neutral-11 flex-1 text-base font-medium">
            هزینه روزهای سپری شده و باقی مانده از اقامت را با کاربر حساب کن ! از کاربر
            بگیر
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1">
            <span className="text-neutral-12 text-sm font-bold">
              نحوه محاسبه هزینه اقامتی
            </span>
            <AiOutlineInfoCircle className="text-neutral-7" size={14} />
          </div>
          {data.showSystemPercentLink ? (
            <CustomButton type="link" onClick={openSystemicPercentageDrawerHandler}>
              محاسبه مبلغ هزینه اقامتی با درصد سیستمی
            </CustomButton>
          ) : null}
        </div>

        <div className="bg-primary-1 flex flex-col items-center gap-4 rounded-xl px-5 py-4 text-center">
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
              کسر <span className="font-bold">{effectivePercent}%</span> هزینه روزانه
            </p>
            <p className="m-0">(بابت مجموع روزهای سپری شده اقامت)</p>
          </div>
        </div>

        <CustomInputNumber
          name="newResidenceSelectedAmount"
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
            name="newResidenceSkipCharge"
            valuePropName="checked"
            disabled={data.isSkipChargeDisabled}
            onChange={(event) => skipChargeChangeHandler(event.target.checked)}
          >
            هزینه روزهای سپری شده از هزینه اقامتی کسر نشود.
          </CustomSingleCheckbox>
        </div>

        {showIncreaseAlert ? (
          <CustomAlert
            type="error"
            showIcon
            title="افزایش هزینه اقامتی"
            description="چرا مبلغ منتخب برای هزینه اقامتی بیشتر از کل هزینه اقامتی است؟ علت را وارد کنید"
            action={
              <CustomButton
                type="link"
                danger
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
            title="کاهش هزینه اقامتی بابت روز های باقی‌مانده"
            description="چرا مبلغ منتخب بابت روز های باقی مانده کمتر از هزینه اقامتی است؟ علت را وارد کنید"
            action={
              <CustomButton
                type="link"
                danger
                className="text-dustred-6!"
                onClick={openReasonCostDrawerHandler}
              >
                علت و توضیحات کاهش هزینه
              </CustomButton>
            }
          />
        ) : null}
      </div>
    </>
  );
};

export default NewResidenceFinancialLawCard;
