"use client"
import React, { useState, useRef, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';

interface UserAvatarMenuProps {
  name: string;
  avatarUrl?: string;
  onLogout: () => void;
  showLanguageSwitcher?: boolean;
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

export default function UserAvatarMenu({ name, avatarUrl, onLogout, showLanguageSwitcher }: UserAvatarMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const t = useTranslations('userAvatarMenu');
  const locale = useLocale();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        className="flex items-center gap-2 px-3 py-2 rounded-full bg-gray-100 hover:bg-gray-200 border"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="font-semibold text-sm">{name}</span>
        {avatarUrl ? (
          <span className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-400 text-white font-bold text-lg border-2 border-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 19.5a7.5 7.5 0 1115 0v.75A2.25 2.25 0 0117.25 22.5h-10.5A2.25 2.25 0 014.5 20.25v-.75z" />
            </svg>
          </span>
        ) : (
          <span className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-400 text-white font-bold text-lg border-2 border-white">
            {getInitials(name)}
          </span>
        )}
      </button>
      {open && (
        <div className={`absolute ${locale === 'ar' ? 'left-0' : 'right-0'} mt-2 w-48 bg-white border rounded shadow z-50 p-2 flex flex-col items-center`}>
          <button
            className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 rounded"
            onClick={onLogout}
          >
            {t('logout')}
          </button>
          {showLanguageSwitcher && (
            <div className="w-full mt-2" onMouseDown={e => e.stopPropagation()}>
              <LanguageSwitcher fullWidth />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
