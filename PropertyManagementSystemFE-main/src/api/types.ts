export interface AuthResponse {
  user: {
    id: number;
    name: string;
    email: string;
  };
  token: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}