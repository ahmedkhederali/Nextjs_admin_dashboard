export interface loginPageProps {
  params: {
    id: string;
  };
}

export interface AuthState {
  isAuthenticated: boolean;
  user: { email: string } | null;
}

export const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

export interface User {
  id: number;
  name: string;
  email: string;
  gender: string | null;
  phone: string | null;
}

export interface ModernUserTableProps {
  users: User[];
  loading: boolean;
  error: string | null;
  search: string;
  setSearch: (v: string) => void;
  sortKey: 'id' | 'name' | 'email';
  setSortKey: (v: 'id' | 'name' | 'email') => void;
  sortOrder: 'asc' | 'desc';
  setSortOrder: (v: 'asc' | 'desc') => void;
  page: number;
  setPage: (v: number) => void;
  totalPages: number;
  filteredCount: number;
}


export interface CreateUserFormState {
  errors: {
    name?: string[];
    email?: string[];
    gender?: string[];
    phone?: string[];
    _form?: string[];
  };
  success?: boolean;
}