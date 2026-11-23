function toEnglishDigits(num: string | number): string {
  if (num === null || num === undefined) {
    return "";
  }

  const faDigits = /[۰-۹]/g;
  const arDigits = /[٠-٩]/g;

  return num
    .toString()
    .replace(faDigits, (d) => (d.charCodeAt(0) - 1728).toString())
    .replace(arDigits, (d) => (d.charCodeAt(0) - 1632).toString())
    .replace(/,/g, "");
}

export function numberToWordConvertor(input: string | number, level = 0): string {
  const inputEnglishDigit = toEnglishDigits(input);
  if (input === null || inputEnglishDigit === null) {
    return "";
  }

  let num = parseInt(inputEnglishDigit);

  if (num < 0) {
    num = num * -1;
    return "منفی " + numberToWordConvertor(num, level);
  }
  if (num === 0) {
    if (level === 0) {
      return "صفر";
    } else {
      return "";
    }
  }
  let result = "";
  const yekan = ["یک", "دو", "سه", "چهار", "پنج", "شش", "هفت", "هشت", "نه"],
    dahgan = ["بیست", "سی", "چهل", "پنجاه", "شصت", "هفتاد", "هشتاد", "نود"],
    sadgan = [
      "یکصد",
      "دویست",
      "سیصد",
      "چهارصد",
      "پانصد",
      "ششصد",
      "هفتصد",
      "هشتصد",
      "نهصد",
    ],
    dah = [
      "ده",
      "یازده",
      "دوازده",
      "سیزده",
      "چهارده",
      "پانزده",
      "شانزده",
      "هفده",
      "هیجده",
      "نوزده",
    ];

  if (level > 0) {
    result += " و ";
    level -= 1;
  }

  if (num < 10) {
    result += yekan[num - 1];
  } else if (num < 20) {
    result += dah[num - 10];
  } else if (num < 100) {
    result +=
      dahgan[Math.floor(num / 10) - 2] + numberToWordConvertor(num % 10, level + 1);
  } else if (num < 1000) {
    result +=
      sadgan[Math.floor(num / 100) - 1] + numberToWordConvertor(num % 100, level + 1);
  } else if (num < 1000000) {
    result +=
      numberToWordConvertor(Math.floor(num / 1000), level) +
      " هزار" +
      numberToWordConvertor(num % 1000, level + 1);
  } else if (num < 1000000000) {
    result +=
      numberToWordConvertor(Math.floor(num / 1000000), level) +
      " میلیون" +
      numberToWordConvertor(num % 1000000, level + 1);
  } else if (num < 1000000000000) {
    result +=
      numberToWordConvertor(Math.floor(num / 1000000000), level) +
      " میلیارد" +
      numberToWordConvertor(num % 1000000000, level + 1);
  } else if (num < 1000000000000000) {
    result +=
      numberToWordConvertor(Math.floor(num / 1000000000000), level) +
      " تریلیارد" +
      numberToWordConvertor(num % 1000000000000, level + 1);
  }

  return result;
}
