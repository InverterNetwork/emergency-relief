import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import { WagmiConfig, createClient, configureChains } from 'wagmi';
import {
  mainnet,
  goerli,
  bsc,
  avalanche,
  polygon,
  optimism,
} from 'wagmi/chains';

import { publicProvider } from 'wagmi/providers/public';

import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { RecoilRoot } from 'recoil';
import WalletConnectModal from '@/features/wallet/components/WalletConnectButton/WalletConnectModal';

const { chains, provider, webSocketProvider } = configureChains(
  [goerli, mainnet, bsc, avalanche, polygon, optimism],
  [publicProvider()],
);

const client = createClient({
  autoConnect: true,
  connectors: [
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'Inverter',
      },
    }),
  ],
  provider,
  webSocketProvider,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <WagmiConfig client={client}>
        <Component {...pageProps} />
        <Toaster />
        <WalletConnectModal />
      </WagmiConfig>
    </RecoilRoot>
  );
}
