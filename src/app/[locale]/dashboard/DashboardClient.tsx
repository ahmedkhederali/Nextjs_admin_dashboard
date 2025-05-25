'use client';

import { useUsersTable } from '@/customeHooks/useUsersTable';
import Loading from './loading';
import ModernUserTable from './ModernUserTable';
import { useTranslations } from 'next-intl';

export default function DashboardClient() {
  const t = useTranslations('dashboard');
  const {
    users,
    loading,
    error,
    search,
    setSearch,
    sortKey,
    setSortKey,
    sortOrder,
    setSortOrder,
    page,
    setPage,
    totalPages,
  } = useUsersTable(10);

  if (loading) return <Loading />;
  if (error)  console.error(error);
  
  return (
    <div className="p-4">
      <div className="flex flex-col items-center justify-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">
          {t('userList')}
        </h1>
        <div className="h-1 w-16 bg-gray-300 rounded-full mb-4" />
      </div>
      <ModernUserTable
        users={users}
        loading={loading}
        error={error}
        search={search}
        setSearch={setSearch}
        sortKey={sortKey}
        setSortKey={setSortKey}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        page={page}
        setPage={setPage}
        totalPages={totalPages}
        filteredCount={users.length}
      />
    </div>
  );
}
