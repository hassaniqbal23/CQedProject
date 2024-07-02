//Helper functions
import countriesData from '@/public/countries/countries.json';
import { IPenpal } from '../globalContext/types';
import { IComment, ICommunityPost } from '@/types/global';

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


export const extractUserInfo = (feeds: ICommunityPost, penpals: IPenpal[]) => {
  const result = [];
  
  if (feeds.User) {
    result.push({
      id: feeds.User.id,
      display: feeds.User.name,
      image: feeds.User.attachment ? feeds.User.attachment.file_path : ''
    });
  }

  if (feeds.comments && Array.isArray(feeds.comments)) {
    feeds.comments.forEach((comment: IComment) => {
      if (comment.User) {
        result.push({
          id: comment.User.id,
          display: comment.User.name,
          image: comment.User.attachment ? comment.User.attachment.file_path : ''
        });
      }
    });
  }

  if(penpals && penpals.length > 0) {
    penpals.forEach((penpal: IPenpal) => {
      if (penpal.friend) {
        result.push({
          id: penpal.friend.id,
          display: penpal.friend.profile?.full_name,
          image: penpal.friend.attachment ? penpal.friend.attachment.file_path : ''
        });
      }
    });
  }

  const uniqueResult = Array.from(new Map(result.map(user => [user.id, user])).values());


  return uniqueResult;
};

export const formatMentions = (text: string) => {
  const mentionRegex = /@\[([^\]]+)\]\((\d+)\)/g;
  const formattedText = text.replace(mentionRegex, (_, display, id) => `<b>@${display}</b>`);
  return formattedText;
};