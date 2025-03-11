import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import image1 from "../assets/image-1.jpg";
import image2 from "../assets/image-2.jpg";
import image3 from "../assets/image-3.jpg";
import image4 from "../assets/image-4.jpg";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const images = [
  image1,
  image2,
  image3,
  image4,
];

const Carousel: React.FC = () => {
  return (
    <div className="w-[197vh] overflow-hidden h-[100vh]">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop
        className="rounded-lg shadow-lg"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full h-96 object-cover rounded-lg"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
