import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { ExitIcon, CopyIcon } from '@radix-ui/react-icons';
import cx from 'classnames';
import React, { ReactNode, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { IoIosExit, IoIosCopy } from 'react-icons/io';

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

        <AnimatePresence>
          {open && (
            <Content
              forceMount
              align="end"
              sideOffset={5}
              className={cx(
                'w-36 rounded-lg px-2 py-2 shadow-md z-10',
                'bg-gray-200',
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
                  'flex select-none items-center rounded-md px-3 py-3 text-xs outline-none',
                  'text-gray-900 focus:bg-gray-300 cursor-pointer',
                )}
                onSelect={onCopyAddressClick}
              >
                <IoIosCopy className="mr-2 h-4 w-4" />

                <span className="flex-grow ">Copy Address</span>
              </DropdownMenuPrimitive.Item>

              <DropdownMenuPrimitive.Item
                key="Disconnect"
                className={cx(
                  'flex select-none items-center rounded-md px-3 py-3 text-xs outline-none',
                  'text-gray-900 focus:bg-gray-300 cursor-pointer',
                )}
                onSelect={onDisconnectWalletClick}
              >
                <IoIosExit className="mr-2 h-4 w-4" />

                <span className="flex-grow">Disconnect</span>
              </DropdownMenuPrimitive.Item>
            </Content>
          )}
        </AnimatePresence>
      </DropdownMenuPrimitive.Root>
    </div>
  );
};

export default DropdownMenu;
