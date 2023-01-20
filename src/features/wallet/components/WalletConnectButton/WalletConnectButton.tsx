import React, { useMemo } from 'react';

import DropdownMenu from '@/features/wallet/components/WalletConnectButton/DropdownMenu';
import WalletConnectModal from '@/features/wallet/components/WalletConnectButton/WalletConnectModal';

type Props = {
  address?: string;
  isLoading: boolean;
  isConnected: boolean;
  onDisconnectWalletClick: () => void;
  onCopyAddressClick: () => void;
};

function WalletConnectButton({
  address,
  isConnected,
  isLoading,
  onDisconnectWalletClick,
  onCopyAddressClick,
}: Props) {
  const formatAddress = (address?: string) => {
    if (!address) {
      return 'Invalid Address';
    }

    return address.slice(0, 6) + '...' + address.slice(-4);
  };

  const buttonText = useMemo(() => {
    if (isLoading) {
      return 'Loading';
    }

    if (address || isConnected) {
      return formatAddress(address);
    }

    return 'Connect Wallet';
  }, [address, isConnected, isLoading]);

  const renderButton = useMemo(() => {
    return (
      <button className="h-fit bg-[#262626] text-white font-medium py-2 px-4 rounded-full outline-none select-none">
        {buttonText}
      </button>
    );
  }, [buttonText]);

  return (
    <>
      {address || isConnected ? (
        <DropdownMenu
          onDisconnectWalletClick={onDisconnectWalletClick}
          onCopyAddressClick={onCopyAddressClick}
        >
          {renderButton}
        </DropdownMenu>
      ) : (
        <WalletConnectModal>{renderButton}</WalletConnectModal>
      )}
    </>
  );
}

export default WalletConnectButton;
