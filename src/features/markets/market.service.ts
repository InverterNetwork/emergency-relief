import { Market } from '@/features/markets/entity/market.entity';
import { getAllCoinGeckoIds } from '@/features/wallet/chain.service';
import axios from 'axios';

export const getPriceOfTokens = async () => {
  const ids = getAllCoinGeckoIds();

  console.log(ids);

  const { data } = await axios.get<Market[]>(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&per_page=100&page=1&sparkline=false`,
  );

  return data;
};
