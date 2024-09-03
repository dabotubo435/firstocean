import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const CarouselSection: React.FC = () => {
  return (
    <div className="top-0 left-0 bottom-0 w-full bg-gray-800 text-white p-4 z-10">
      <Carousel
        showArrows={true}
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        className="h-full"
      >
        <div>
          <img src="/images/banner1.jpg" alt="Banner 1" className="h-full object-cover" />
        </div>
        <div>
          <img src="/images/banner2.jpg" alt="Banner 2" className="h-full object-cover" />
        </div>
        <div>
          <img src="/images/banner3.jpeg" alt="Banner 3" className="h-full object-cover" />
        </div>
      </Carousel>
    </div>
  );
};

export default CarouselSection;
