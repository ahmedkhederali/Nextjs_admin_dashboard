import { constructMetadata } from '@/lib/metadata';
import { cookies } from 'next/headers';

export async function getUserMetadata(locale: string, id: string) {
  const messages = (await import(`../../../../messages/${locale}.json`)).default;
  const cookieStore = await cookies();

  const authToken = cookieStore.get('token')?.value || '';
  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/users/${id}`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }); 
  const user = await response.json();
  const title = user
    ? `${user.name} | ${messages.metadata.pages.userDetails.title}`
    : messages.metadata.pages.userDetails.title;

  return constructMetadata({
    title,
    description: messages.metadata.pages.userDetails.description,
    locale,
    path: `/${locale}/dashboard/user/${id}`,
    absoluteTitle: true,
  });
}