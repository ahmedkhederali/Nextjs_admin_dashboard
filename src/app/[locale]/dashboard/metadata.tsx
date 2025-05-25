import { constructMetadata } from '@/lib/metadata';

export async function getDashboardMetadata(locale: string) {
  const messages = (await import(`../../../messages/${locale}.json`)).default;

  return constructMetadata({
    title: messages.metadata.pages.dashboard.title,
    description: messages.metadata.pages.dashboard.description,
    locale,
    path: `/${locale}/dashboard`,
    absoluteTitle: true,
  });
}

