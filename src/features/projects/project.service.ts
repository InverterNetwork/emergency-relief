import http from '@/configs/http';
import urls from '@/configs/urls';
import { Project } from '@/features/projects/entity/project.entity';
import {
  identityNetworkName,
  isNetworkSupported,
} from '@/features/wallet/chain.service';

const prepareProjectForDisplay = (project: Project) => {
  const clonedProject = { ...project };

  clonedProject.donationWallets.forEach((address) => {
    address.chain = identityNetworkName(address.chain) || address.chain;
  });

  clonedProject.donationWallets = clonedProject.donationWallets.filter(
    (address) =>
      isNetworkSupported(identityNetworkName(address.chain) || address.chain),
  );

  if (process.env.NODE_ENV === 'development') {
    clonedProject.donationWallets.push({
      id: -1,
      projectId: clonedProject.id,
      chain: 'goerli',
      chainId: 5,
      address: '0x4BF07c675dB5a562816848e3a5bFA993510450D2',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    // clonedProject.donationWallets.push({
    //   chain: 'optimism',
    //   address: '0x4BF07c675dB5a562816848e3a5bFA993510450D2',
    // });

    // clonedProject.donationWallets.push({
    //   chain: 'matic',
    //   address: '0x4BF07c675dB5a562816848e3a5bFA993510450D2',
    // });
  }

  return clonedProject;
};

export const getProjectById = async (id: string) => {
  const { data } = await http.get<Project>(urls.getProject(id));

  return prepareProjectForDisplay(data);
};

export const getProjects = async () => {
  const { data } = await http.get<Project[]>(urls.getProjects);

  const projects = data.map((project) => prepareProjectForDisplay(project));

  return projects;
};
