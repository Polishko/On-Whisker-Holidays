export function containsAllKeywords(keywordList, keywordString) {
  const keywordSet = new Set(
    keywordList.map((keyword) => keyword.toLowerCase())
  );

  const keywords = keywordString.toLowerCase().split(" ");

  const result = keywords.every((keyword) =>
    [...keywordSet].some((setKeyword) => setKeyword.includes(keyword))
  );

  return result;
}
