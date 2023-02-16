import { erc20ABI } from 'wagmi';

type NetworkName =
  | 'homestead'
  | 'bsc'
  | 'avalanche'
  | 'goerli'
  | 'optimism'
  | 'matic'
  | string;

const goerliTokens = [
  {
    name: 'DERC',
    symbol: 'DERC',
    address: '0x655F2166b0709cd575202630952D71E2bB0d61Af',
    abi: erc20ABI,
  },
];

const homesteadTokens = [
  {
    name: 'USDT',
    symbol: 'USDT',
    address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    abi: erc20ABI,
  },
  {
    name: 'USDC',
    symbol: 'USDC',
    address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    abi: erc20ABI,
  },
  {
    name: 'DAI',
    symbol: 'DAI',
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    abi: erc20ABI,
  },
  {
    name: 'WETH',
    symbol: 'WETH',
    address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    abi: erc20ABI,
  },
  {
    name: 'BUSD',
    symbol: 'BUSD',
    address: '0x4fabb145d64652a948d72533023f6e7a623c7c53',
  },
  {
    name: 'MATIC',
    symbol: 'MATIC',
    address: '0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0',
  },
];

const bscTokens = [
  {
    name: 'USDT',
    symbol: 'USDT',
    address: '0x55d398326f99059ff775485246999027b3197955',
    abi: erc20ABI,
  },
  {
    name: 'USDC',
    symbol: 'USDC',
    address: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
    abi: erc20ABI,
  },
  {
    name: 'DAI',
    symbol: 'DAI',
    address: '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3',
    abi: erc20ABI,
  },
  {
    name: 'MATIC',
    symbol: 'MATIC',
    address: '0xcc42724c6683b7e57334c4e856f4c9965ed682bd',
    abi: erc20ABI,
  },
];

const avalancheTokens = [
  {
    name: 'USDT.e',
    symbol: 'USDT.e',
    address: '0xc7198437980c041c805A1EDcbA50c1Ce5db95118',
    abi: erc20ABI,
  },
  {
    name: 'USDt',
    symbol: 'USDt',
    address: '0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7',
    abi: erc20ABI,
  },
  {
    name: 'USDC.e',
    symbol: 'USDC.e',
    address: '0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664',
    abi: erc20ABI,
  },
  {
    name: 'USDC',
    symbol: 'USDC',
    address: '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E',
    abi: erc20ABI,
  },
  {
    name: 'DAI',
    symbol: 'DAI',
    address: '0xbA7dEebBFC5fA1100Fb055a87773e1E99Cd3507a',
    abi: erc20ABI,
  },
];

const maticTokens = [
  {
    name: 'WETH',
    symbol: 'WETH',
    address: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
  },
  {
    name: 'USDT',
    symbol: 'USDT',
    address: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
    abi: erc20ABI,
  },
  {
    name: 'BNB',
    symbol: 'BNB',
    address: '0x3BA4c387f786bFEE076A58914F5Bd38d668B42c3',
  },
  {
    name: 'USDC',
    symbol: 'USDC',
    address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
    abi: erc20ABI,
  },
  {
    name: 'DAI',
    symbol: 'DAI',
    address: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
    abi: erc20ABI,
  },
];

const optimismTokens = [
  {
    name: 'USDT',
    symbol: 'USDT',
    address: '0x94b008aa00579c1307b0ef2c499ad98a8ce58e58',
    abi: erc20ABI,
  },
  {
    name: 'USDC',
    symbol: 'USDC',
    address: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
    abi: erc20ABI,
  },
  {
    name: 'DAI',
    symbol: 'DAI',
    address: '0xda10009cbd5d07dd0cecc66161fc93d7c9000da1',
    abi: erc20ABI,
  },
  {
    name: 'WBTC',
    symbol: 'WBTC',
    address: '0x68f180fcCe6836688e9084f035309E29Bf0A2095',
    abi: erc20ABI,
  },
  {
    name: 'LINK',
    symbol: 'LINK',
    address: '0x350a791Bfc2C21F9Ed5d10980Dad2e2638ffa7f6',
    abi: erc20ABI,
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

const networks = {
  homestead: {
    symbol: 'ETH',
    name: 'Ethereum',
    chain: 'ethereum',
    address: '0xe1935271D1993434A1a59fE08f24891Dc5F398Cd',
    id: 1,
    tokens: getTokensByChain('homestead'),
  },
  bsc: {
    symbol: 'BNB',
    name: 'Binance Coin',
    chain: 'binance smart chain',
    address: '0xB67705398fEd380a1CE02e77095fed64f8aCe463',
    id: 56,
    tokens: getTokensByChain('bsc'),
  },
  avalanche: {
    symbol: 'AVAX',
    name: 'Avalanche',
    chain: 'avalanche',
    address: '0x868D27c361682462536DfE361f2e20B3A6f4dDD8',
    id: 43114,
    tokens: getTokensByChain('avalanche'),
  },
  goerli: {
    symbol: 'ETH',
    name: 'Goerli',
    chain: 'goerli',
    address: '0x4BF07c675dB5a562816848e3a5bFA993510450D2',
    id: 5,
    tokens: getTokensByChain('goerli'),
  },
  optimism: {
    symbol: 'ETH',
    name: 'Optimism',
    chain: 'optimism',
    address: '0x4BF07c675dB5a562816848e3a5bFA993510450D2',
    id: 10,
    tokens: getTokensByChain('optimism'),
  },
  matic: {
    symbol: 'MATIC',
    name: 'Polygon',
    chain: 'matic',
    address: '0x4BF07c675dB5a562816848e3a5bFA993510450D2',
    id: 137,
    tokens: getTokensByChain('matic'),
  },
};

export const identityNetworkName = (
  networkName: NetworkName,
): string | undefined => {
  switch (networkName.toLowerCase()) {
    case 'binance smart chain':
      return 'bsc';

    case 'ethereum':
      return 'homestead';

    default:
      return networkName;
  }
};

export const isNetworkSupported = (networkName: NetworkName) => {
  const isSupported = !!getNetworkByName(networkName);

  return isSupported;
};
