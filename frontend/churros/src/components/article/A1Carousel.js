import React, { useState } from "react";
import A1 from "./A1";

const A1Carousel = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
    );
  };

  return (
    <div className="relative flex w-full h-full overflow-hidden">
      <button
        className="absolute top-1/2 z-10 bg-black bg-opacity-10 text-white text-2xl cursor-pointer p-2 -translate-y-1/2 left-0 h-1/4 w-20"
        onClick={prevSlide}
      >
        &larr;
      </button>
      {slides.map((slide, idx) => (
        <div
          key={idx}
          className={`${
            idx === currentSlide
              ? "relative w-full h-full overflow-hidden"
              : "hidden"
          }`}
        >
          <A1
            articleId={slide.idx}
            url={slide.url}
            imgUrl={slide.imgUrl}
            title={slide.title}
            description={slide.description}
          />
        </div>
      ))}
      <button
        className="absolute top-1/2 z-10 bg-black bg-opacity-10 text-white text-2xl cursor-pointer p-2 -translate-y-1/2 right-0 h-1/4 w-20"
        onClick={nextSlide}
      >
        &rarr;
      </button>
    </div>
  );
};

export default A1Carousel;
