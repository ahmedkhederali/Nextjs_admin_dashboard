import { getLoginMetadata } from './metadata';
import LoginClient from './LoginClient';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return getLoginMetadata(locale);
}

export default function LoginPage() {
  return <LoginClient />;
}