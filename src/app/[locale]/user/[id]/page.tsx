
import type { Metadata } from 'next';
import UserClient from './UserClient';
import { getUserMetadata } from './metadata';
import { PageParams } from '@/types/general_interfaces';


export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { locale, id } = await params;
  return getUserMetadata(locale, id);
}

export default function UserPage() {
  return <UserClient />;
}