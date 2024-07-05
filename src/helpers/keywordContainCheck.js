export const containsAllKeywords = (keywordList, keywordString) => {
  const keywordSet = new Set(
    keywordList.map((keyword) => keyword.toLowerCase())
  );
  const keywords = keywordString.toLowerCase().split(" ");

  return keywords.every((keyword) => keywordSet.has(keyword));
};
