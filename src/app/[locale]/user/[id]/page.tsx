
import type { Metadata } from 'next';
import UserClient from './UserClient';
import { getUserMetadata } from './metadata';


export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string , id: string }>;
}): Promise<Metadata> {
  const { locale, id } = await params;
  return getUserMetadata(locale, id);
}

export default function UserPage() {
  return <UserClient />;
}