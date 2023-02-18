export type Transaction = {
  id: number;
  transactionHash: string;
  fromWallet: string;
  toWalletId: number;
  projectId: number;
  token: string;
  amount: string;
  status: TransactionStatus;
  createdAt: string;
  completedAt: string | null;
};

export enum TransactionStatus {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAIL = 'FAIL',
}
