import React, { useState } from 'react';
import { Checkbox } from '@/Components/ui/checkbox';
import { Button } from '@/Components/ui/button';
import { ModernUserTableProps, User } from '@/types/general_interfaces';
import { useModernUserTableLogic } from '@/customeHooks/useModernUserTableLogic';
import CreateUserModal from './CreateUserModal';
import EditUserModal from './EditUserModal';
import DeleteUserModal from './DeleteUserModal';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { useTranslations, useLocale } from 'next-intl';

export default function ModernUserTable({
  users,
  search,
  setSearch,
  page,
  setPage,
  totalPages,
}: ModernUserTableProps) {
  const t = useTranslations('modernUserTable');
  const locale = useLocale();
  const {
    selected,
    columnsOpen,
    setColumnsOpen,
    visibleColumns,
    allSelected,
    toggleAll,
    toggleOne,
    handleColumnToggle,
  } = useModernUserTableLogic(users);

  const [showCreateUser, setShowCreateUser] = useState(false);
  const [showEditUser, setShowEditUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showDeleteUser, setShowDeleteUser] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const handleEdit = (user: User) => {
    setSelectedUser({ ...user, gender: user.gender ?? '-' });
    setShowEditUser(true);
  };

  const handleDelete = (user: User) => {
    setUserToDelete(user);
    setShowDeleteUser(true);
  };

  const getGenderLabel = (gender: string, t: (key: string) => string) => {
    if (gender === 'male') return t('male');
    if (gender === 'female') return t('female');
    return gender;
  };

  return (
    <div className="w-full">
      <div className="flex gap-2 mb-2 justify-between items-center">
        <input
          className="border rounded px-3 py-2 w-full max-w-xs"
          placeholder={t('filterEmails')}
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className="relative">
          <Button
            type="button"
            variant="outline"
            className="min-w-[110px]"
            onClick={() => setColumnsOpen((v) => !v)}
            aria-haspopup="true"
            aria-expanded={columnsOpen}
          >
            {t('columns')} ▼
          </Button>
          <Button
            type="button"
            variant="default"
            className="ml-2 min-w-[110px] bg-blue-600 text-white hover:bg-blue-700"
            onClick={() => setShowCreateUser(true)}
          >
            {t('createUser')}
          </Button>
          {columnsOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow z-50">
              {Object.entries(visibleColumns).map(([col, visible]) => (
                <button
                  key={col}
                  className="flex items-center w-full px-4 py-2 hover:bg-gray-100 text-left gap-2"
                  onClick={() => handleColumnToggle(col as keyof typeof visibleColumns)}
                  type="button"
                >
                  <span className="inline-block w-4">{visible ? '✓' : ''}</span>
                  <span className="capitalize">{t(col)}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="overflow-x-auto rounded-lg border">
        <table className="min-w-full text-sm">
          <thead>
            <tr className={`bg-muted ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
              <th className={`p-2 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
                <Checkbox checked={allSelected} onCheckedChange={toggleAll} />
              </th>
              {visibleColumns.id && <th className={`p-2 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>{t('id')}</th>}
              {visibleColumns.name && <th className={`p-2 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>{t('name')}</th>}
              {visibleColumns.email && <th className={`p-2 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>{t('email')}</th>}
              {visibleColumns.gender && <th className={`p-2 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>{t('gender')}</th>}
              {visibleColumns.phone && <th className={`p-2 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>{t('phone')}</th>}
              {visibleColumns.action && <th className="p-2 text-center">{t('action')}</th>}
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={1 + Object.values(visibleColumns).filter(Boolean).length} className="text-center p-4">{t('noUsersFound')}</td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="p-2">
                    <Checkbox checked={selected.includes(user.id)} onCheckedChange={() => toggleOne(user.id)} />
                  </td>
                  {visibleColumns.id && <td className="p-2" onClick={() => window.location.href = `/${locale}/user/${user.id}`}>{user.id}</td>}
                  {visibleColumns.name && <td className="p-2" onClick={() => window.location.href = `/${locale}/user/${user.id}`}>{user.name}</td>}
                  {visibleColumns.email && <td className="p-2" onClick={() => window.location.href = `/${locale}/user/${user.id}`}>{user.email}</td>}
                  {visibleColumns.gender && <td className="p-2" onClick={() => window.location.href = `/${locale}/user/${user.id}`}>{getGenderLabel(user.gender ?? '-', t)}</td>}
                  {visibleColumns.phone && <td className="p-2" onClick={() => window.location.href = `/${locale}/user/${user.id}`}>{user.phone ?? '-'}</td>}
                  {visibleColumns.action && (
                    <td className="p-2 text-center flex justify-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex items-center gap-1 text-blue-600 hover:text-white hover:bg-blue-600 border-blue-600"
                        onClick={() => handleEdit(user)}
                      >
                        <FiEdit className="text-lg" /> {t('edit')}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex items-center gap-1 text-red-600 hover:text-white hover:bg-red-600 border-red-600"
                        onClick={() => handleDelete(user)}
                      >
                        <FiTrash2 className="text-lg" /> {t('delete')}
                      </Button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
        <div>{`${selected.length} ${t('of')} ${users.length} ${t('rowsSelected')}`}</div>
        <div className="flex gap-2">
          <Button type="button" variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(page - 1)}>
            {t('previous')}
          </Button>
          <Button type="button" variant="outline" size="sm" disabled={page === totalPages || totalPages === 0} onClick={() => setPage(page + 1)}>
            {t('next')}
          </Button>
        </div>
      </div>
      {showCreateUser && (
        <CreateUserModal onClose={() => setShowCreateUser(false)} />
      )}
      {showEditUser && selectedUser && (
        <EditUserModal
          user={{
            ...selectedUser,
            gender: selectedUser?.gender ?? '-',
            phone: selectedUser?.phone ?? ''
          }}
          onClose={() => setShowEditUser(false)}
          onSave={(updatedUser) => {
            console.log('Updated user:', updatedUser);
            // Add save logic here
          }}
        />
      )}
      {showDeleteUser && userToDelete && (
        <DeleteUserModal
          userId={userToDelete.id}
          onClose={() => setShowDeleteUser(false)}
          onDeleteSuccess={() => {
            console.log('User deleted:', userToDelete);
            setUserToDelete(null);
          }}
        />
      )}
    </div>
  );
}
