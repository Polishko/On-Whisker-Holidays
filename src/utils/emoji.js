export const flagemojiToPNG = (flag) => {
  const countryCode = [...flag]
    .map((codeUnit) => codeUnit.codePointAt(0) - 127397)
    .map((charCode) => String.fromCodePoint(charCode).toLowerCase())
    .join("");

  return `https://flagcdn.com/24x18/${countryCode}.png`;
};

// export const flagToCountryCode = (flag) => {
//   const countryCode = [...flag]
//     .map((codeUnit) => String.fromCodePoint(codeUnit.codePointAt(0) - 127397))
//     .join("")
//     .toUpperCase();

//   return countryCode;
// };

export const specificsToEmoji = (specifics) => {
  const emojis = {
    mountain: "🌄",
    seaside: "🌊",
    nature: "🌳",
    city: "🌆",
  };

  const convertedSpecifics = specifics.map(
    (specific) => emojis[specific] || ""
  );

  return convertedSpecifics;
};
