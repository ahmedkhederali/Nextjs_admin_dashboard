import { constructMetadata } from '@/lib/metadata';

export async function getLoginMetadata(locale: string) {
  const messages = (await import(`../../../messages/${locale}.json`)).default;

  return constructMetadata({
    title: messages.metadata.pages.login.title,
    description: messages.metadata.pages.login.description,
    locale,
    path: `/${locale}/login`,
    absoluteTitle: true,
  });
}