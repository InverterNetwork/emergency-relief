import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { ExitIcon } from '@radix-ui/react-icons';
import cx from 'classnames';
import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  onDisconnectWalletClick: () => void;
}

const DropdownMenu = ({ children, onDisconnectWalletClick }: Props) => {
  return (
    <div className="relative inline-block text-left">
      <DropdownMenuPrimitive.Root>
        <DropdownMenuPrimitive.Trigger asChild>
          {children}
        </DropdownMenuPrimitive.Trigger>

        <DropdownMenuPrimitive.Portal>
          <DropdownMenuPrimitive.Content
            align="end"
            sideOffset={5}
            className={cx(
              'radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down',
              'w-36 rounded-lg px-1.5 py-1 shadow-md',
              'bg-[#262626]',
            )}
          >
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
          </DropdownMenuPrimitive.Content>
        </DropdownMenuPrimitive.Portal>
      </DropdownMenuPrimitive.Root>
    </div>
  );
};

export default DropdownMenu;
