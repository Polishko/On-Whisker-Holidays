import styles from "./SpecificsEmojis.module.css";

import { specificsToEmoji } from "../../utils/emoji.js";

function SpecificsEmojis({ specifics }) {
  const emojis = specificsToEmoji(specifics);

  return (
    <span>
      {emojis.map((emoji, index) => (
        <span
          key={index}
          className={styles.tooltipText}
          title={specifics[index]} // title attribute to create tooltip
        >
          {emoji}
        </span>
      ))}
    </span>
  );
}

export default SpecificsEmojis;
