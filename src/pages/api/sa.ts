import { getCookie } from 'cookies-next';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const address = getCookie('address');

  console.log(req.cookies);

  if (!address) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  res.status(200).json({ name: 'John Doe' });
}
