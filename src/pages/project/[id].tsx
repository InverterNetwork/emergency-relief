import Head from 'next/head';
import { getCookie } from 'cookies-next';
import { GetServerSideProps } from 'next';
import * as SelectPrimitive from '@radix-ui/react-select';
import Image from 'next/image';
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  InstagramLogoIcon,
  TwitterLogoIcon,
  LinkedInLogoIcon,
} from '@radix-ui/react-icons';
import { FaDonate } from 'react-icons/fa';
import cx from 'classnames';
import { useEffect, useMemo, useState } from 'react';
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
import _ from 'lodash';
import Link from 'next/link';

import { parseEther } from 'ethers/lib/utils.js';
import { toast } from 'react-hot-toast';
import { isNumberString } from 'class-validator';

import ProjectCard from '@/features/projects/components/ProjectCard/ProjectCard';
import {
  getProjectById,
  getProjects,
} from '@/features/projects/project.service';
import {
  Project,
  SocialProfilePlatform,
} from '@/features/projects/entity/project.entity';

import { showWalletConnectModalAtom } from '@/features/wallet/components/WalletConnectButton/store/modals.store';
import {
  getNetworkByName,
  isNetworkSupported,
} from '@/features/wallet/chain.service';

import useIsMounted from '@/hooks/useIsMounted.hook';

import Web from '@/components/Icons/Web';
import Header from '@/components/Header/Header';
import Button from '@/components/Button/Button';
import { createTransaction } from '@/features/transactions/transaction.service';
import { getPriceOfTokens } from '@/features/markets/market.service';
import { Market } from '@/features/markets/entity/market.entity';
import { formatNumber } from '@/utils/number';

type Props = {
  address: string | null;
  project: Project;
  projects: Project[];
  prices: Market[];
};

