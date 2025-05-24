import { Metadata } from 'next';
import { constructMetadata } from '@/lib/metadata';

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string; id: string }> 
}): Promise<Metadata> {
  const { locale, id } = await params;
  const messages = (await import(`../../../../messages/${locale}.json`)).default;
    // Get user data for better metadata
  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/users/${id}`);
  const user = await response.json();
  const title = user ? 
    `${user.name} | ${messages.metadata.pages.userDetails.title}` :
    messages.metadata.pages.userDetails.title;

  return constructMetadata({
    title,
    description: messages.metadata.pages.userDetails.description,
    locale,
    path: `/user/${id}`,
    absoluteTitle: true
  });
}
