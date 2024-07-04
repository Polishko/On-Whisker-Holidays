export const flagToCountryCode = (flag) => {
  const countryCode = [...flag]
    .map((codeUnit) => String.fromCodePoint(codeUnit.codePointAt(0) - 127397))
    .join("")
    .toUpperCase();

  return countryCode;
};
