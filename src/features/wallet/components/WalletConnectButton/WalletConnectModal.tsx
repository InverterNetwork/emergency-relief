import React, { Fragment } from 'react';
import { Transition } from '@headlessui/react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Cross1Icon } from '@radix-ui/react-icons';
import { Connector } from '@wagmi/core';
import { clsx } from 'clsx';
import { toast } from 'react-hot-toast';
import { useConnect } from 'wagmi';
import { useRecoilState } from 'recoil';

import { showWalletConnectModalAtom } from '@/features/wallet/components/WalletConnectButton/store/modals.store';

const WalletConnectModal = () => {
  const [showWalletConnectModal, setShowWalletConnectModal] = useRecoilState(
    showWalletConnectModalAtom,
  );

  const { connectors, connectAsync } = useConnect();

  const handleConnectorClick = async (connector: Connector) => {
    await toast.promise(
      connectAsync({
        connector: connector,
      }),
      {
        loading: 'Connecting...',
        success: 'Connected!',
        error: 'Could not connect.',
      },
    );
  };

  return (
    <DialogPrimitive.Root
      open={showWalletConnectModal}
      onOpenChange={setShowWalletConnectModal}
    >
      <DialogPrimitive.Portal forceMount>
        <Transition.Root show={showWalletConnectModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <DialogPrimitive.Overlay
              forceMount
              className="fixed inset-0 z-20 bg-black/50"
            />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPrimitive.Content
              forceMount
              className={clsx(
                'fixed z-50',
                'w-[95vw] max-w-md rounded-lg p-4 md:w-full',
                'top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]',
                'bg-gray-100',
                'focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75',
              )}
            >
              <DialogPrimitive.Title className="font-bold text-md text-gray-900">
                Connect a wallet
              </DialogPrimitive.Title>
              <DialogPrimitive.Description className="mt-2 text-md text-gray-600">
                Select a wallet to connect to your account.
              </DialogPrimitive.Description>

              <div className="mt-6 space-y-2">
                {connectors.map((connector) => (
                  <DialogPrimitive.Close
                    key={connector.name}
                    onClick={() => handleConnectorClick(connector)}
                    className={clsx(
                      'bg-primary rounded-lg gap-2 items-center justify-center leading-0 font-semibold w-full text-gray-50 text-sm py-3 px-4',
                    )}
                  >
                    {connector.name}
                  </DialogPrimitive.Close>
                ))}
              </div>

              <DialogPrimitive.Close
                className={clsx(
                  'absolute top-3.5 right-3.5 inline-flex items-center justify-center rounded-full p-1',
                  'focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75',
                )}
              >
                <Cross1Icon className="h-4 w-4 text-gray-500 hover:text-gray-700" />
              </DialogPrimitive.Close>
            </DialogPrimitive.Content>
          </Transition.Child>
        </Transition.Root>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default WalletConnectModal;
