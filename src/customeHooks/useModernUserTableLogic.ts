import { useState, useCallback } from 'react';
import { User } from '@/types/general_interfaces';

const defaultColumns = {
  id: true,
  name: true,
  email: true,
  gender: true,
  phone: true,
  action: true,
};

export function useModernUserTableLogic(users: User[]) {
  const [selected, setSelected] = useState<number[]>([]);
  const [columnsOpen, setColumnsOpen] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState({ ...defaultColumns });
  const allSelected = users.length > 0 && selected.length === users.length;

  const toggleAll = useCallback(() => {
    setSelected(allSelected ? [] : users.map(u => u.id));
  }, [allSelected, users]);

  const toggleOne = useCallback((id: number) => {
    setSelected(selected.includes(id) ? selected.filter(i => i !== id) : [...selected, id]);
  }, [selected]);

  const handleColumnToggle = useCallback((col: keyof typeof defaultColumns) => {
    setVisibleColumns((prev) => ({ ...prev, [col]: !prev[col] }));
  }, []);

  return {
    selected,
    allSelected,
    columnsOpen,
    setColumnsOpen,
    visibleColumns,
    toggleAll,
    toggleOne,
    handleColumnToggle,
  };
}