'use client';
import { useUsersTable } from '@/customeHooks/useUsersTable';
import Loading from './loading';
import { User } from '@/types/general_interfaces';
import { toast } from 'sonner';

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
  } = useUsersTable(5);

  if (loading) return <Loading />;
  if (error) {toast.error(error);}
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }}
          className="border p-2 rounded w-full md:w-64"
        />
        <div className="flex gap-2">
          <label className="font-semibold">Sort by:</label>
          <select
            value={sortKey}
            onChange={e => setSortKey(e.target.value as 'id' | 'name' | 'email')}
            className="border p-2 rounded"
          >
            <option value="id">ID</option>
            <option value="name">Name</option>
            <option value="email">Email</option>
          </select>
          <button
            className="border p-2 rounded bg-gray-100"
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            type="button"
          >
            {sortOrder === 'asc' ? '↑' : '↓'}
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Gender</th>
              <th className="p-2 border">Phone</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center p-4">No users found.</td>
              </tr>
            ) : (
              users.map((user:User) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="p-2 border">{user.id}</td>
                  <td className="p-2 border">{user.name}</td>
                  <td className="p-2 border">{user.email}</td>
                  <td className="p-2 border">{user.gender ?? '-'}</td>
                  <td className="p-2 border">{user.phone ?? '-'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-4">
        <button
          className="border px-3 py-1 rounded disabled:opacity-50"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          className="border px-3 py-1 rounded disabled:opacity-50"
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages || totalPages === 0}
        >
          Next
        </button>
      </div>
    </div>
  );
}