export default function Home({
  address: cachedAddress,
  project,
  projects,
  prices,
}: Props) {
  const { address: clientSideAdress } = useAccount();
  const { data: signer } = useSigner();
  const { isSuccess: isDisconnected } = useDisconnect();
  const { chain } = useNetwork();
  const isMounted = useIsMounted();

  const address = isDisconnected
    ? clientSideAdress
    : clientSideAdress || cachedAddress;

  const [, setShowWalletConnectModal] = useRecoilState(
    showWalletConnectModalAtom,
  );
  const [lastTransactionHash, setLastTransactionHash] = useState('');

  const defaultChain = useMemo(() => {
    if (!chain) {
      return project.donationWallets[0].chain;
    }

    if (isNetworkSupported(chain.network)) {
      return chain.network;
    }

    return 'Unsupported';
  }, [chain, project.donationWallets]);

  const [selectedChainName, setSelectedChainName] = useState(defaultChain);

  const chains = useMemo(() => {
    const chains = project.donationWallets.map((address) => ({
      value: address.chain,
      label: getNetworkByName(address.chain)?.name,
    }));

    if (chain) {
      chains.push({
        value: chain.network,
        label: chain.name,
      });
    }

    return _.uniqBy(chains, (chain) => chain.value);
  }, [chain, project.donationWallets]);

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

  const selectedChainDonationWallet = project.donationWallets.find(
    (address) => address.chain === selectedChainName,
  );

  const selectedChainDonationAddress = selectedChainDonationWallet?.address;

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

  const selectedTokenPrice = prices.find(
    (price) =>
      price.symbol.toLowerCase() === selectedTokenSymbol?.toLowerCase(),
  );

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
      if (!selectedChainDonationWallet || !balance) {
        return;
      }

      setLastTransactionHash(data.hash as `0x${string}`);

      createTransaction({
        amount,
        fromWallet: address as `0x${string}`,
        toWalletId: selectedChainDonationWallet.id,
        projectId: project.id,
        transactionHash: data.hash as `0x${string}`,
        token: balance.symbol as string,
      });

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

  const isSupportedChain = tokens.length > 1;

  useEffect(() => {
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
      !isSupportedChain ||
      !amount ||
      isInsufficientBalance ||
      !isNumberString(amount);

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
    if (!contract || !selectedChainDonationWallet || !balance) {
      return;
    }

    const tx = await contract.transfer(
      selectedChainDonationAddress as `0x${string}`,
      parseEther(amount),
    );

    setLastTransactionHash(tx.hash as `0x${string}`);

    createTransaction({
      amount,
      fromWallet: address as `0x${string}`,
      toWalletId: selectedChainDonationWallet.id,
      projectId: project.id,
      transactionHash: tx.hash as `0x${string}`,
      token: balance.symbol,
    });

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

  if (process.env.NODE_ENV === 'development') {
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
      isNetworkSupported,
      prices,
      selectedTokenPrice,
    });
  }

  const renderSocialLinkIcon = (platform: string) => {
    if (platform === SocialProfilePlatform.TWITTER) {
      return <TwitterLogoIcon className="w-8 h-8" />;
    }

    if (platform === SocialProfilePlatform.INSTAGRAM) {
      return <InstagramLogoIcon className="w-8 h-8" />;
    }

    if (platform === SocialProfilePlatform.LINKEDIN) {
      return <LinkedInLogoIcon className="w-8 h-8" />;
    }

    return <Web className="w-8 h-8" />;
  };

  const renderCredential = (statement: string, url: string | null) => {
    const renderContent = () => (
      <div className="flex w-fit h-10 px-3 rounded-full items-center justify-center bg-[#E7E5E3] space-x-2 select-none">
        <CheckIcon className="bg-black rounded-full w-7 h-7" color="white" />

        <span className="block font-bold text-lg">{statement}</span>
      </div>
    );

    if (url) {
      return (
        <Link href={url} target="_blank">
          {renderContent()}
        </Link>
      );
    }

    return <>{renderContent()}</>;
  };

  const amountInUSD = useMemo(() => {
    const amountAsInteger =
      parseInt(amount) * (selectedTokenPrice?.current_price || 0);

    if (typeof amountAsInteger !== 'number' || isNaN(amountAsInteger)) {
      return 0;
    }

    return formatNumber(amountAsInteger);
  }, [amount, selectedTokenPrice]);

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
                  className="rounded-3xl h-52 object-cover"
                  src={{
                    src: project.bannerImageUrl || '/turkey.png',
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
                      className="rounded-full h-40 w-40 border-[8px] border-white bg-[#E7E5E3] object-contain"
                      src={{
                        src: project.logoImageUrl || '/world.png',
                        width: 160,
                        height: 160,
                      }}
                      alt="Turkey earthquake"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-20 mt-3 flex flex-col items-center justify-center flex-1 space-y-3">
                <h1 className="text-4xl font-semibold text-center">
                  {project.name}
                </h1>

                <div className="flex space-x-3">
                  {project.socialProfiles.map((profile) => (
                    <Link
                      key={profile.platform}
                      href={profile.profileUrl}
                      target="_blank"
                    >
                      <div className="p-2 bg-[#E7E5E3] rounded-full">
                        {renderSocialLinkIcon(profile.platform)}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-[#F1F1EF] p-6 space-y-3 rounded-3xl">
              <h2 className="text-2xl font-semibold">About</h2>
              <span className="block">{project.description}</span>
            </div>

            <div className="bg-[#F1F1EF] p-6 space-y-3 rounded-3xl">
              <h2 className="text-2xl font-semibold">Credentials</h2>

              <div className="flex gap-3 flex-wrap">
                {project.credentials.map((credential, i) => (
                  <div key={i}>
                    {renderCredential(
                      credential.statement,
                      credential.credentialUrl,
                    )}
                  </div>
                ))}
              </div>
            </div>

            {isMounted && (
              <div
                className={cx('bg-[#F1F1EF] p-6 rounded-3xl', {
                  'group insufficient-balance': isInsufficientBalance,
                })}
              >
                <div className="flex justify-between">
                  <h2 className="text-4xl font-semibold">
                    Donate on {chain?.nativeCurrency.symbol || 'ETH'}
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
                  <b className="block text-xs">
                    {selectedChainDonationAddress}
                  </b>
                </span>

                <div className="max-w-md mx-auto">
                  <div>
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
                  </div>
                  <div className="text-xs mt-3">
                    {selectedTokenPrice && <span>= USD {amountInUSD} / </span>}

                    <span>
                      Balance: {formatNumber(balance?.formatted || '0')}{' '}
                      {balance?.symbol || ''}
                    </span>

                    <p>Network fees might apply</p>
                  </div>

                  {address ? (
                    <Button
                      className="mt-3 w-full"
                      disabled={isButtonDisabled}
                      variant={
                        address &&
                        (isInsufficientBalance ||
                          !isSupportedChain ||
                          !selectedChainDonationAddress)
                          ? 'error'
                          : 'primary'
                      }
                      onClick={handleDonatePress}
                    >
                      {isTransactionLoading
                        ? 'Sending...'
                        : !isSupportedChain || !selectedChainDonationAddress
                        ? 'Unsupported chain'
                        : isInsufficientBalance
                        ? 'Insufficient funds'
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
              </div>
            )}

            <div className="bg-[#F1F1EF] p-6 space-y-3 rounded-3xl">
              <h2 className="text-2xl font-semibold">Other organisations</h2>

              <div className="grid md:grid-cols-3 xl:grid-cols-4 grid-cols-1 gap-3">
                {projects.slice(0, 8).map((p) => (
                  <ProjectCard
                    key={p.id}
                    id={p.id}
                    logoImageUrl={p.logoImageUrl || ''}
                    name={p.name}
                    summary={p.summary}
                  />
                ))}
              </div>

              <Link className="block font-bold" href="/donate">
                Browse More
              </Link>
            </div>
          </main>

          <aside className="col-span-12 lg:col-span-3 space-y-3">
            <h2 className="text-2xl font-bold">Donation history</h2>

            {project.transactions.length > 0 ? (
              <>
                {project.transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex bg-[#F1F1EF] rounded-2xl p-2 space-x-3 items-center"
                  >
                    <FaDonate size={24} />

                    <div className="flex flex-col">
                      <span className="block font-bold text-sm">
                        {transaction.fromWallet}
                      </span>

                      <span className="block mt-0.5">
                        {transaction.amount} {transaction.token}
                      </span>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div>
                <span className="text-sm text-gray-500">No donations yet</span>
              </div>
            )}
          </aside>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  req,
  res,
  query,
}) => {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59',
  );

  const address = getCookie('address', { req, res });

  const [project, projects, prices] = await Promise.all([
    getProjectById(query.id as string),
    getProjects(),
    getPriceOfTokens(),
  ]);

  return {
    props: {
      address: address?.toString() || null,
      project,
      projects,
      prices,
    },
  };
};
