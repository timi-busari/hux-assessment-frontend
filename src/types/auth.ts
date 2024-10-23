export interface AuthState {
    username: string;
    password: string;
    isLogin: boolean;
    isLoading: boolean;
    message: string | null;
    error: string | null;
  }