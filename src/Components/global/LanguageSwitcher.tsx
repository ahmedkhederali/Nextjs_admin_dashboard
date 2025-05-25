'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/Components/ui/select";

interface LanguageSwitcherProps {
  fullWidth?: boolean;
}

const LanguageSwitcher = ({ fullWidth }: LanguageSwitcherProps) => {
  const router = useRouter();
  const pathname = usePathname(); // e.g. /en/login
  const currentLocale = useLocale(); // e.g. en or ar

  const handleLanguageChange = (newLocale: string) => {
    // remove current locale from the path
    const segments = pathname.split('/');
    if (segments[1] === currentLocale) {
      segments.splice(1, 1); // remove the locale
    }
    const newPath = `/${newLocale}${segments.join('/') === '' ? '' : segments.join('/')}`;
    router.push(newPath);
  };

  return (
    <div className={` top-6 ${currentLocale === 'ar' ? 'left-[145]' : 'right-[145]'} z-50`}>
      <Select value={currentLocale || undefined} onValueChange={handleLanguageChange}>
        <SelectTrigger className={`border p-2 rounded ${fullWidth ? 'w-full' : 'w-[120px]'}`}>
          <SelectValue placeholder="Select language" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="ar">العربية</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSwitcher;

