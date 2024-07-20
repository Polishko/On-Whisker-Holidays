import { flagemojiToPNG } from "../../helpers/flagemojiToPNG";

function EmojiRenderer({ emoji }) {
  const src = flagemojiToPNG(emoji);
  return <img src={src} alt="flag" />;
}

export default EmojiRenderer;
