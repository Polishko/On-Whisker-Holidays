import { specificsToEmoji } from "../../helpers/specificsToEmoji";

function SpecificsEmojis({ specifics }) {
  return <span>{specificsToEmoji(specifics)}</span>;
}

export default SpecificsEmojis;
