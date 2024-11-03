//app/(root)/api/auth.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { auth } from '@clerk/nextjs/server';

const getAuthData = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId, sessionClaims } = await auth();
  return {
    userId,
    role: (sessionClaims?.metadata as { role?: string })?.role
  };
};

export default getAuthData;