import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import HtmlAttributesUpdater from '@/Components/HtmlAttributesUpdater';

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>; // next-intl v3 requires async params
}) {
  const { locale } = await params;
  console.log('LocaleLayout', locale);
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  const messages = (await import(`../../messages/${locale}.json`)).default;

  return (
    // DON'T move locale-dependent values into html/body directly if they change on client
    <NextIntlClientProvider locale={locale} messages={messages}>
      <HtmlAttributesUpdater />
      {children}
    </NextIntlClientProvider>
  );
}
