import React from "react";
import Slider from "react-slick";
import Card from "./Card";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CardCarousel = ({ images, className }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <Slider {...settings} className={className}>
      {images.map((image) => (
        <Card key={image.id} className={"w-full h-[34rem]"}>
          <img
            src={`${process.env.PUBLIC_URL}${image.src}`}
            alt={image.alt}
            className="w-full h-full mx-auto object-contain"
          />
        </Card>
      ))}
    </Slider>
  );
};

export default CardCarousel;
