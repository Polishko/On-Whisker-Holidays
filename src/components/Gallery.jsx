import { useEffect, useRef, useReducer } from "react";
import PropTypes from "prop-types";
import styles from "./Gallery.module.css";

const slides = [
  {
    title: "Machu Picchu",
    subtitle: "Peru",
    description: "Adventure is never far away",
    image: "../mountain_stay.jpeg",
  },
  {
    title: "Chamonix",
    subtitle: "France",
    description: "Let your dreams come true",
    image: "../mountain_stay.jpeg",
  },
  // ... other slides
];

function Slide({ slide, offset }) {
  const active = offset === 0 ? true : null;
  // const ref = useTilt(active);

  return (
    <div
      // ref={ref}
      className={styles.slide}
      data-active={active}
      style={{
        "--offset": offset,
        "--dir": offset === 0 ? 0 : offset > 0 ? 1 : -1,
      }}
    >
      <div
        className={styles.slideBackground}
        // style={{
        //   backgroundImage: `url('${slide.image}')`,
        // }}
      >
        {" "}
        <img src={`${slide.image}`} alt="" />
        {/* <div
        className={styles.slideContent}
        style={{
          backgroundImage: `url('${slide.image}')`,
        }}
      > */}
        <div className={styles.slideContentInner}>
          <h2 className={styles.slideTitle}>{slide.title}</h2>
          <h3 className={styles.slideSubtitle}>{slide.subtitle}</h3>
          <p className={styles.slideDescription}>{slide.description}</p>
        </div>
      </div>
    </div>
  );
}

// Define prop types for Slide component
Slide.propTypes = {
  slide: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  offset: PropTypes.number.isRequired,
};

const initialState = {
  slideIndex: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "NEXT":
      return {
        ...state,
        slideIndex: (state.slideIndex + 1) % slides.length,
      };
    case "PREV":
      return {
        ...state,
        slideIndex:
          state.slideIndex === 0 ? slides.length - 1 : state.slideIndex - 1,
      };
    default:
      throw new Error("Unknown action");
  }
};

function Gallery() {
  const [{ slideIndex }, dispatch] = useReducer(reducer, initialState);

  return (
    <div className={styles.slides}>
      <button onClick={() => dispatch({ type: "PREV" })}>‹</button>

      {slides.map((slide, i) => {
        // Display only the slide with the current slideIndex
        if (i === slideIndex) {
          return <Slide slide={slide} offset={0} key={i} />;
        }
        return null; // Hide other slides
      })}

      <button onClick={() => dispatch({ type: "NEXT" })}>›</button>
    </div>
  );
}

export default Gallery;
