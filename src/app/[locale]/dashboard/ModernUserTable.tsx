import React, { useState } from 'react';
import { Checkbox } from '@/Components/ui/checkbox';
import { Button } from '@/Components/ui/button';
import { ModernUserTableProps } from '@/types/general_interfaces';
import { useModernUserTableLogic } from '@/customeHooks/useModernUserTableLogic';
import CreateUserModal from './CreateUserModal';



export default function ModernUserTable({
  users,
  search,
  setSearch,
  page,
  setPage,
  totalPages,
}: ModernUserTableProps) {
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

  return (
    <div className="w-full">
      <div className="flex gap-2 mb-2 justify-between items-center">
        <input
          className="border rounded px-3 py-2 w-full max-w-xs"
          placeholder="Filter emails..."
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
            Columns ▼
          </Button>
          <Button
            type="button"
            variant="default"
            className="ml-2 min-w-[110px] bg-blue-600 text-white hover:bg-blue-700"
            onClick={() => setShowCreateUser(true)}
          >
            Create User
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
                  <span className="capitalize">{col === 'action' ? 'Action' : col}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="overflow-x-auto rounded-lg border">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-muted">
              <th className="p-2 text-left">
                <Checkbox checked={allSelected} onCheckedChange={toggleAll} />
              </th>
              {visibleColumns.id && <th className="p-2 text-left">ID</th>}
              {visibleColumns.name && <th className="p-2 text-left">Name</th>}
              {visibleColumns.email && <th className="p-2 text-left">Email</th>}
              {visibleColumns.gender && <th className="p-2 text-left">Gender</th>}
              {visibleColumns.phone && <th className="p-2 text-left">Phone</th>}
              {visibleColumns.action && <th className="p-2 text-center">Action</th>}
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={1 + Object.values(visibleColumns).filter(Boolean).length} className="text-center p-4">No users found.</td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="p-2">
                    <Checkbox checked={selected.includes(user.id)} onCheckedChange={() => toggleOne(user.id)} />
                  </td>
                  {visibleColumns.id && <td className="p-2">{user.id}</td>}
                  {visibleColumns.name && <td className="p-2">{user.name}</td>}
                  {visibleColumns.email && <td className="p-2">{user.email}</td>}
                  {visibleColumns.gender && <td className="p-2">{user.gender ?? '-'}</td>}
                  {visibleColumns.phone && <td className="p-2">{user.phone ?? '-'}</td>}
                  {visibleColumns.action && (
                    <td className="p-2 text-center">
                      <Button size="sm" variant="outline" onClick={() => window.location.href = `/user/${user.id}`}>View</Button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
        <div>{`${selected.length} of ${users.length} row(s) selected.`}</div>
        <div className="flex gap-2">
          <Button type="button" variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(page - 1)}>
            Previous
          </Button>
          <Button type="button" variant="outline" size="sm" disabled={page === totalPages || totalPages === 0} onClick={() => setPage(page + 1)}>
            Next
          </Button>
        </div>
      </div>
      {showCreateUser && (
        <CreateUserModal onClose={() => setShowCreateUser(false)} />
      )}
    </div>
  );
}
