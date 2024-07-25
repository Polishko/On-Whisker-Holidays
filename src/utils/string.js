export function containsAllKeywords(keywordList, keywordString) {
  const keywordSet = new Set(
    keywordList.map((keyword) => keyword.toLowerCase())
  );
  const keywords = keywordString.toLowerCase().split(" ");

  // console.log("Keyword Set:", keywordSet);
  // console.log("Keywords to check:", keywords);

  const result = keywords.every((keyword) =>
    [...keywordSet].some((setKeyword) => setKeyword.includes(keyword))
  );
  // console.log("Filtering result:", result);

  return result;
}
