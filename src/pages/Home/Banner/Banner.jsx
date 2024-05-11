import { useRef } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './Banner.css';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const Banner = () => {
    const progressCircle = useRef(null);
    const progressContent = useRef(null);
    const onAutoplayTimeLeft = (s, time, progress) => {
      progressCircle.current.style.setProperty('--progress', 1 - progress);
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    };
    return (
        <div>
          <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper max-h-[calc(100vh-120px)]"
      >
        
        <SwiperSlide className='items-center justify-center'><img src="https://i.ibb.co/h8xnCHT/banner-06.jpg" alt="" className='h-auto w-full object-cover'/></SwiperSlide>
        <SwiperSlide className='flex items-center justify-center'><img src="https://i.ibb.co/0BfVFT1/banner-08.jpg" alt="" className='h-auto w-full object-cover'/></SwiperSlide>
        <SwiperSlide className='flex items-center justify-center'><img src="https://i.ibb.co/9byVs98/banner-07.jpg" alt="" className='h-auto w-full object-cover'/></SwiperSlide>
        <SwiperSlide className='flex items-center justify-center'><img src="https://i.ibb.co/QKqf309/banner-04.jpg" alt="" className='h-auto w-full object-cover'/></SwiperSlide>
        <SwiperSlide className='flex items-center justify-center'><img src="https://i.ibb.co/yYHL5Y8/banner-03.jpg" alt="" className='h-auto w-full object-cover'/></SwiperSlide>
        <SwiperSlide className='flex items-center justify-center'><img src="https://i.ibb.co/jk8N608/banner-09.jpg" alt="" className='h-auto w-full object-cover'/></SwiperSlide>
        <div className="autoplay-progress " slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
        </div>
    );
};

export default Banner;