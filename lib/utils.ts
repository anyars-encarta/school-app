import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { auth } from '@clerk/nextjs/server';
import axios from 'axios';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const getAuthData = async () => {
  const response = await axios.get('/api/auth');
  return response.data;
};

export { getAuthData };
