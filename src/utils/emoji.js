export const flagemojiToPNG = (flag) => {
  const countryCode = [...flag]
    .map((codeUnit) => codeUnit.codePointAt(0) - 127397)
    .map((charCode) => String.fromCodePoint(charCode).toLowerCase())
    .join("");

  return `https://flagcdn.com/24x18/${countryCode}.png`;
};

export const specificsToEmoji = (specifics = []) => {
  //handle undefined or null values gracefully
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
