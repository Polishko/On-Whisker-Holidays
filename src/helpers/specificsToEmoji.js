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
