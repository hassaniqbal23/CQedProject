//Helper functions

export const truncateText = (desc: string | any, wordsLimit: number) => {
  const words = desc?.split(' ');
  if (words?.length <= wordsLimit) {
    return desc;
  }
  return words?.slice(0, wordsLimit).join(' ') + '...';
};
