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
    <header className="container py-4 flex-col md:flex-row gap-y-8 flex justify-between items-center mx-auto">
      <Link href={'/'}>
        <div className="font-black text-gray-900 text-lg uppercase">
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
    </header>
  );
};

export default Header;
