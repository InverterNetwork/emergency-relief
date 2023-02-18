import { Transaction } from '@/features/transactions/entity/transaction.entity';

/**
 * Model OrganizationWallet
 *
 */
export type OrganizationWallet = {
  id: number;
  organizationId: number;
  chain: string;
  chainId: number;
  address: string;
  createdAt: string;
  updatedAt: string;
};

/**
 * Model Organization
 *
 */
export type Organization = {
  id: number;
  name: string;
  profileImageUrl: string | null;
  bannerImageUrl: string | null;
  wallets: OrganizationWallet[];
  createdAt: string;
  updatedAt: string;
};

/**
 * Model ProjectDonationWallet
 *
 */
export type ProjectDonationWallet = {
  id: number;
  projectId: number;
  chain: string;
  chainId: number;
  address: string;
  createdAt: string;
  updatedAt: string;
};

export enum SocialProfilePlatform {
  TWITTER = 'TWITTER',
  INSTAGRAM = 'INSTAGRAM',
  LINKEDIN = 'LINKEDIN',
}

/**
 * Model ProjectSocialProfile
 *
 */
export type ProjectSocialProfile = {
  id: number;
  platform: SocialProfilePlatform;
  profileUrl: string;
  projectId: number;
};

/**
 * Model ProjectCredentials
 *
 */
export type ProjectCredentials = {
  id: number;
  statement: string;
  credentialUrl: string;
  projectId: number;
};

/**
 * Model ProjectCategory
 *
 */
export type ProjectCategory = {
  id: number;
  category: string;
  projectId: number;
};

/**
 * Model ProjectPartner
 *
 */
export type ProjectPartner = {
  id: number;
  name: string;
  websiteUrl: string;
  projectId: number;
};

/**
 * Model Project
 *
 */
export type Project = {
  id: number;
  ownerId: number;
  name: string;
  description: string;
  summary: string;
  website: string;
  logoImageUrl: string | null;
  bannerImageUrl: string | null;
  impactLocation: string | null;
  donationWallets: ProjectDonationWallet[];
  categories: ProjectCategory[];
  socialProfiles: ProjectSocialProfile[];
  credentials: ProjectCredentials[];
  partners: ProjectPartner[];
  transactions: Transaction[];
  createdAt: string;
  updatedAt: string;
};
