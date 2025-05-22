import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '@/store/slices/usersSlice';
import { RootState, AppDispatch } from '@/store';
import { User } from '@/types/general_interfaces';

export function useUsersTable(pageSize = 10) {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error } = useSelector((state: RootState) => state.users);

  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<'id' | 'name' | 'email'>('id');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(1);
 
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const filteredUsers = useMemo(() => {
    let filtered = [...users];
    if (search) {
      filtered = filtered.filter((user: User) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
      );
    }
    filtered = filtered.sort((a: User, b: User) => {
      let cmp = 0;
      if (a[sortKey] && b[sortKey]) {
        cmp = String(a[sortKey]).localeCompare(String(b[sortKey]));
      }
      return sortOrder === 'asc' ? cmp : -cmp;
    });
    return filtered;
  }, [users, search, sortKey, sortOrder]);

  const paginatedUsers = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredUsers.slice(start, start + pageSize);
  }, [filteredUsers, page, pageSize]);

  const totalPages = Math.ceil(filteredUsers.length / pageSize);

  return {
    users: paginatedUsers,
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
    filteredCount: filteredUsers.length,
  };
}