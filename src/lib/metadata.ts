import { Metadata } from 'next';

interface MetadataProps {
  title?: string;
  description?: string;
  locale: string;
  path: string;
  noIndex?: boolean;
  absoluteTitle?: boolean;
}

export function constructMetadata({
  title,
  description,
  locale,
  path,
  noIndex = false,
  absoluteTitle = false,
}: MetadataProps): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const siteName = 'Admin Dashboard';

  const finalTitle = title
    ? (absoluteTitle ? title : `${title} | ${siteName}`)
    : undefined;

  const finalDescription = description || undefined;

  return {
    ...(finalTitle ? { title: finalTitle } : {}),
    ...(finalDescription ? { description: finalDescription } : {}),
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}${path}`,
      languages: {
        en: `/en${path}`,
        ar: `/ar${path}`,
      },
    },
    openGraph: {
      ...(title ? { title } : {}),
      ...(description ? { description } : {}),
      url: `${baseUrl}${path}`,
      siteName,
      locale,
      type: 'website',
      images: [
        {
          url: `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: title || siteName,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      ...(title ? { title } : {}),
      ...(description ? { description } : {}),
      images: [`${baseUrl}/og-image.png`],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
      },
    },
    icons: {
      icon: '/favicon.ico',
      apple: '/apple-touch-icon.png',
    },
  };
}


