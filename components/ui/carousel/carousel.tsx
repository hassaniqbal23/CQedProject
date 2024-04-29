import React from "react"
interface  ICarouselItem {
  title: string
  description: string
  imgPath: string
}

interface CarouselProps {
  carouselItems: ICarouselItem[];
}

export const LoginCarousel = (pros: CarouselProps) => {


    const currentSlideIndex = React.useRef(0);

    const nextSlide = () => {
        currentSlideIndex.current = currentSlideIndex.current + 1;
    }

    const prevSlide = () => {
        currentSlideIndex.current = currentSlideIndex.current - 1;
    }

    const currentSlide = React.useMemo(  () => {
        return pros.carouselItems[currentSlideIndex.current]
    } , [currentSlideIndex])

    return (
            <div style={{
                backgroundImage: `url(${currentSlide.imgPath})`
            }} className={"h-screen w-fit block"}  >
                asd
            </div>
    );
}
