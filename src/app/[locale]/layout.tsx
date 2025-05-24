import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import HtmlAttributesUpdater from '@/Components/HtmlAttributesUpdater';
import ReduxProvider from '@/store/provider';
import Footer from '@/Components/Footer';

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
    <ReduxProvider>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <HtmlAttributesUpdater />
        <div className="min-h-screen flex flex-col overflow-x-hidden">
          {children}
          <Footer />
        </div>
      </NextIntlClientProvider>
    </ReduxProvider>
  );
}
