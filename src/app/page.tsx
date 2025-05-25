import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export default async function LocaleHome({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  redirect(`/${locale}/login`);
}
