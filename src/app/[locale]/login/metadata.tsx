import { Metadata } from 'next';
import { constructMetadata } from '@/lib/metadata';

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  console.log(messages);
  return constructMetadata({
    title: messages.metadata.pages.login.title,
    description: messages.metadata.pages.login.description,
    locale,
    path: '/login',
    absoluteTitle: true,
  });
}

