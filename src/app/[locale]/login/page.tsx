import { getLoginMetadata } from './metadata';
import LoginClient from './LoginClient';
import { PageParams } from '@/types/general_interfaces';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { locale } = await params;
  return getLoginMetadata(locale);
}

export default function LoginPage() {
  return <LoginClient />;
}