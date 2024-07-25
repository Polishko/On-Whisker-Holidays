import { flagemojiToPNG } from "../../utils/emoji.js";

function EmojiRenderer({ emoji }) {
  const src = flagemojiToPNG(emoji);
  return <img src={src} alt="flag" />;
}

export default EmojiRenderer;
