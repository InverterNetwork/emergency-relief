import http from '@/configs/http';
import urls from '@/configs/urls';
import { Project } from '@/features/projects/entity/project.entity';
import {
  identityNetworkName,
  isNetworkSupported,
} from '@/features/wallet/chain.service';

export const getProjectById = async (id: string) => {
  const { data } = await http.get<Project>(urls.getProject(id));

  data.donation_addresses.map((address) => {
    address.chain = identityNetworkName(address.chain) || address.chain;
  });

  data.donation_addresses = data.donation_addresses.filter((address) =>
    isNetworkSupported(identityNetworkName(address.chain) || address.chain),
  );

  if (process.env.NODE_ENV === 'development') {
    data.donation_addresses.push({
      chain: 'goerli',
      address: '0x4BF07c675dB5a562816848e3a5bFA993510450D2',
    });

    // data.donation_addresses.push({
    //   chain: 'optimism',
    //   address: '0x4BF07c675dB5a562816848e3a5bFA993510450D2',
    // });

    // data.donation_addresses.push({
    //   chain: 'matic',
    //   address: '0x4BF07c675dB5a562816848e3a5bFA993510450D2',
    // });
  }

  return data;
};
