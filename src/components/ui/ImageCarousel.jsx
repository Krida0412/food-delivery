import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const ImageCarousel = ({ images = [] }) => {
  return (
    <div className="relative w-full">
      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        spaceBetween={16}
        slidesPerView={3}
        grabCursor={true}
        className="py-4"
      >
        {images.length > 0 ? (
          images.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="w-full h-[200px] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                <img
                  src={img}
                  alt={`slide-${index}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </SwiperSlide>
          ))
        ) : (
          <div className="text-center w-full py-10 text-textColor font-semibold">
            Tidak ada gambar untuk ditampilkan.
          </div>
        )}
      </Swiper>

      {/* Tombol panah */}
      <div className="swiper-button-prev absolute -left-5 top-[45%] z-10 w-10 h-10 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer flex items-center justify-center">
        <span className="text-white text-2xl">‹</span>
      </div>
      <div className="swiper-button-next absolute -right-5 top-[45%] z-10 w-10 h-10 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer flex items-center justify-center">
        <span className="text-white text-2xl">›</span>
      </div>
    </div>
  );
};

export default ImageCarousel;
