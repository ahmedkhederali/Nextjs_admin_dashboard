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