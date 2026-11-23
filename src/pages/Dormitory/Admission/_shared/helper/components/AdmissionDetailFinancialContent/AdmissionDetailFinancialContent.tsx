import { Row } from "antd";
import { PiPencilLine } from "react-icons/pi";
import { Link, useNavigate } from "react-router";

import { CustomButton } from "@components/CustomInputs";
import CustomAlert from "@components/Renderers/CustomAlert/CustomAlert";
import CustomDivider from "@components/Renderers/CustomDivider/CustomDivider";
import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import SingleVerticalWithCol from "@components/Renderers/SingleVerticalWithCol/SingleVerticalWithCol";
import { makeSearchParams } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import { CONTRACTS_DETAIL_PAGE_ROUTE } from "@infra/router/routes/contracts";
import { DORMITORY_CONTRACT_DETAIL_PAGE_ROUTE } from "@infra/router/routes/dormitory";
import { AdmissionDetailFinancialContentProps } from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionDetailFinancialContent/@types/@admissionDetailFinancialContent";
import ReadonlySwitchAlert from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionDetailFinancialContent/helpers/components/ReadonlySwitchAlert/ReadonlySwitchAlert";
import { MY_ADMISSION_STATUS } from "@pages/Dormitory/Admission/_shared/util";
import {
  PAYMENT_OPTION,
  RESERVE_TYPE,
} from "@pages/Dormitory/Residence/ActiveResidence/_shared/util";

