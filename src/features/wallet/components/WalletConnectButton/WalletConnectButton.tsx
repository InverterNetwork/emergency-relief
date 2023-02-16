import React from 'react';
import { useRecoilState } from 'recoil';

import DropdownMenu from '@/features/wallet/components/WalletConnectButton/DropdownMenu';
import { showWalletConnectModalAtom } from '@/features/wallet/components/WalletConnectButton/store/modals.store';

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
  onDisconnectWalletClick,
  onCopyAddressClick,
}: Props) {
  const [, setShowWalletConnectModal] = useRecoilState(
    showWalletConnectModalAtom,
  );

  const formatAddress = (address?: string) => {
    if (!address) {
      return 'Invalid Address';
    }

    return address.slice(0, 6) + '...' + address.slice(-4);
  };

  return (
    <>
      {address || isConnected ? (
        <DropdownMenu
          onDisconnectWalletClick={onDisconnectWalletClick}
          onCopyAddressClick={onCopyAddressClick}
        >
          <button className="h-fit bg-[#262626] text-white font-medium py-2 px-4 rounded-full outline-none select-none">
            {formatAddress(address)}
          </button>
        </DropdownMenu>
      ) : (
        <button
          className="h-fit bg-[#262626] text-white font-medium py-2 px-4 rounded-full outline-none select-none"
          onClick={() => setShowWalletConnectModal(true)}
        >
          Connect Wallet
        </button>
      )}
    </>
  );
}

export default WalletConnectButton;
