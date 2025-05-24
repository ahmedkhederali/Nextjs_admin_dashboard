'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/Components/ui/button';
import { Card } from '@/Components/ui/card';
import Header from '@/Components/Header';
import { useTranslations } from 'next-intl';
import { useUser } from '@/customeHooks/useUser';
import { getGenderLabel } from '@/lib/utils';

export default function UserPage() {
  const params = useParams();
  const router = useRouter();
  const t = useTranslations('userPage');
  
  const handleBack = () => {
    router.back();
  };
  const { user, loading, error } = useUser(params.id as string);

  if (loading) {
    return (
      <div className="bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Card className="p-6">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          </Card>
        </main>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Card className="p-6">
            <p className="text-center text-gray-500">{error || t('userNotFound')}</p>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-4">
          <Button
            variant="outline"
            onClick={handleBack}
            className="flex items-center gap-2"
          >
            ← {t('back')}
          </Button>
        </div>
        <Card className="p-6">
          <div className="space-y-6">
            {/* User Avatar and Name Section */}
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center text-white text-2xl font-bold">
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                <p className="text-gray-500">{user.email}</p>
              </div>
            </div>

            {/* User Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">{t('id')}</p>
                <p className="text-base">{user.id}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">{t('email')}</p>
                <p className="text-base">{user.email}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">{t('phone')}</p>
                <p className="text-base">{user.phone || t('notProvided')}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">{t('gender')}</p>
                <p className="text-base">{user.gender ? getGenderLabel(user.gender, t) : t('notProvided')}</p>
              </div>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}
