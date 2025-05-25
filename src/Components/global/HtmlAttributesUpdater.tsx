'use client';
import { useLocale } from 'next-intl';
import { useEffect } from 'react';

export default function HtmlAttributesUpdater() {
  const locale = useLocale();
  useEffect(() => {
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
  }, [locale]);
  return null;
}