const AdmissionDetailFinancialContent = ({
  variant,
  data,
  editTo,
  status,
}: AdmissionDetailFinancialContentProps) => {
  const navigate = useNavigate();
  const { params: url } = useQueryParams();
  const isActiveVariant = variant === "active";
  const isAllVariant = variant === "all";
  // Active detail is shared by All/My lists; "from" selects the correct contract detail route.
  const isFromAll = isAllVariant || (isActiveVariant && url?.from === "all");
  const showEdit = status === MY_ADMISSION_STATUS.waiting;
  // Active programs always expose a contract link; waiting/accepted use status gates.
  const hasContract =
    isActiveVariant ||
    status === MY_ADMISSION_STATUS.accepted ||
    status === MY_ADMISSION_STATUS.active;
  const contractDetailTo = {
    pathname: isFromAll
      ? CONTRACTS_DETAIL_PAGE_ROUTE
      : DORMITORY_CONTRACT_DETAIL_PAGE_ROUTE,
    search: makeSearchParams({ id: data.contractId }),
  };

  const reserveTypeConfig = RESERVE_TYPE[data.reserveType];
  const paymentOptionConfig = PAYMENT_OPTION[data.paymentOption];
  const ReserveIcon = reserveTypeConfig.icon;

  const isRequestReserve = data.reserveType === "ReservationRequest"; // رزرو درخواستی
  const isUrgentReserve = data.reserveType === "UrgentReserve"; // رزرو فوری
  const isOncePayment = data.paymentOption === "OncePayment"; // پرداخت یکجا
  const isInstallmentPayment = !isOncePayment; // پرداخت اقساط

  // فوری + قسطی/قسطی‌و‌یکجا → بدون سوییچ مهلت
  const showPaymentDeadlineSwitch = !(isUrgentReserve && isInstallmentPayment);
  // مهلت پرداخت فقط در رزرو درخواستی جزء ساختار است
  const showPaymentDeadlineDaysField = isRequestReserve;
  // درخواستی + یکجا → درصد تکی؛ بقیه وریانت‌ها → حداقل/حداکثر
  const useCheckoutSingleFields = isRequestReserve && isOncePayment;
  const useCheckoutRangeFields = !useCheckoutSingleFields;

  /* //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="flex flex-col gap-10">
      <CustomDivider
        text=""
        extraContent={
          <div className="flex items-center gap-4">
            <CustomTag
              className="w-fit gap-1"
              color={reserveTypeConfig.color}
              icon={<ReserveIcon size={14} />}
            >
              {reserveTypeConfig.label}
            </CustomTag>
            <CustomTag className="w-fit" color={paymentOptionConfig.color}>
              {paymentOptionConfig.label}
            </CustomTag>
            {isAllVariant && showEdit && editTo && (
              <CustomButton
                type="dashed"
                icon={<PiPencilLine />}
                onClick={() => navigate(editTo)}
              >
                ویرایش
              </CustomButton>
            )}
          </div>
        }
      />

      <div className="flex flex-col gap-6">
        <CustomDivider text="تنظیمات پرداخت" />

        {isInstallmentPayment && ( // اگر پرداخت اقساط باشد، هشدار محاسبه اقساط برای ودیعه نمایش داده شود
          <>
            <CustomAlert
              type="warning"
              showIcon
              className="border border-dashed! font-medium"
              title="اقساط برای ودیعه محاسبه نمی‌گردد و مبلغ ودیعه بایستی به صورت کامل دریافت شود."
            />
            <CustomDivider text="تنظیمات" titleClassName="text-sm! font-normal!" />
          </>
        )}

        {showPaymentDeadlineSwitch && ( // فوری + قسطی/قسطی‌و‌یکجا نباشند
          <ReadonlySwitchAlert
            valuePropName="hasPaymentDeadline"
            checked={data.hasPaymentDeadline}
            question="آیا برای پرداخت هزینه رزرو، مهلت مشخصی در نظر گرفته شود؟"
            description="اگر کاربر در این مهلت پیش‌پرداخت یا مبلغ یکجا را پرداخت نکند، درخواستش منقضی شده و ظرفیت رزرو‌شده دوباره در دسترس قرار می‌گیرد."
          />
        )}

        {isOncePayment && data.hasPaymentDeadline && (
          <Row gutter={[16, 16]}>
            <SingleVerticalWithCol
              label="جریمه دیرکرد روزانه"
              value={data.dailyLatePenaltyPercent}
              symbol="٪"
            />
            {showPaymentDeadlineDaysField && (
              <SingleVerticalWithCol
                label="مهلت پرداخت (پس از تایید درخواست)"
                value={data.paymentDeadlineDays ?? undefined}
                symbol="روز"
              />
            )}
          </Row>
        )}

        {isInstallmentPayment && (
          <div className="flex flex-col gap-4">
            <Row gutter={[16, 16]}>
              <SingleVerticalWithCol
                label="تعداد اقساط"
                value={data.installmentCount}
                symbol="قسط"
              />
              <SingleVerticalWithCol
                label="نرخ سود از کل مبلغ"
                value={data.interestRatePercent}
                symbol="٪"
              />
              <SingleVerticalWithCol
                label="جریمه دیرکرد روزانه"
                value={data.dailyLatePenaltyPercent}
                symbol="٪"
              />
              {showPaymentDeadlineSwitch &&
                data.hasPaymentDeadline &&
                showPaymentDeadlineDaysField && (
                  <SingleVerticalWithCol
                    label="مهلت پرداخت (پس از تایید درخواست)"
                    value={data.paymentDeadlineDays ?? undefined}
                    symbol="روز"
                  />
                )}
            </Row>
            <hr className="border-neutral-4" />

            <div className="flex flex-col gap-4">
              {data.installments.map((installment) => (
                <Row key={installment.title} gutter={[16, 16]}>
                  <SingleVerticalWithCol label="شماره قسط" value={installment.title} />
                  <SingleVerticalWithCol
                    label="درصد از مبلغ کل"
                    value={installment.percent}
                    symbol="٪"
                  />
                  {!installment.isPrePayment && ( // اگر قسط پیش پرداخت نباشد، زمان سررسید نمایش داده شود
                    <SingleVerticalWithCol
                      label="زمان سررسید ( پس از شروع بازه اسکان درخواستی)"
                      value={installment.dueDays ?? undefined}
                      symbol="روز"
                    />
                  )}
                </Row>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-6">
        <CustomDivider text="سیاست انصراف از رزرو" />

        <ReadonlySwitchAlert
          valuePropName="hasCancellationPolicy"
          checked={data.hasCancellationPolicy}
          question="آیا کاربران امکان انصراف از رزرو پس از تایید درخواست و دریافت وجه را قبل از شروع دوره مجاز اسکان دارند؟"
        />

        {data.hasCancellationPolicy && (
          <div className="flex flex-col gap-4">
            <CustomAlert
              type="warning"
              showIcon
              title="درصد عودت وجه شامل ودیعه نمی‌شود و مبلغ ودیعه به‌صورت کامل به کاربر عودت داده خواهد شد."
            />

            {data.cancellationRules.map((rule) => (
              <Row key={`${rule.remainingDays}-${rule.refundPercent}`} gutter={[16, 16]}>
                <SingleVerticalWithCol
                  span={12}
                  label="مانده به شروع بازه اسکان درخواستی"
                  value={rule.remainingDays}
                  symbol="روز"
                />
                <SingleVerticalWithCol
                  span={12}
                  label="درصد عودت وجه مبلغ پرداختی"
                  value={rule.refundPercent}
                  symbol="٪"
                />
              </Row>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-6">
        <CustomDivider text="قوانین مالی تخلیه" />

        <p className="text-neutral-10 text-sm">
          این تنظیمات نحوه محاسبه بازپرداخت وجه بابت روزهای اسکان استفاده‌نشده و جریمه
          تخلیه دیرهنگام (اسکان مازاد) را مشخص می‌کند.
        </p>

        <div className="flex flex-col gap-4">
          <ReadonlySwitchAlert
            valuePropName="hasEarlyCheckoutRules"
            checked={data.hasEarlyCheckoutRules}
            question="آیا قوانین مالی برای تخلیه زودهنگام اعمال شود؟"
            description="در صورت فعال بودن، هنگام تخلیه زودتر از موعد، بازپرداخت وجه بابت روزهای استفاده‌نشده بر اساس تنظیمات زیر محاسبه خواهد شد."
          />

          {data.hasEarlyCheckoutRules && (
            <Row gutter={[16, 16]}>
              {useCheckoutSingleFields && (
                <SingleVerticalWithCol
                  label="درصد پیش‌فرض بازپرداخت وجه"
                  value={data.earlyCheckoutDefaultRefundPercent}
                  symbol="٪"
                />
              )}
              {useCheckoutRangeFields && (
                <>
                  <SingleVerticalWithCol
                    label="حداقل درصد بازپرداخت وجه"
                    value={data.earlyCheckoutMinRefundPercent}
                    symbol="٪"
                  />
                  <SingleVerticalWithCol
                    label="حداکثر درصد بازپرداخت وجه"
                    value={data.earlyCheckoutMaxRefundPercent}
                    symbol="٪"
                  />
                </>
              )}
            </Row>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <ReadonlySwitchAlert
            valuePropName="hasLateCheckoutPenalty"
            checked={data.hasLateCheckoutPenalty}
            question="آیا جریمه‌ای برای تخلیه دیرهنگام اعمال شود؟"
            description="در صورت فعال بودن، به ازای هر روز تأخیر در تخلیه پس از پایان بازه اسکان، جریمه‌ای بر اساس درصدی از مبلغ اقامت روزانه محاسبه خواهد شد."
          />

          {data.hasLateCheckoutPenalty && (
            <Row gutter={[16, 16]}>
              {useCheckoutSingleFields && (
                <SingleVerticalWithCol
                  label="درصد جریمه روزانه تخلیه دیرهنگام (اسکان مازاد)"
                  value={data.lateCheckoutDefaultPenaltyPercent}
                  symbol="٪"
                />
              )}
              {useCheckoutRangeFields && (
                <>
                  <SingleVerticalWithCol
                    label="حداقل درصد جریمه روزانه تخلیه دیرهنگام (اسکان مازاد)"
                    value={data.lateCheckoutMinPenaltyPercent ?? undefined}
                    symbol="٪"
                  />
                  <SingleVerticalWithCol
                    label="حداکثر درصد جریمه روزانه تخلیه دیرهنگام (اسکان مازاد)"
                    value={data.lateCheckoutMaxPenaltyPercent ?? undefined}
                    symbol="٪"
                  />
                </>
              )}
            </Row>
          )}
          {hasContract && (
            <div className="border-neutral-5 mt-2 flex flex-col gap-4 rounded-2xl border p-4">
              <div className="flex items-center justify-between">
                <span className="text-neutral-12 text-sm">قرارداد برنامه پذیرش</span>
                <Link className="text-primary-6!" to={contractDetailTo}>
                  مشاهده
                </Link>
              </div>

              <Row gutter={[16, 16]}>
                <SingleVerticalWithCol
                  label="شناسه قرارداد"
                  value={data.contractId}
                  lg={8}
                />
                <SingleVerticalWithCol
                  label="تاریخ شروع"
                  value={data.contractStartDate}
                  lg={8}
                  isDate
                />
                <SingleVerticalWithCol
                  label="تاریخ پایان"
                  value={data.contractEndDate}
                  lg={8}
                  isDate
                />
              </Row>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdmissionDetailFinancialContent;
