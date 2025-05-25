import { getDashboardMetadata } from './metadata';
import DashboardClient from './DashboardClient';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return getDashboardMetadata(locale);
}

export default function DashboardPage() {
  return <DashboardClient />;
}
