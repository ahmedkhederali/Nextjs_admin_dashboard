import { Metadata } from 'next';
import { constructMetadata } from '@/lib/metadata';

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}): Promise<Metadata> {  const { locale } = await params;
  const messages = (await import(`../../../../messages/${locale}.json`)).default;
  
  return constructMetadata({
    title: `404 - ${messages['404Page'].title}`,
    description: messages['404Page'].description,
    locale,
    path: '/404',
    noIndex: true,
    absoluteTitle: true
  });
}
