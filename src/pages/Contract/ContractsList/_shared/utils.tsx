import moment from "jalali-moment";

/**
 * محاسبه تفاوت روزها بین دو تاریخ قرارداد و برگرداندن کلاس رنگ
 * @param startDate تاریخ شروع
 * @param endDate تاریخ پایان
 * @returns object شامل diffDays و colorClass یا null
 */
export const calculateContractDiffDays = (
  startDate?: string | null,
  endDate?: string | null
): { diffDays: number; colorClass: "red" | "yellow" | "green" } | null => {
  if (!startDate || !endDate) {
    return null;
  }

  const diffDays = moment(endDate).diff(moment(startDate), "days");
  const colorClass: "red" | "yellow" | "green" =
    diffDays <= 20 ? "red" : diffDays > 20 && diffDays <= 40 ? "yellow" : "green";

  return { diffDays, colorClass };
};

/**
 * بررسی اینکه آیا تفاوت روزها کمتر یا مساوی 20 است یا نه
 * @param startDate تاریخ شروع
 * @param endDate تاریخ پایان
 * @returns boolean
 */
export const isContractNearExpiry = (
  startDate?: string | null,
  endDate?: string | null
): boolean => {
  const result = calculateContractDiffDays(startDate, endDate);
  return result ? result.diffDays <= 20 : false;
};

/**
 * Render کردن JSX element برای نمایش تفاوت روزها بین دو تاریخ قرارداد
 * @param startDate تاریخ شروع
 * @param endDate تاریخ پایان
 * @returns React element یا null
 */
export const renderContractDiffDaysTag = (
  startDate?: string | null,
  endDate?: string | null
): React.ReactElement | null => {
  const result = calculateContractDiffDays(startDate, endDate);
  if (!result) {
    return <>-</>;
  }

  const { diffDays, colorClass } = result;

  return (
    <div className="custom-tag-with-diff-days-container flex flex-col items-center gap-1">
      <span
        className={`flex h-4.5 w-9 items-center justify-center rounded-[10px] ${colorClass}`}
      >
        {diffDays}
      </span>
      <span>روز</span>
    </div>
  );
};
