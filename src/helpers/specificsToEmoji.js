export const specificsToEmoji = (specifics) => {
  const emojis = {
    mountain: "🌄",
    seaside: "🌊",
    water: "🤽‍♂️",
    nature: "🌳",
  };

  const convertedSpecifics = specifics.map(
    (specific) => emojis[specific] || ""
  );

  return convertedSpecifics;
};
