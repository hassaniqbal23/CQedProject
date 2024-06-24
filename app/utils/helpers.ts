//Helper functions
import countriesData from '@/public/countries/countries.json';

export const truncateText = (desc: string | any, wordsLimit: number) => {
  const words = desc?.split(' ');
  if (words?.length <= wordsLimit) {
    return desc;
  }
  return words?.slice(0, wordsLimit).join(' ') + '...';
};

// To get Country flag and name use this helping method
interface Countries {
  [key: string]: string;
}

interface CountryInfo {
  flag?: string;
  country?: string;
}
const countries: Countries = countriesData;

export const getCountry = (countryCode: string): CountryInfo => {
  const ccLower = countryCode?.toLowerCase();
  const ccUpper = countryCode?.toUpperCase();
  const flag = `/country-flags/svg/${ccLower}.svg`;
  const country = countries[ccUpper] || 'Unknown Country';

  return { flag, country };
};

export const getMutualFriendsText = (mutualFriends: number) => {
  if (mutualFriends > 1) {
    return `${mutualFriends} mutual friends`;
  } else if (mutualFriends === 1) {
    return `${mutualFriends} mutual friend`;
  }
  return '';
};
export function getFcmTokenFromLocalStorage(
  firebaseToken: string
): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(firebaseToken);
  }
  return null;
}
