import React from 'react';
import { useRecoilState } from 'recoil';

import DropdownMenu from '@/features/wallet/components/WalletConnectButton/DropdownMenu';
import { showWalletConnectModalAtom } from '@/features/wallet/components/WalletConnectButton/store/modals.store';
import Button from '@/components/Button/Button';
import { ChevronDownIcon } from '@radix-ui/react-icons';

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
          <Button
            rightNode={<ChevronDownIcon className="h-5 w-5" color="white" />}
          >
            {formatAddress(address)}
          </Button>
        </DropdownMenu>
      ) : (
        <Button onClick={() => setShowWalletConnectModal(true)}>
          Connect Wallet
        </Button>
      )}
    </>
  );
}

export default WalletConnectButton;
