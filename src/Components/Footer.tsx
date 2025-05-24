"use client"

import React from 'react';
import { useTranslations } from 'next-intl';

const Footer = () => {
  const t = useTranslations('footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-4 px-4 mt-auto border-t bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto flex justify-center items-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          © {currentYear} Ahmed Ali. {t('rightsReserved')}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
