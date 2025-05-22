'use client';
import { useUsersTable } from '@/customeHooks/useUsersTable';
import Loading from './loading';
import { toast } from 'sonner';
import ModernUserTable from './ModernUserTable';

export default function DashboardPage() {
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
    // filteredCount
  } = useUsersTable(10);

  if (loading) return <Loading />;
  if (error) {toast.error(error);}
  return (
    <div className="p-4">
      <div className="flex flex-col items-center justify-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">
          User List
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