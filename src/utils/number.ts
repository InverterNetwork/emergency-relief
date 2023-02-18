import numeral from 'numeral';

export const formatNumber = (num: number | string, format = '0,0.[00000]') => {
  return numeral(num).format(format);
};
