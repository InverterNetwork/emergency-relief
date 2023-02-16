import Head from 'next/head';
import { getCookie } from 'cookies-next';
import { GetServerSideProps } from 'next';
import * as SelectPrimitive from '@radix-ui/react-select';

import Header from '@/components/Header/Header';
import Button from '@/components/Button/Button';
import Image from 'next/image';
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ArrowDownIcon,
} from '@radix-ui/react-icons';
import Web from '@/components/Icons/Web';
import Discord from '@/components/Icons/Discord';
import Twitter from '@/components/Icons/Twitter';
import cx from 'classnames';
import {
  useAccount,
  useBalance,
  useContract,
  useDisconnect,
  useNetwork,
  usePrepareSendTransaction,
  useSendTransaction,
  useSigner,
  useSwitchNetwork,
  useWaitForTransaction,
} from 'wagmi';
import { waitForTransaction } from 'wagmi/actions';
import { useRecoilState } from 'recoil';

import { showWalletConnectModalAtom } from '@/features/wallet/components/WalletConnectButton/store/modals.store';
import { useEffect, useMemo, useState } from 'react';
import { parseEther } from 'ethers/lib/utils.js';
import { toast } from 'react-hot-toast';
import { isNumberString } from 'class-validator';
import { getProjectById } from '@/features/projects/project.service';
import { Project } from '@/features/projects/entity/project.entity';
import _ from 'lodash';
import {
  getNetworkByName,
  isNetworkSupported,
} from '@/features/wallet/chain.service';

