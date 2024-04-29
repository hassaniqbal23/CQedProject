import React from 'react';

interface ICarouselItem {
  title: string;
  description: string;
  imgPath: string;
}

interface CarouselProps {
  carouselItems: ICarouselItem[];
}

export const LoginCarousel = ({ carouselItems }: CarouselProps) => {
  const currentSlideIndex = React.useRef(0);

  const nextSlide = () => {
    currentSlideIndex.current = currentSlideIndex.current + 1;
  };

  const prevSlide = () => {
    currentSlideIndex.current = currentSlideIndex.current - 1;
  };

  const currentSlide = React.useMemo(() => {
    return carouselItems[currentSlideIndex.current];
  }, [carouselItems, currentSlideIndex]);

  return (
    <div
      style={{
        backgroundImage: `url(${currentSlide.imgPath})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        width: '100vw',
        position: 'relative',
      }}
    >
      <div className="text-white absolute bottom-0  p-4 mb-6 overlay">
        <h1 className="font-bold text-2xl">{currentSlide.title}</h1>
        <p className="font-semibold text-lg">{currentSlide.description}</p>
        {carouselItems.map((item: ICarouselItem, index: number) => (
          <button
            key={index}
            type="button"
            style={{ marginRight: '3px' }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlideIndex.current
                ? 'bg-yellow-400 w-4 h-[6px]'
                : 'w-[6px] h-[6px] rounded-full bg-white'
            }`}
            aria-current={
              index === currentSlideIndex.current ? 'true' : 'false'
            }
            aria-label={`Slide ${index + 1}`}
            data-carousel-slide-to={index}
            onClick={() => {
              currentSlideIndex.current = index;
            }}
          ></button>
        ))}
      </div>
    </div>
  );
};
