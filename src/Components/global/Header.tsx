"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import LanguageSwitcher from '@/Components/global/LanguageSwitcher';
import UserAvatarMenu from '@/Components/global/UserAvatarMenu';
import { useTranslations, useLocale } from 'next-intl';

const Header: React.FC = () => {
  const router = useRouter();
  const t = useTranslations('header');
  const locale = useLocale();

  const handleLogout = () => {
    // Clear user session and redirect to login
    localStorage.removeItem('token');
    // remover token from cookies
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; Secure; SameSite=Strict';
    router.push(`/${locale}/login`);
  };

  const handleTitleClick = () => {
    router.push(`/${locale}/dashboard`);
  };

  return (
    <header className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-800 shadow-md">
      <h1 
        onClick={handleTitleClick}
        className="text-xl font-bold text-gray-800 dark:text-white cursor-pointer hover:text-blue-600 transition-colors"
      >
        {t('title')}
      </h1>
      <div className="flex items-center gap-6 relative">
        <div className="hidden sm:flex items-center">
          <LanguageSwitcher />
        </div>
        <div className="hidden sm:flex items-center">
          <UserAvatarMenu name="Admin" onLogout={handleLogout} />
        </div>
        {/* Mobile menu icon and dropdown */}
        <div className="sm:hidden flex items-center">
          <UserAvatarMenu name="Admin" onLogout={handleLogout} showLanguageSwitcher />
        </div>
      </div>
    </header>
  );
};

export default Header;
