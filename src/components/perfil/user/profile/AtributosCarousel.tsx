"use client";
import React from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

interface Atributo {
  _id: string;
  nombre: string;
  img?: string;
  descripcion?: string;
}

const AtributosCarousel = ({ atributos }: { atributos: Atributo[] }) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1280 },
      items: 3
    },
    desktop: {
      breakpoint: { max: 1280, min: 768 },
      items: 2
    },
    tablet: {
      breakpoint: { max: 768, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <Carousel 
      responsive={responsive} 
      autoPlay={false} 
      autoPlaySpeed={5000} 
      infinite={true} 
      arrows 
      className="w-full"
    >
      {atributos.map((atributo) => (
        <div 
          key={atributo._id}
          className="relative h-64 p-4 mx-2 rounded-lg overflow-hidden shadow-md"
          style={{
            backgroundImage: `url(${atributo.img || '/atributos/default.png'})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-black/40 z-0" />
          <div className="relative z-10 h-full flex flex-col justify-end text-white">
            <h3 className="text-xl font-bold">{atributo.nombre}</h3>
            {atributo.descripcion && (
              <p className="text-sm line-clamp-2">{atributo.descripcion}</p>
            )}
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default AtributosCarousel;
