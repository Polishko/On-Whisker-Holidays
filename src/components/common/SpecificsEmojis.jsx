import { specificsToEmoji } from "../../utils/emoji.js";

function SpecificsEmojis({ specifics }) {
  return <span>{specificsToEmoji(specifics)}</span>;
}

export default SpecificsEmojis;
