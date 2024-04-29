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
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);

  const nextSlide = () => {
    if (currentSlideIndex === carouselItems.length - 1) {
      setCurrentSlideIndex(0);
    } else {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlideIndex === 0) {
      setCurrentSlideIndex(carouselItems.length - 1);
    } else {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  const currentSlide = React.useMemo(() => {
    return carouselItems[currentSlideIndex];
  }, [carouselItems, currentSlideIndex]);

  const handleNavigation = () => {
    nextSlide();
  };

  React.useEffect(() => {
    const interval = setInterval(handleNavigation, 5000);
    return () => clearInterval(interval);
  }, [currentSlideIndex]); // Added currentSlideIndex as a dependency

  if (!currentSlide) return <></>;

  return (
      <div
          style={{
            backgroundImage: `url(${currentSlide.imgPath})`,
          }}
          className={"bg-cover transition bg-center top-0 bottom-0 right-0 left-0 h-full block relative"}
      >
        <div className="text-white absolute bottom-0 h-full p-4 mb-6 top-0 left-0 bg-black bg-opacity-25 w-full flex flex-col justify-end">
          <div>
            <h1 className="font-bold text-2xl">{currentSlide.title}</h1>
            <p className="font-semibold text-lg">{currentSlide.description}</p>
            {carouselItems.map((item: ICarouselItem, index: number) => (
                <button
                    key={index}
                    type="button"
                    style={{ marginRight: '3px' }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentSlideIndex
                            ? 'bg-yellow-400 w-4 h-[6px]'
                            : 'w-[6px] h-[6px] rounded-full bg-white'
                    }`}
                ></button>
            ))}
          </div>
        </div>
      </div>
  );
};

