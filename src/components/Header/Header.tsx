import Button from '@/components/Button/Button';
import WalletConnectButton from '@/features/wallet/components/WalletConnectButton/WalletConnectButton';
import useIsMounted from '@/hooks/useIsMounted.hook';
import { deleteCookie, setCookie } from 'cookies-next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

type Props = {
  cachedAddress?: string;
};

const Header = ({ cachedAddress }: Props) => {
  const route = useRouter();
  const { address, isConnected } = useAccount();
  const isMounted = useIsMounted();

  const { isLoading, data } = useConnect();
  const { disconnectAsync, isSuccess: isDisconnected } = useDisconnect();

  useEffect(() => {
    if (!data) {
      deleteCookie('address');
      return;
    }

    setCookie('address', data.account);
  }, [data]);

  const handleDisconnectWalletClick = async () => {
    await toast.promise(disconnectAsync(), {
      loading: 'Disconnecting...',
      success: 'Disconnected!',
      error: 'Could not disconnect.',
    });
  };

  const handleCopyAddressClick = () => {
    if (!address) {
      return;
    }

    navigator.clipboard.writeText(address);

    toast.success('Copied address to clipboard!');
  };

  const checkRoute = (path: string) => {
    return route.pathname === path;
  };

  return (
    <header className="absolute left-0 right-0 top-0 z-10 bg-gray-100 py-4 gap-y-8">
      <div className="mx-auto container flex items-center justify-between">
        <Link href={'/'}>
          <div className="font-black text-gray-900 text-sm md:text-lg uppercase">
            Emergency<span className="text-primary">Relief</span>
          </div>
        </Link>

        {isMounted && (
          <WalletConnectButton
            address={isDisconnected ? address : address || cachedAddress}
            isConnected={isConnected}
            isLoading={isLoading}
            onDisconnectWalletClick={handleDisconnectWalletClick}
            onCopyAddressClick={handleCopyAddressClick}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
