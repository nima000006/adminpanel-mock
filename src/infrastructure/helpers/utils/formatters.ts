export type PriceCurrency =
  | {
      type: string;
      isAvailable: true;
    }
  | { type: undefined; isAvailable: false };

export const PriceSeparator = (
  price: string | number,
  isRial?: boolean,
  currency?: PriceCurrency
) => {
  if (price == null || price === "") {
    return "";
  }

  let value = Number(price);

  if (Number.isNaN(value)) {
    return "";
  }

  if (isRial) {
    value /= 10;
    value = Number(value.toFixed(2));
  }

  const formatted = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return currency?.isAvailable ? `${formatted} ${currency.type ?? "تومان"}` : formatted;
};

export const NumberDotSeparator = (number: string) => {
  if (!number) return "";
  return number.split(".")?.[0].toString();
};

export const PriceSeparatorWithExtraNumbers = (price: string | number) => {
  if (!price) return "";

  const priceValue = typeof price === "string" ? price : price?.toString();
  return priceValue
    .split(".")?.[0]
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const LimitText = (string = "", maxLength = 0) => {
  if (typeof string !== "string" || maxLength === 0) return "";
  if (string.length <= maxLength) return string;
  return string.substring(0, maxLength) + "...";
};

export const farsiNumberToEnglish = (input: string) => {
  // Persian/Farsi digits: ۰۱۲۳۴۵۶۷۸۹
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

  // Arabic digits: ٠١٢٣٤٥٦٧٨٩
  const arabicDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];

  let result = input;

  // Convert Persian digits
  result = result.replace(/[۰-۹]/g, (match) => persianDigits.indexOf(match).toString());

  // Convert Arabic digits
  result = result.replace(/[٠-٩]/g, (match) => arabicDigits.indexOf(match).toString());

  return result;
};

export const normalizeArabicPersianToEnglishAndFarsi = (input: string): string => {
  return (
    farsiNumberToEnglish(input)
      // Alef variants (preserve آ)
      .replace(/[إأٱ]/g, "ا")
      // Arabic Kaf to Persian Kaf
      .replace(/[كک]/g, "ک")
      .replace(/ك/g, "ک")
      // Yeh variants
      .replace(/[يى]/g, "ی")
      .replace(/ئ/g, "ی")
      // Heh variants
      .replace(/[ةۀ]/g, "ه")
      // Waw with hamza
      .replace(/ؤ/g, "و")
      // Tatweel (kashida)
      .replace(/ـ/g, "")
      // Arabic diacritics
      .replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g, "")
      // Zero-width and BOM characters
      .replace(/\u200B|\u200D|\uFEFF/g, "")
      // Normalize consecutive ZWNJ (nim-fasele)
      .replace(/\u200C+/g, "\u200C")
      // Collapse whitespace
      .replace(/\s+/g, " ")
  );
};

export const normalizeText = (text: string) => {
  if (typeof text === "string") {
    text = text
      .replace(/إ|أ/g, "ا")
      .replace(/ک|ك/g, "ک")
      .replace(/ي|ی/g, "ی")
      .toLowerCase(); // Normalize and convert to lowercase
  }
  return text;
};

export const getExtraZeroIfBelowTen = (number: number) => {
  return number >= 0 && number < 10 ? `0${number}` : number.toString();
};

export const intlNumber = (number: number) => {
  return new Intl.NumberFormat("fa-IR", { useGrouping: false }).format(number);
};

export const formatByGroups = (
  value: string | number | null | undefined,
  groupSize = 4,
  separator = "-"
): string => {
  if (value == null || value === "") {
    return "";
  }

  const str = String(value).replace(/\s+/g, "");

  // return str.replace(new RegExp(`(.{${groupSize}})`, "g"), `$1${separator}`).trim();
  return str.match(new RegExp(`.{1,${groupSize}}`, "g"))?.join(separator) ?? "";
};
