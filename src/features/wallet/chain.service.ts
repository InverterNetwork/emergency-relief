import _ from 'lodash';
import { erc20ABI } from 'wagmi';

type NetworkName =
  | 'homestead'
  | 'bsc'
  | 'avalanche'
  | 'goerli'
  | 'optimism'
  | 'matic'
  | string;

type Token = {
  name: string;
  symbol: string;
  address: string;
  abi: typeof erc20ABI;
  decimals: number;
  coinGeckoId: string | null;
};

type Network = {
  symbol: string;
  name: string;
  chain: NetworkName;
  coinGeckoId: string | null;
  id: number;
  blockExplorers: {
    default: string;
    [key: string]: string;
  };
  tokens: Token[];
};

const goerliTokens: Token[] = [
  {
    name: 'DERC',
    symbol: 'DERC',
    address: '0x655F2166b0709cd575202630952D71E2bB0d61Af',
    abi: erc20ABI,
    decimals: 18,
    coinGeckoId: null,
  },
  {
    name: 'USDC',
    symbol: 'USDC',
    address: '0x07865c6E87B9F70255377e024ace6630C1Eaa37F',
    abi: erc20ABI,
    decimals: 6,
    coinGeckoId: null,
  },
];

const homesteadTokens: Token[] = [
  {
    name: 'USDT',
    symbol: 'USDT',
    address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    abi: erc20ABI,
    decimals: 6,
    coinGeckoId: 'tether',
  },
  {
    name: 'USDC',
    symbol: 'USDC',
    address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    abi: erc20ABI,
    decimals: 6,
    coinGeckoId: 'usd-coin',
  },
  {
    name: 'DAI',
    symbol: 'DAI',
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    abi: erc20ABI,
    decimals: 18,
    coinGeckoId: 'dai',
  },
  {
    name: 'WETH',
    symbol: 'WETH',
    address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    abi: erc20ABI,
    decimals: 18,
    coinGeckoId: 'weth',
  },
  {
    name: 'BUSD',
    symbol: 'BUSD',
    address: '0x4fabb145d64652a948d72533023f6e7a623c7c53',
    abi: erc20ABI,
    decimals: 18,
    coinGeckoId: 'binance-busd',
  },
  {
    name: 'MATIC',
    symbol: 'MATIC',
    address: '0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0',
    abi: erc20ABI,
    decimals: 18,
    coinGeckoId: 'matic-network',
  },
];

const bscTokens: Token[] = [
  {
    name: 'USDT',
    symbol: 'USDT',
    address: '0x55d398326f99059ff775485246999027b3197955',
    abi: erc20ABI,
    decimals: 18,
    coinGeckoId: 'tether',
  },
  {
    name: 'USDC',
    symbol: 'USDC',
    address: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
    abi: erc20ABI,
    decimals: 18,
    coinGeckoId: 'usd-coin',
  },
  {
    name: 'BUSD',
    symbol: 'BUSD',
    address: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
    abi: erc20ABI,
    decimals: 18,
    coinGeckoId: 'binance-usd',
  },
  {
    name: 'DAI',
    symbol: 'DAI',
    address: '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3',
    abi: erc20ABI,
    decimals: 18,
    coinGeckoId: 'dai',
  },
  {
    name: 'MATIC',
    symbol: 'MATIC',
    address: '0xcc42724c6683b7e57334c4e856f4c9965ed682bd',
    abi: erc20ABI,
    decimals: 18,
    coinGeckoId: 'matic-network',
  },
];

const avalancheTokens: Token[] = [
  {
    name: 'USDT',
    symbol: 'USDT',
    address: '0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7',
    abi: erc20ABI,
    decimals: 6,
    coinGeckoId: 'tether',
  },
  {
    name: 'USDC',
    symbol: 'USDC',
    address: '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E',
    abi: erc20ABI,
    decimals: 6,
    coinGeckoId: 'usd-coin',
  },
  {
    name: 'DAI',
    symbol: 'DAI',
    address: '0xd586E7F844cEa2F87f50152665BCbc2C279D8d70',
    abi: erc20ABI,
    decimals: 18,
    coinGeckoId: 'dai',
  },
];

const maticTokens: Token[] = [
  {
    name: 'WETH',
    symbol: 'WETH',
    address: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
    abi: erc20ABI,
    decimals: 18,
    coinGeckoId: 'weth',
  },
  {
    name: 'USDT',
    symbol: 'USDT',
    address: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
    abi: erc20ABI,
    decimals: 6,
    coinGeckoId: 'tether',
  },
  {
    name: 'USDC',
    symbol: 'USDC',
    address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
    abi: erc20ABI,
    decimals: 6,
    coinGeckoId: 'usd-coin',
  },
  {
    name: 'DAI',
    symbol: 'DAI',
    address: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
    abi: erc20ABI,
    decimals: 18,
    coinGeckoId: 'dai',
  },
];

