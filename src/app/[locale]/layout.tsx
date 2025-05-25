import { Metadata } from 'next';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import HtmlAttributesUpdater from '@/Components/global/HtmlAttributesUpdater';
import ReduxProvider from '@/store/provider';
import Footer from '@/Components/global/Footer';
import { constructMetadata } from '@/lib/metadata';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params;
return constructMetadata({
 locale,
 path: `/${locale}`,
});

}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>; // next-intl v3 requires async params
}) {
  const { locale } = await params;
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
