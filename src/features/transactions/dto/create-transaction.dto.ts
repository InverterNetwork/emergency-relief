export interface CreateTransactionDto {
  transactionHash: string;
  fromWallet: string;
  toWalletId: number;
  projectId: number;
  token: string;
  amount: string;
}
