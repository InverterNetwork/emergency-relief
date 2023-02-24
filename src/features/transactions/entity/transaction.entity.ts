import { ProjectDonationWallet } from '@/features/projects/entity/project.entity';

export type Transaction = {
  id: number;
  transactionHash: string;
  fromWallet: string;
  toWalletId: number;
  projectId: number;
  token: string;
  amount: string;
  toWallet: ProjectDonationWallet;
  status: TransactionStatus;
  createdAt: string;
  completedAt: string | null;
};

export enum TransactionStatus {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAIL = 'FAIL',
}
