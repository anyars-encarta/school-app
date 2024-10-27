import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { auth } from '@clerk/nextjs/server';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const getRole = async () => {
  const { sessionClaims } = await auth();
  return (sessionClaims?.metadata as { role?: string })?.role;
};

export { getRole };
