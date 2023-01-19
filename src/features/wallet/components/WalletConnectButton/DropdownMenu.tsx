import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { ExitIcon, CopyIcon } from '@radix-ui/react-icons';
import cx from 'classnames';
import React, { ReactNode, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface Props {
  children: ReactNode;
  onDisconnectWalletClick: () => void;
  onCopyAddressClick: () => void;
}

const Content = motion(DropdownMenuPrimitive.Content);

const DropdownMenu = ({
  children,
  onDisconnectWalletClick,
  onCopyAddressClick,
}: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <DropdownMenuPrimitive.Root onOpenChange={setOpen}>
        <DropdownMenuPrimitive.Trigger asChild>
          <div>{children}</div>
        </DropdownMenuPrimitive.Trigger>

        <AnimatePresence mode="wait">
          {open && (
            <Content
              forceMount
              align="end"
              sideOffset={5}
              className={cx(
                'w-36 rounded-lg px-1.5 py-1 shadow-md',
                'bg-[#262626]',
              )}
              initial={{ opacity: 0, translateY: 10, scale: 0.9 }}
              animate={{ opacity: 1, translateY: 0, scale: 1 }}
              exit={{
                opacity: 0,
                translateY: 10,
                scale: 0.9,
                transition: { duration: 0.2 },
              }}
              transition={{
                type: 'spring',
              }}
            >
              <DropdownMenuPrimitive.Item
                key="Copy Address"
                className={cx(
                  'flex cursor-default select-none items-center rounded-md px-2 py-2 text-xs outline-none',
                  'text-gray-400 focus:bg-[#262626]',
                )}
                onSelect={onCopyAddressClick}
              >
                <CopyIcon className="mr-2 h-3.5 w-3.5" />

                <span className="flex-grow text-white">Copy Address</span>
              </DropdownMenuPrimitive.Item>

              <DropdownMenuPrimitive.Item
                key="Disconnect"
                className={cx(
                  'flex cursor-default select-none items-center rounded-md px-2 py-2 text-xs outline-none',
                  'text-gray-400 focus:bg-[#262626]',
                )}
                onSelect={onDisconnectWalletClick}
              >
                <ExitIcon className="mr-2 h-3.5 w-3.5" />

                <span className="flex-grow text-white">Disconnect</span>
              </DropdownMenuPrimitive.Item>
            </Content>
          )}
        </AnimatePresence>
      </DropdownMenuPrimitive.Root>
    </div>
  );
};

export default DropdownMenu;