const optimismTokens: Token[] = [
  {
    name: 'USDT',
    symbol: 'USDT',
    address: '0x94b008aa00579c1307b0ef2c499ad98a8ce58e58',
    abi: erc20ABI,
    decimals: 6,
    coinGeckoId: 'tether',
  },
  {
    name: 'USDC',
    symbol: 'USDC',
    address: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
    abi: erc20ABI,
    decimals: 6,
    coinGeckoId: 'usd-coin',
  },
  {
    name: 'DAI',
    symbol: 'DAI',
    address: '0xda10009cbd5d07dd0cecc66161fc93d7c9000da1',
    abi: erc20ABI,
    decimals: 18,
    coinGeckoId: 'dai',
  },
  {
    name: 'WBTC',
    symbol: 'WBTC',
    address: '0x68f180fcCe6836688e9084f035309E29Bf0A2095',
    abi: erc20ABI,
    decimals: 8,
    coinGeckoId: 'wrapped-bitcoin',
  },
  {
    name: 'LINK',
    symbol: 'LINK',
    address: '0x350a791Bfc2C21F9Ed5d10980Dad2e2638ffa7f6',
    abi: erc20ABI,
    decimals: 18,
    coinGeckoId: 'chainlink',
  },
];

export const getTokensByChain = (networkName: NetworkName) => {
  switch (networkName?.toLowerCase()) {
    case 'homestead':
      return homesteadTokens;

    case 'goerli':
      return goerliTokens;

    case 'bsc':
      return bscTokens;

    case 'avalanche':
      return avalancheTokens;

    case 'matic':
      return maticTokens;

    case 'optimism':
      return optimismTokens;

    default:
      break;
  }
};

export const getNetworkByName = (networkName?: NetworkName) => {
  switch (networkName?.toLowerCase()) {
    case 'homestead':
      return networks.homestead;

    case 'bsc':
      return networks.bsc;

    case 'avalanche':
      return networks.avalanche;

    case 'goerli':
      return networks.goerli;

    case 'optimism':
      return networks.optimism;

    case 'matic':
      return networks.matic;

    default:
      break;
  }
};

const networks: Record<NetworkName, Network> = {
  homestead: {
    symbol: 'ETH',
    name: 'Ethereum',
    chain: 'ethereum',
    coinGeckoId: 'ethereum',
    id: 1,
    blockExplorers: {
      default: 'https://etherscan.io',
    },
    tokens: getTokensByChain('homestead') as Token[],
  },
  bsc: {
    symbol: 'BNB',
    name: 'BNB Smart Chain',
    chain: 'binance smart chain',
    coinGeckoId: 'binancecoin',
    id: 56,
    blockExplorers: {
      default: 'https://bscscan.com',
    },
    tokens: getTokensByChain('bsc') as Token[],
  },
  avalanche: {
    symbol: 'AVAX',
    name: 'Avalanche',
    chain: 'avalanche',
    coinGeckoId: 'avalanche-2',
    id: 43114,
    blockExplorers: {
      default: 'https://snowtrace.io',
      xChain: 'https://explorer-xp.avax.network',
    },
    tokens: getTokensByChain('avalanche') as Token[],
  },
  goerli: {
    symbol: 'ETH',
    name: 'Goerli',
    chain: 'goerli',
    coinGeckoId: null,
    id: 5,
    blockExplorers: {
      default: 'https://goerli.etherscan.io',
    },
    tokens: getTokensByChain('goerli') as Token[],
  },
  optimism: {
    symbol: 'ETH',
    name: 'Optimism',
    chain: 'optimism',
    coinGeckoId: 'optimism',
    id: 10,
    blockExplorers: {
      default: 'https://optimistic.etherscan.io',
    },
    tokens: getTokensByChain('optimism') as Token[],
  },
  matic: {
    symbol: 'MATIC',
    name: 'Polygon',
    chain: 'matic',
    coinGeckoId: 'matic-network',
    id: 137,
    blockExplorers: {
      default: 'https://polygonscan.com',
    },
    tokens: getTokensByChain('matic') as Token[],
  },
};

export const getAllCoinGeckoIds = () => {
  const ids: string[] = [];

  Object.values(networks).forEach((network) => {
    if (network.coinGeckoId) {
      ids.push(network.coinGeckoId);
    }

    network.tokens.forEach((token) => {
      if (token.coinGeckoId) {
        ids.push(token.coinGeckoId);
      }
    });
  });

  _(ids).uniq().filter(Boolean).value();

  return ids;
};

export const identityNetworkName = (
  networkName: NetworkName,
): string | undefined => {
  switch (networkName.toLowerCase()) {
    case 'binance smart chain':
      return 'bsc';

    case 'ethereum':
      return 'homestead';

    case 'polygon':
      return 'matic';

    default:
      return networkName;
  }
};

export const isNetworkSupported = (networkName: NetworkName) => {
  const isSupported = !!getNetworkByName(networkName);

  return isSupported;
};
