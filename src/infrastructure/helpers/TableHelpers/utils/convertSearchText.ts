export const convertSearchText = (value: string | number | boolean) => {
  let newValue = value;

  if (typeof newValue === "string") {
    // Convert Persian/Farsi numbers to Latin numbers
    newValue = newValue
      .replace(/۰/g, "0")
      .replace(/۱/g, "1")
      .replace(/۲/g, "2")
      .replace(/۳/g, "3")
      .replace(/۴/g, "4")
      .replace(/۵/g, "5")
      .replace(/۶/g, "6")
      .replace(/۷/g, "7")
      .replace(/۸/g, "8")
      .replace(/۹/g, "9")
      .replace(/إ|أ/g, "ا")
      .replace(/ک|ك/g, "ک")
      .replace(/ي|ی/g, "ی")
      .toLowerCase(); // Normalize and convert to lowercase
  }

  return newValue;
};
