import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
// import { auth } from '@clerk/nextjs/server';
import axios from 'axios';
import { auth } from "@clerk/nextjs/server";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const getAuthData = async () => {
  const { userId, sessionClaims } = await auth();
  return {
    userId,
    role: (sessionClaims?.metadata as { role?: string })?.role
  };
};

export { getAuthData };