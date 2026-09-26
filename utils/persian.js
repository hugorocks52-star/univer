const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
const arabicDigits = "٠١٢٣٤٥٦٧٨٩";

export function toPersianDigits(value) {
  return String(value).replace(/\d/g, (digit) => persianDigits[digit]);
}

export function formatPersianNumber(value) {
  return new Intl.NumberFormat("fa-IR").format(value);
}

export function formatPersianYear(value) {
  return toPersianDigits(value);
}

export function toEnglishDigits(value) {
  return String(value)
    .replace(/[۰-۹]/g, (digit) => persianDigits.indexOf(digit))
    .replace(/[٠-٩]/g, (digit) => arabicDigits.indexOf(digit));
}
