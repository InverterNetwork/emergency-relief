import crypto from 'crypto-js';

import http from '@/configs/http';
import urls from '@/configs/urls';

import { CreateTransactionDto } from '@/features/transactions/dto/create-transaction.dto';
import { Transaction } from '@/features/transactions/entity/transaction.entity';

const encryptTransaction = (transaction: CreateTransactionDto) => {
  const ENCRYPT_SECRET = 'secret';

  const encrypted = crypto.AES.encrypt(
    JSON.stringify(transaction),
    ENCRYPT_SECRET,
  ).toString();

  return encrypted;
};

export const createTransaction = async (dto: CreateTransactionDto) => {
  const encryptedTransaction = encryptTransaction(dto);

  const { data } = await http.post(
    urls.createTransaction,
    encryptedTransaction,
  );

  return data;
};

export const getTransactionsByProjectID = async (projectId: number) => {
  const { data } = await http.get<Transaction[]>(
    urls.getTransactionsByProjectId(projectId),
  );

  return data;
};
