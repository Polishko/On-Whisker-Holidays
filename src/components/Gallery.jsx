import { useReducer } from "react";
import PropTypes from "prop-types";
import styles from "./Gallery.module.css";
import Message from "./Message.jsx";
import Button from "./Button.jsx";

const slides = [
  {
    title: "Amazing mountain views",
    image: "../mountain_stay.jpeg",
  },
  {
    title: "Fun on the beach",
    image: "../Eksi-and-Badi.jpg",
  },
  {
    title: "Making friends",
    image: "../pals.jpg",
  },
];

function Slide({ children }) {
  return <div className={styles.slide}>{children}</div>;
}

Slide.propTypes = {
  children: PropTypes.node.isRequired,
};

const initialState = {
  galleryOpened: false,
  slideIndex: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "openGallery":
      return { ...state, galleryOpened: true };

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
    case "galleryClose":
      return { ...state, galleryOpened: false };
    default:
      throw new Error("Unknown action");
  }
};

function Gallery() {
  const [{ slideIndex, galleryOpened }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const slide = slides.at(slideIndex);

  if (!galleryOpened)
    return (
      <div>
        <Message
          message={"Check the gallery for inspiration on your next holiday!"}
          background={"dark"}
        />
        <Button
          type="primary"
          onClick={() => dispatch({ type: "openGallery" })}
        >
          Check
        </Button>
      </div>
    );

  return (
    <div className={styles.slides}>
      <Button type="navigate" onClick={() => dispatch({ type: "PREV" })}>
        ‹
      </Button>

      <Slide>
        <img
          src={slide.image}
          alt={slide.title}
          className={styles.slideImage}
        />

        <div className={styles.slideInnerContent}>
          <h2 className={styles.slideTitle}>{slide.title}</h2>
        </div>
        <Button type="close" onClick={() => dispatch({ type: "galleryClose" })}>
          X
        </Button>
      </Slide>

      <Button type="navigate" onClick={() => dispatch({ type: "NEXT" })}>
        ›
      </Button>
    </div>
  );
}

export default Gallery;