export default function Home({
  address: cachedAddress,
  project,
}: {
  address: string | null;
  project: Project;
}) {
  const { address: clientSideAdress } = useAccount();
  const { data: signer } = useSigner();
  const { isSuccess: isDisconnected } = useDisconnect();
  const { chain } = useNetwork();

  const address = isDisconnected
    ? clientSideAdress
    : clientSideAdress || cachedAddress;

  const [showWalletConnectModal, setShowWalletConnectModal] = useRecoilState(
    showWalletConnectModalAtom,
  );
  const [lastTransactionHash, setLastTransactionHash] = useState('');

  const defaultChain = useMemo(() => {
    if (!chain) {
      return project.donation_addresses[0].chain;
    }

    if (isNetworkSupported(chain.network)) {
      return chain.network;
    }

    return 'Unsupported';
  }, [chain, project.donation_addresses]);

  const [selectedChainName, setSelectedChainName] = useState(defaultChain);

  const chains = useMemo(() => {
    const chains = project.donation_addresses.map((address) => ({
      value: address.chain!,
      label: getNetworkByName(address.chain!)?.name,
    }));

    if (chain) {
      chains.push({
        value: chain.network,
        label: chain.name,
      });
    }

    return _.uniqBy(chains, (chain) => chain.value);
  }, [chain, project.donation_addresses]);

  const selectedChain = getNetworkByName(selectedChainName);

  const defaultToken = chain && chain.nativeCurrency;

  const [selectedTokenSymbol, setSelectedTokenSymbol] = useState(
    defaultToken?.symbol,
  );

  const selectedToken = selectedChain?.tokens?.find(
    (token) => token.symbol === selectedTokenSymbol,
  );

  const tokens = useMemo(() => {
    const tokens = (selectedChain?.tokens || []).map((token) => {
      return {
        value: token.symbol,
        label: token.symbol,
      };
    });

    if (chain) {
      tokens.unshift({
        value: chain.nativeCurrency.symbol,
        label: chain.nativeCurrency.symbol,
      });
    }

    return tokens;
  }, [chain, selectedChain?.tokens]);

  const selectedChainDonationAddress = project.donation_addresses.find(
    (address) => address.chain === selectedChainName,
  )?.address;

  const { data: tokenBalance } = useBalance({
    address: address as `0x${string}`,
    token: selectedToken?.address as `0x${string}`,
  });

  const { data: nativeTokenBalanceData } = useBalance({
    address: address as `0x${string}`,
  });

  const { switchNetworkAsync } = useSwitchNetwork();

  const contract = useContract({
    ...selectedToken,
    signerOrProvider: signer,
  });

  const isNativeToken = selectedTokenSymbol === chain?.nativeCurrency.symbol;

  const balance = isNativeToken ? nativeTokenBalanceData : tokenBalance;

  const [amount, setAmount] = useState('');

  const { config } = usePrepareSendTransaction({
    request: {
      to: selectedChainDonationAddress || '',
      value: isNumberString(amount) ? parseEther(amount) : undefined,
    },
  });

  const { sendTransaction } = useSendTransaction({
    ...config,
    onSuccess: async (data) => {
      setLastTransactionHash(data.hash as `0x${string}`);

      await toast.promise(waitForTransaction(data), {
        loading: 'Waiting for transaction',
        error: 'Transaction failed!',
        success: 'Transaction successful!',
      });

      setLastTransactionHash('');
    },
  });

  const { isLoading: isTransactionLoading } = useWaitForTransaction({
    hash: (lastTransactionHash as `0x${string}`) || '',
  });

  const isSupportedChain = tokens.length > 0;

  useEffect(() => {
    console.log(chain);

    if (!chain) {
      return;
    }

    setSelectedChainName(chain.network);
    setSelectedTokenSymbol(chain.nativeCurrency.symbol);
  }, [chain]);

  const isInsufficientBalance = !balance
    ? false
    : Number(balance.formatted) < Number(amount);

  const isButtonDisabled = useMemo(() => {
    const sharedCondition =
      !isSupportedChain || !amount || isInsufficientBalance;

    if (isNativeToken) {
      return sharedCondition || isTransactionLoading || !sendTransaction;
    }

    return sharedCondition;
  }, [
    amount,
    isInsufficientBalance,
    isNativeToken,
    isSupportedChain,
    isTransactionLoading,
    sendTransaction,
  ]);

  const handleSwitchChain = async (network: string) => {
    if (!address) {
      setShowWalletConnectModal(true);
      return;
    }

    if (!switchNetworkAsync) {
      return;
    }

    const chain = getNetworkByName(network);

    await toast.promise(switchNetworkAsync(chain?.id), {
      loading: 'Switching network',
      error: 'Network switch failed!',
      success: 'Network switch successful!',
    });
  };

  const sendNativeToken = async () => {
    sendTransaction?.();
  };

  const sendToken = async () => {
    if (!contract) {
      return;
    }

    const tx = await contract.transfer(
      selectedChainDonationAddress as `0x${string}`,
      parseEther(amount),
    );

    setLastTransactionHash(tx.hash as `0x${string}`);

    console.log(tx);

    await toast.promise(
      waitForTransaction({
        hash: tx.hash as `0x${string}`,
      }),
      {
        loading: 'Sending token...',
        success: 'Token sent!',
        error: 'Error sending token',
      },
    );

    setLastTransactionHash('');
  };

  const handleDonatePress = async () => {
    if (isNativeToken) {
      return sendNativeToken();
    }

    return sendToken();
  };

  console.log({
    selectedChainName,
    selectedChain: selectedChain,
    selectedTokenSymbol,
    nativeTokenBalanceData,
    tokenBalance,
    tokens,
    selectedToken,
    selectedChainDonationAddress,
    chain,
    contract,
    isNativeToken,
    balance,
    isInsufficientBalance,
    amount: Number(amount),
    lastTransactionHash,
    project,
  });

  return (
    <>
      <Head>
        <title>Emergency Relief</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <div className="container mx-auto py-10">
        <Header cachedAddress={cachedAddress || undefined} />

        <div className="grid grid-cols-12 gap-8 mt-8">
          <main className="col-span-12 lg:col-span-9 space-y-5">
            <div className="bg-[#F1F1EF] p-2 pb-3 rounded-3xl">
              <div className="relative flex justify-center">
                <Image
                  className="rounded-3xl h-full"
                  src={{
                    src: '/turkey.png',
                    width: 1000,
                    height: 500,
                  }}
                  alt="Turkey earthquake"
                />

                <div className="absolute -bottom-20 h-40 w-40">
                  <div className="relative">
                    <CheckIcon
                      className="z-10 absolute bottom-0 right-0 bg-[#262626] rounded-full w-11 h-11 border-[5px] border-white"
                      color="white"
                    />

                    <Image
                      className="rounded-full h-40 w-40 border-[8px] border-white"
                      src={{
                        src: '/world.png',
                        width: 160,
                        height: 160,
                      }}
                      alt="Turkey earthquake"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-20 mt-3 flex flex-col items-center justify-center flex-1 space-y-3">
                <h1 className="text-4xl font-semibold">Earthquake</h1>

                <div className="flex space-x-3">
                  <div className="p-2 bg-[#E7E5E3] rounded-full">
                    <Web className="h-8 w-8" />
                  </div>

                  <div className="p-2 bg-[#E7E5E3] rounded-full">
                    <Discord className="h-8 w-8" />
                  </div>

                  <div className="p-2 bg-[#E7E5E3] rounded-full">
                    <Twitter className="h-8 w-8" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#F1F1EF] p-6 space-y-3 rounded-3xl">
              <h2 className="text-2xl font-semibold">About</h2>
              <span className="block">
                We are a small group of academics that would like to coordinate
                research on reward systems in web3. We would like to dedicate
                ourselves to finding.
              </span>

              <a className="block font-bold" href="#">
                See More
              </a>
            </div>

            <div className="bg-[#F1F1EF] p-6 space-y-3 rounded-3xl">
              <h2 className="text-2xl font-semibold">Credentials</h2>

              <div className="flex w-fit h-10 px-3 rounded-full items-center justify-center bg-[#E7E5E3] space-x-2">
                <CheckIcon
                  className="bg-black rounded-full w-7 h-7"
                  color="white"
                />
                <span className="block font-bold text-lg">
                  Verified by Paribu
                </span>
              </div>
            </div>

            <div
              className={cx('bg-[#F1F1EF] p-6 rounded-3xl', {
                'group insufficient-balance': isInsufficientBalance,
              })}
            >
              <div className="flex justify-between">
                <h2 className="text-4xl font-semibold">
                  Donate in {chain?.nativeCurrency.symbol || 'ETH'}
                </h2>

                <div>
                  <SelectPrimitive.Root
                    value={selectedChainName}
                    onValueChange={handleSwitchChain}
                  >
                    <SelectPrimitive.Trigger asChild aria-label="Food">
                      <Button variant="secondary">
                        <SelectPrimitive.Value />
                        <SelectPrimitive.Icon>
                          <ChevronDownIcon className="w-6 h-6" />
                        </SelectPrimitive.Icon>
                      </Button>
                    </SelectPrimitive.Trigger>
                    <SelectPrimitive.Content className="z-20">
                      <SelectPrimitive.ScrollUpButton className="flex items-center justify-center text-gray-700">
                        <ChevronUpIcon />
                      </SelectPrimitive.ScrollUpButton>
                      <SelectPrimitive.Viewport className="bg-white p-2 rounded-lg shadow-lg">
                        <SelectPrimitive.Group>
                          {chains.map((chain) => (
                            <SelectPrimitive.Item
                              key={chain.value}
                              value={chain.value}
                              className={cx(
                                'relative flex items-center px-8 py-2 rounded-md text-gray-700 font-medium focus:bg-gray-100',
                                'radix-disabled:opacity-50',
                                'focus:outline-none select-none',
                              )}
                            >
                              <SelectPrimitive.ItemText>
                                {chain.label}
                              </SelectPrimitive.ItemText>
                              <SelectPrimitive.ItemIndicator className="absolute left-2 inline-flex items-center">
                                <CheckIcon />
                              </SelectPrimitive.ItemIndicator>
                            </SelectPrimitive.Item>
                          ))}
                        </SelectPrimitive.Group>
                      </SelectPrimitive.Viewport>
                      <SelectPrimitive.ScrollDownButton className="flex items-center justify-center text-gray-700">
                        <ChevronDownIcon />
                      </SelectPrimitive.ScrollDownButton>
                    </SelectPrimitive.Content>
                  </SelectPrimitive.Root>
                </div>
              </div>

              <span className="mt-2">
                Your donation will go to
                <b className="block text-xs">{selectedChainDonationAddress}</b>
              </span>

              <div className="h-16 bg-[#E7E5E3] rounded-xl flex mt-7 relative">
                <input
                  className={cx(
                    'flex-1 bg-transparent pl-4 py-3 font-bold border focus:outline-black rounded-xl',
                    {
                      'border border-[#B33A41] focus:outline-[#B33A41] text-[#B33A41]':
                        address && isInsufficientBalance,
                    },
                  )}
                  type="text"
                  placeholder="0.05"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />

                {address && tokens && tokens.length > 0 && (
                  <div className="absolute h-full right-4 flex items-center justify-center space-x-4">
                    <SelectPrimitive.Root
                      value={selectedTokenSymbol}
                      onValueChange={setSelectedTokenSymbol}
                    >
                      <SelectPrimitive.Trigger asChild aria-label="Food">
                        <Button variant="secondary">
                          <SelectPrimitive.Value />
                          <SelectPrimitive.Icon>
                            <ChevronDownIcon className="w-6 h-6" />
                          </SelectPrimitive.Icon>
                        </Button>
                      </SelectPrimitive.Trigger>
                      <SelectPrimitive.Content>
                        <SelectPrimitive.ScrollUpButton className="flex items-center justify-center text-gray-700">
                          <ChevronUpIcon />
                        </SelectPrimitive.ScrollUpButton>
                        <SelectPrimitive.Viewport className="bg-white p-2 rounded-lg shadow-lg">
                          <SelectPrimitive.Group>
                            {tokens.map((token) => (
                              <SelectPrimitive.Item
                                key={token.value}
                                value={token.value}
                                className={cx(
                                  'relative flex items-center px-8 py-2 rounded-md text-gray-700 font-medium focus:bg-gray-100',
                                  'radix-disabled:opacity-50',
                                  'focus:outline-none select-none',
                                )}
                              >
                                <SelectPrimitive.ItemText>
                                  {token.label}
                                </SelectPrimitive.ItemText>
                                <SelectPrimitive.ItemIndicator className="absolute left-2 inline-flex items-center">
                                  <CheckIcon />
                                </SelectPrimitive.ItemIndicator>
                              </SelectPrimitive.Item>
                            ))}
                          </SelectPrimitive.Group>
                        </SelectPrimitive.Viewport>
                        <SelectPrimitive.ScrollDownButton className="flex items-center justify-center text-gray-700">
                          <ChevronDownIcon />
                        </SelectPrimitive.ScrollDownButton>
                      </SelectPrimitive.Content>
                    </SelectPrimitive.Root>
                  </div>
                )}
              </div>

              <div className="text-xs mt-3">
                <p>
                  = USD 96,128.03 / Balance {balance?.formatted || '0'}{' '}
                  {balance?.symbol || ''}
                </p>
                <p>Network fees might apply</p>
              </div>

              {address ? (
                <Button
                  className="mt-3 w-full"
                  disabled={isButtonDisabled}
                  variant={
                    address && (isInsufficientBalance || !isSupportedChain)
                      ? 'error'
                      : 'primary'
                  }
                  onClick={handleDonatePress}
                >
                  {isTransactionLoading
                    ? 'Sending...'
                    : isInsufficientBalance
                    ? 'Insufficient funds'
                    : !isSupportedChain
                    ? 'Unsupported chain'
                    : 'Donate'}
                </Button>
              ) : (
                <Button
                  className="mt-3 w-full"
                  onClick={() => setShowWalletConnectModal(true)}
                >
                  Connect wallet to donate
                </Button>
              )}
            </div>

            <div className="bg-[#F1F1EF] p-6 space-y-3 rounded-3xl">
              <h2 className="text-2xl font-semibold">Other organisations</h2>

              <div className="grid md:grid-cols-3 xl:grid-cols-4 grid-cols-1 gap-3">
                {Array(8)
                  .fill('')
                  .map((_, index) => (
                    <div
                      key={index}
                      className="bg-[#E7E5E3] p-6 flex flex-col items-center justify-center rounded-xl space-y-2"
                    >
                      <Image
                        className="rounded-full h-24 w-24"
                        src={{
                          src: '/world.png',
                          width: 200,
                          height: 200,
                        }}
                        alt="Organisation"
                      />

                      <span className="block font-bold text-lg text-center">
                        Earthquake
                      </span>

                      <span className="block text-xs text-center">
                        We are a small group of academics who like pancakes
                      </span>
                    </div>
                  ))}
              </div>

              <a className="block font-bold" href="#">
                Browse More
              </a>
            </div>
          </main>

          <aside className="col-span-12 lg:col-span-3 space-y-3">
            <h2 className="text-2xl font-bold">Donation history</h2>

            {Array(10)
              .fill('')
              .map((_, index) => (
                <div
                  key={index}
                  className="flex bg-[#F1F1EF] rounded-2xl p-2 space-x-3 items-center"
                >
                  <div className="h-6 w-6 xl:h-12 xl:w-12 border-[2px] border-[#69D396] rounded-full aspect-square">
                    <ArrowDownIcon className="h-full w-full" color="#69D396" />
                  </div>

                  <div className="flex flex-col">
                    <span className="block font-bold text-lg">
                      Celo Foundation
                    </span>
                    <span className="block mt-0.5">
                      Donated 300k 3 days ago
                    </span>
                  </div>
                </div>
              ))}

            <a className="block" href="#">
              <span className="font-bold text-lg">See more</span>
            </a>
          </aside>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  address: string | null;
  project: Project;
}> = async ({ req, res }) => {
  const address = getCookie('address', { req, res });

  const project = await getProjectById('10');

  return {
    props: {
      address: address?.toString() || null,
      project,
    },
  };
};
