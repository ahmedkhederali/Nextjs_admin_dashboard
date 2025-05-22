import { useState } from "react";
import { User } from '@/types/general_interfaces';
import { Button } from '@/Components/ui/button';

interface UserTableProps {
  users: User[];
  sortKey: string;
  setSortKey: (key: string) => void;
  sortOrder: 'asc' | 'desc';
  setSortOrder: (order: 'asc' | 'desc') => void;
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
  t: (key: string) => string;
}

export default function UserTable({ users, sortKey, setSortKey, sortOrder, setSortOrder, t }: UserTableProps) {
  // Per-column filter state
  const [filters, setFilters] = useState<{ [key: string]: string }>({});

  // Handle per-column filter
  const filteredUsers = users.filter(user => {
    return Object.entries(filters).every(([key, value]) => {
      if (!value) return true;
      return String(user[key as keyof User] ?? '').toLowerCase().includes(value.toLowerCase());
    });
  });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 text-center">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border cursor-pointer" onClick={() => { setSortKey('id'); setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); }}>
              {t('id')} {sortKey === 'id' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
              <input className="block w-full mt-1 border rounded p-1 text-xs" placeholder={t('filter')} value={filters.id || ''} onChange={e => setFilters(f => ({ ...f, id: e.target.value }))} />
            </th>
            <th className="p-2 border cursor-pointer" onClick={() => { setSortKey('name'); setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); }}>
              {t('name')} {sortKey === 'name' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
              <input className="block w-full mt-1 border rounded p-1 text-xs" placeholder={t('filter')} value={filters.name || ''} onChange={e => setFilters(f => ({ ...f, name: e.target.value }))} />
            </th>
            <th className="p-2 border cursor-pointer" onClick={() => { setSortKey('email'); setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); }}>
              {t('email')} {sortKey === 'email' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
              <input className="block w-full mt-1 border rounded p-1 text-xs" placeholder={t('filter')} value={filters.email || ''} onChange={e => setFilters(f => ({ ...f, email: e.target.value }))} />
            </th>
            <th className="p-2 border">{t('gender')}
              <input className="block w-full mt-1 border rounded p-1 text-xs" placeholder={t('filter')} value={filters.gender || ''} onChange={e => setFilters(f => ({ ...f, gender: e.target.value }))} />
            </th>
            <th className="p-2 border">{t('phone')}
              <input className="block w-full mt-1 border rounded p-1 text-xs" placeholder={t('filter')} value={filters.phone || ''} onChange={e => setFilters(f => ({ ...f, phone: e.target.value }))} />
            </th>
            <th className="p-2 border">{t('actions')}</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center p-4">{t('noUsersFound')}</td>
            </tr>
          ) : (
            filteredUsers.map(user => (
              <tr key={user.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => window.location.href = `/user/${user.id}`}>
                <td className="p-2 border">{user.id}</td>
                <td className="p-2 border">{user.name}</td>
                <td className="p-2 border">{user.email}</td>
                <td className="p-2 border">{user.gender ?? '-'}</td>
                <td className="p-2 border">{user.phone ?? '-'}</td>
                <td className="p-2 border">
                  <Button size="sm" onClick={e => { e.stopPropagation(); window.location.href = `/user/${user.id}`; }}>{t('view')}</Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
