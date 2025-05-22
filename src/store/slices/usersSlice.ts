import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const res = await fetch('/api/proxy-users');
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
});

export const createUser = createAsyncThunk(
  'users/createUser',
  async (user: { id: number; name: string; email: string; gender: string; phone: string }, { rejectWithValue }) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) return rejectWithValue('No token');
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    });
    if (!res.ok) {
      const error = await res.text();
      return rejectWithValue(error);
    }
    return await res.json();
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [] as import('@/types/general_interfaces').User[],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error';
      })
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.unshift(action.payload as import('@/types/general_interfaces').User);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Error';
      });
  },
});

export default usersSlice.reducer;