// adapted this highly customizable component from Jonas Schmedtmann's Ultimate React Course on Udemy
import { useState } from "react";
import PropTypes from "prop-types"; // separate from react but included in create-react-app

const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const starContainerStyle = {
  display: "flex",
};

// ensure correct usage of props
StarRating.propTypes = {
  maxRating: PropTypes.number,
  defaultRating: PropTypes.number,
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
  messages: PropTypes.array,
  onSetRating: PropTypes.func,
};

export default function StarRating({
  maxRating = 5,
  color = "#F19495",
  size = 48,
  className = "",
  messages = [], // optionally show messages
  defaultRating = 0,
  onSetRating,
}) {
  // const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);

  // function handleRating(rating) {
  //   setRating(rating); // set internal rating
  //   onSetRating(rating); // set external rating for customer use
  // }

  const textStyle = {
    lineHeigh: "1",
    margin: "0",
    color: color,
    fontSize: `${size / 1.5}px`,
  };

  return (
    <div style={containerStyle} className={className}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            full={tempRating ? tempRating >= i + 1 : defaultRating >= i + 1}
            onRate={() => {
              onSetRating(i + 1);
            }}
            onHoverIn={() => setTempRating(i + 1)}
            onHoverOut={() => setTempRating(0)}
            color={color}
            size={size}
          />
        ))}
      </div>
      <p style={textStyle}>
        {messages.length === maxRating
          ? messages[tempRating ? tempRating - 1 : defaultRating - 1]
          : tempRating || defaultRating || ""}
      </p>
    </div>
  );
}

function Star({ onRate, full, onHoverIn, onHoverOut, color, size }) {
  const starStyle = {
    width: `${size}px`,
    height: `${size}px`,
    display: "block",
    cursor: "pointer",
  };

  return (
    <span
      role="button"
      style={starStyle}
      onClick={onRate}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
    >
      {full ? (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.32776 10.0688C10.874 9.726 11.7494 7.74275 11.2831 5.63907C10.8167 3.5354 9.18513 2.10793 7.63887 2.45073C6.09261 2.79353 5.21719 4.77678 5.68356 6.88045C6.14993 8.98413 7.7815 10.4116 9.32776 10.0688Z"
            fill={color}
          />
          <path
            d="M17.8939 6.88046C17.4275 8.98413 15.796 10.4116 14.2497 10.0688C12.7035 9.726 11.828 7.74275 12.2944 5.63908C12.7608 3.5354 14.3924 2.10793 15.9386 2.45073C17.4849 2.79353 18.3603 4.77678 17.8939 6.88046Z"
            fill={color}
          />
          <path
            d="M15.5326 21.5538C15.1131 21.4699 14.6882 21.3268 14.2427 21.1766C13.4265 20.9016 12.5412 20.6033 11.4928 20.6033C10.4444 20.6033 9.55914 20.9016 8.74302 21.1766C8.2975 21.3267 7.87259 21.4699 7.45299 21.5538C6.26478 21.7915 5.31428 21.0786 4.839 20.128C4.36371 19.1775 4.12596 18.2269 4.839 16.8011C5.24058 15.9981 5.64209 15.5719 6.1285 15.0557C6.50572 14.6553 6.93401 14.2008 7.45299 13.4742C7.66963 13.1709 7.86257 12.8676 8.04909 12.5744C8.88557 11.2595 9.59306 10.1473 11.7304 10.1473C13.4807 10.1473 13.9525 10.9996 14.5012 11.9909C14.772 12.4801 15.0615 13.0031 15.5326 13.4742C15.8451 13.7867 16.1234 14.0536 16.3749 14.2948C17.2709 15.154 17.8276 15.6878 18.3843 16.8011C19.0972 18.2269 18.8595 19.1775 18.3843 20.128C17.909 21.0786 16.7208 21.7915 15.5326 21.5538Z"
            fill={color}
          />
          <path
            d="M6.68217 9.91782C7.54106 11.7597 7.10895 13.779 5.71703 14.4281C4.3251 15.0772 2.50045 14.1102 1.64156 12.2683C0.782663 10.4264 1.21477 8.40707 2.6067 7.758C3.99863 7.10893 5.82328 8.07592 6.68217 9.91782Z"
            fill={color}
          />
          <path
            d="M17.8154 14.4281C19.2073 15.0772 21.0319 14.1102 21.8908 12.2683C22.7497 10.4264 22.3176 8.40707 20.9257 7.758C19.5338 7.10894 17.7091 8.07592 16.8502 9.91782C15.9913 11.7597 16.4234 13.779 17.8154 14.4281Z"
            fill={color}
          />
        </svg>
      ) : (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.32776 10.0688C10.874 9.726 11.7494 7.74275 11.2831 5.63907C10.8167 3.5354 9.18513 2.10793 7.63887 2.45073C6.09261 2.79353 5.21719 4.77678 5.68356 6.88045C6.14993 8.98413 7.7815 10.4116 9.32776 10.0688Z"
            fill={color}
          />
          <path
            d="M17.8939 6.88046C17.4275 8.98413 15.796 10.4116 14.2497 10.0688C12.7035 9.726 11.828 7.74275 12.2944 5.63908C12.7608 3.5354 14.3924 2.10793 15.9386 2.45073C17.4849 2.79353 18.3603 4.77678 17.8939 6.88046Z"
            fill={color}
          />
          <path
            d="M15.5326 21.5538C15.1131 21.4699 14.6882 21.3268 14.2427 21.1766C13.4265 20.9016 12.5412 20.6033 11.4928 20.6033C10.4444 20.6033 9.55914 20.9016 8.74302 21.1766C8.2975 21.3267 7.87259 21.4699 7.45299 21.5538C6.26478 21.7915 5.31428 21.0786 4.839 20.128C4.36371 19.1775 4.12596 18.2269 4.839 16.8011C5.24058 15.9981 5.64209 15.5719 6.1285 15.0557C6.50572 14.6553 6.93401 14.2008 7.45299 13.4742C7.66963 13.1709 7.86257 12.8676 8.04909 12.5744C8.88557 11.2595 9.59306 10.1473 11.7304 10.1473C13.4807 10.1473 13.9525 10.9996 14.5012 11.9909C14.772 12.4801 15.0615 13.0031 15.5326 13.4742C15.8451 13.7867 16.1234 14.0536 16.3749 14.2948C17.2709 15.154 17.8276 15.6878 18.3843 16.8011C19.0972 18.2269 18.8595 19.1775 18.3843 20.128C17.909 21.0786 16.7208 21.7915 15.5326 21.5538Z"
            stroke={color}
          />
          <path
            d="M6.68217 9.91782C7.54106 11.7597 7.10895 13.779 5.71703 14.4281C4.3251 15.0772 2.50045 14.1102 1.64156 12.2683C0.782663 10.4264 1.21477 8.40707 2.6067 7.758C3.99863 7.10893 5.82328 8.07592 6.68217 9.91782Z"
            stroke={color}
          />
          <path
            d="M17.8154 14.4281C19.2073 15.0772 21.0319 14.1102 21.8908 12.2683C22.7497 10.4264 22.3176 8.40707 20.9257 7.758C19.5338 7.10894 17.7091 8.07592 16.8502 9.91782C15.9913 11.7597 16.4234 13.779 17.8154 14.4281Z"
            stroke={color}
          />
        </svg>
      )}
    </span>
  );
}
