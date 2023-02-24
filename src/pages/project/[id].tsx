import Head from 'next/head';
import { getCookie } from 'cookies-next';
import { GetServerSideProps } from 'next';
import * as SelectPrimitive from '@radix-ui/react-select';
import Image from 'next/image';
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@radix-ui/react-icons';
import cx from 'classnames';
import currency from 'currency.js';
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

import { parseEther, parseUnits } from 'ethers/lib/utils.js';
import { toast } from 'react-hot-toast';
import { isNumberString } from 'class-validator';

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
import Badge from '@/components/Badge/Badge';
import { headerCase } from 'change-case';
import ProjectCard from '@/components/ProjectCard/ProjectCard';

import {
  AiFillTwitterCircle,
  AiFillInstagram,
  AiFillLinkedin,
} from 'react-icons/ai';
import { BsPatchCheckFill } from 'react-icons/bs';

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
      if (chain.network === 'avalanche' && chain.blockExplorers) {
        chain.blockExplorers['explorer-xp'] = {
          name: 'explorer-xp',
          url: 'https://explorer-xp.avax.network',
        };
      }

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
        amount: currency(amount).toString(),
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

  const isValidNumber = isNumberString(amount) && Number(amount) > 0;

  const isButtonDisabled = useMemo(() => {
    const sharedCondition =
      !isSupportedChain || !amount || isInsufficientBalance || !isValidNumber;

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
    isValidNumber,
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

    const value = parseUnits(amount, selectedToken?.decimals);

    const tx = await contract.transfer(
      selectedChainDonationAddress as `0x${string}`,
      value,
      {
        from: address as `0x${string}`,
      },
    );

    setLastTransactionHash(tx.hash as `0x${string}`);

    createTransaction({
      amount: currency(amount).toString(),
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
      return <AiFillTwitterCircle className="w-4 h-4" color="#4E5BA6" />;
    }

    if (platform === SocialProfilePlatform.INSTAGRAM) {
      return <AiFillInstagram className="w-4 h-4" color="#4E5BA6" />;
    }

    if (platform === SocialProfilePlatform.LINKEDIN) {
      return <AiFillLinkedin className="w-4 h-4" color="#4E5BA6" />;
    }

    return <Web className="w-4 h-4" color="#4E5BA6" />;
  };

  const renderCredential = (statement: string, url: string | null) => {
    const renderContent = () => (
      <Badge
        leftNode={
          <BsPatchCheckFill className=" rounded-full w-4 h-4" color="#669F2A" />
        }
      >
        {statement}
      </Badge>
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

  const renderLink = (platform: string, url: string | null) => {
    const renderContent = () => (
      <Badge variant={'secondary'} leftNode={renderSocialLinkIcon(platform)}>
        {headerCase(platform)}
      </Badge>
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

  const blockExplorerUrl = useMemo(() => {
    if (
      selectedChain?.name.toLowerCase() === 'avalanche' &&
      selectedChainDonationAddress?.startsWith('X-')
    ) {
      return selectedChain.blockExplorers.xChain;
    }

    return selectedChain?.blockExplorers.default;
  }, [selectedChain, selectedChainDonationAddress]);

  return (
    <>
      <Head>
        <title>Emergency Relief - {project.name}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <Header cachedAddress={cachedAddress || undefined} />

      <div className="container mx-auto py-10">
        <h1 className="font-bold text-5xl pt-10 mt-8">{project.name}</h1>
        <div className="grid grid-cols-12 gap-8 mt-5">
          <main className="col-span-12 lg:col-span-8 space-y-5">
            <div>
              <div className="relative flex justify-center aspect-video">
                <Image
                  className="rounded-lg shadow-sm w-full h-full object-cover"
                  src={{
                    src: project.bannerImageUrl,
                    width: 1600,
                    height: 500,
                  }}
                  alt="Turkey earthquake"
                />
              </div>
            </div>

            <div className="py-8 space-y-3">
              <h2 className="font-bold text-4xl">About</h2>
              <p className="text-md text-gray-600 block">
                {project.description}
              </p>

              <h3 className="font-semibold text-lg">Credentials</h3>

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

              <h3 className="font-semibold text-lg">Links</h3>

              <div className="flex gap-3 flex-wrap">
                {renderLink('website', project.website)}
                {project.socialProfiles.map((profile, i) => (
                  <div key={i}>
                    {renderLink(profile.platform, profile.profileUrl)}
                  </div>
                ))}
              </div>
            </div>
          </main>

          <aside className="col-span-12 lg:col-span-4 space-y-3">
            {isMounted && (
              <div
                className={cx('', {
                  'group insufficient-balance': isInsufficientBalance,
                })}
              >
                <h2 className="font-bold text-4xl">Donate Now</h2>

                <div className="mt-2 w-full break-all">
                  {Boolean(selectedChainDonationAddress) && (
                    <>
                      <p className="text-xs text-gray-600">
                        We can only support EVM compatible chains of NGOs&apos;
                        wallets listed on verified exchanges.
                      </p>
                      <p className="mt-3 text-sm text-gray-600">
                        Your donation will go to
                      </p>
                      <Link
                        href={`${blockExplorerUrl}/address/${selectedChainDonationAddress}`}
                        target="_blank"
                      >
                        <p className="block font-semibold text-sm">
                          {selectedChainDonationAddress}
                        </p>
                      </Link>
                    </>
                  )}
                </div>

                <div className="max-w-full mx-auto">
                  <div className="mt-5">
                    <SelectPrimitive.Root
                      value={selectedChainName}
                      onValueChange={handleSwitchChain}
                    >
                      <SelectPrimitive.Trigger asChild aria-label="Donate">
                        <Button variant="secondary" className="w-full">
                          <SelectPrimitive.Value />
                          <SelectPrimitive.Icon>
                            <ChevronDownIcon className="w-5 h-5" />
                          </SelectPrimitive.Icon>
                        </Button>
                      </SelectPrimitive.Trigger>
                      <SelectPrimitive.Content className="!z-50">
                        <SelectPrimitive.ScrollUpButton className="flex items-center justify-center text-gray-700">
                          <ChevronUpIcon />
                        </SelectPrimitive.ScrollUpButton>
                        <SelectPrimitive.Viewport className="bg-gray-200 p-2 rounded-lg shadow-lg w-full">
                          <SelectPrimitive.Group>
                            {chains.map((chain) => (
                              <SelectPrimitive.Item
                                key={chain.value}
                                value={chain.value}
                                className={cx(
                                  'relative flex items-center text-sm px-8 py-3 rounded-md text-gray-900 focus:bg-gray-100 cursor-pointer w-full',
                                  'radix-disabled:opacity-50',
                                  'focus:bg-gray-300 focus:outline-none select-none',
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

                  <div>
                    <div className="h-16 bg-whote rounded-xl flex mt-5 relative">
                      <input
                        className={cx(
                          'flex-1 bg-transparent pl-4 py-3 font-bold border focus:outline-gray-300 rounded-xl',
                          {
                            'border border-error-500 focus:outline-error-500 text-error-500':
                              (address && isInsufficientBalance) ||
                              (amount && !isValidNumber),
                          },
                        )}
                        type="text"
                        placeholder="0.05"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                      />

                      {address &&
                        tokens &&
                        tokens.length > 0 &&
                        selectedChainDonationAddress && (
                          <div className="absolute h-full right-4 flex items-center justify-center space-x-4">
                            <SelectPrimitive.Root
                              value={selectedTokenSymbol}
                              onValueChange={setSelectedTokenSymbol}
                            >
                              <SelectPrimitive.Trigger
                                asChild
                                aria-label="Donate"
                              >
                                <Button variant="secondary">
                                  <SelectPrimitive.Value />
                                  <SelectPrimitive.Icon>
                                    <ChevronDownIcon className="w-5 h-5" />
                                  </SelectPrimitive.Icon>
                                </Button>
                              </SelectPrimitive.Trigger>
                              <SelectPrimitive.Content>
                                <SelectPrimitive.ScrollUpButton className="flex items-center justify-center text-gray-700">
                                  <ChevronUpIcon />
                                </SelectPrimitive.ScrollUpButton>
                                <SelectPrimitive.Viewport className="bg-gray-200 p-2 rounded-lg shadow-lg ">
                                  <SelectPrimitive.Group>
                                    {tokens.map((token) => (
                                      <SelectPrimitive.Item
                                        key={token.value}
                                        value={token.value}
                                        className={cx(
                                          'relative flex items-center text-sm px-8 py-3 rounded-md text-gray-900 focus:bg-gray-100 cursor-pointer ',
                                          'radix-disabled:opacity-50',
                                          'focus:bg-gray-300 focus:outline-none select-none',
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
                  <div className="text-xs mt-3 ">
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
          </aside>

          {/* <aside className="col-span-12 lg:col-span-4 space-y-3">
            <h2 className="text-3xl font-bold">Donation history</h2>

            {project.transactions.length > 0 ? (
              <>
                {project.transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex bg-gray-200 rounded-lg p-3 space-x-3 items-center shadow-sm"
                  >
                    <BiDonateHeart className="w-5 h-5" />

                    <div className="flex flex-col overflow-hidden">
                      <span className=" text-gray-600 text-sm">
                        from: {transaction.fromWallet}
                      </span>

                      <span className="block font-bold text-gray-900 mt-0.5">
                        {transaction.amount} {transaction.token}
                      </span>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div>
                <span className="text-sm text-gray-600">No donations yet.</span>
              </div>
            )}
          </aside> */}
        </div>

        <div>
          <h2 className="mt-14 lg:mt-8 font-bold text-4xl text-gray-900">
            Support Other NGOs
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 mt-8">
            {projects
              .filter((p) => p.id !== project.id)
              .map((p) => (
                <Link href={`/project/${p.id}`} key={p.id}>
                  <ProjectCard
                    key={p.id}
                    project={{
                      imageUrl: p.bannerImageUrl,
                      name: p.name,
                      description: p.summary,
                      raised: '$10,000',
                      numberOfUniqueDonors: 1203,
                    }}
                  ></ProjectCard>
                </Link>
              ))}
          </div>
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
