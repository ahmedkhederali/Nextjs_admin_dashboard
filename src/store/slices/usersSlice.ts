import API_ROUTES from '@/lib/routes';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const res = await fetch(API_ROUTES.FETCH_USERS);
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
});

export const createUser = createAsyncThunk(
  'users/createUser',
  async (user: {  name: string; email: string; gender: string; phone: string }, { rejectWithValue }) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) return rejectWithValue('No token');
    const res = await fetch(API_ROUTES.CREATE_USER, {
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

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (
    { id, ...user }: { id: number; name: string; email: string; gender: string; phone: string },
    { rejectWithValue }
  ) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) return rejectWithValue('No token');
    const res = await fetch(API_ROUTES.UPDATE_USER(id), {
      method: 'PUT',
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

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (userId: number, { rejectWithValue }) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) return rejectWithValue('No token');

    const res = await fetch(`/api/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      return rejectWithValue(errorText);
    }

    return userId;
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
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.users.findIndex((u) => u.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Error';
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter((user) => user.id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Error';
      });
  },
});

export default usersSlice.reducer;