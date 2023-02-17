import crypto from 'crypto-js';

import http from '@/configs/http';
import urls from '@/configs/urls';

import { CreateTransactionDto } from '@/features/transactions/dto/create-transaction.dto';

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
