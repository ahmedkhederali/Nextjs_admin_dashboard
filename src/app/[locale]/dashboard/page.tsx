import { getDashboardMetadata } from './metadata';
import DashboardClient from './DashboardClient';
import type { Metadata } from 'next';
import { PageParams } from '@/types/general_interfaces';

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { locale } = await params;
  return getDashboardMetadata(locale); // ✅ متناسق
}

export default function DashboardPage() {
  return <DashboardClient />;
}