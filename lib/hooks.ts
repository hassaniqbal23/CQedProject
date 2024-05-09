import { useMediaQuery } from 'react-responsive';

export const useResponsive: () => {
  isDesktopOrLaptop: boolean;
  isBigScreen: boolean;
  isTabletOrMobile: boolean;
  isTabletMini: boolean;
  isMobile: boolean;
  isPortrait: boolean;
  isRetina: boolean;
} = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)',
  });
  const isBigScreen = useMediaQuery({
    query: '(min-width: 1824px)',
  });
  const isTabletOrMobile = useMediaQuery({
    query: '(max-width: 1224px)',
  });
  const isTabletMini = useMediaQuery({
    query: '(max-width: 1024px)',
  });
  const isMobile = useMediaQuery({
    query: '(max-width: 767px)',
  });
  const isPortrait = useMediaQuery({
    query: '(orientation: portrait)',
  });
  const isRetina = useMediaQuery({
    query: '(min-resolution: 2dppx)',
  });

  return {
    isDesktopOrLaptop,
    isBigScreen,
    isTabletOrMobile,
    isTabletMini,
    isMobile,
    isPortrait,
    isRetina,
  };
};
