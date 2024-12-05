import Axios, { type AxiosResponse } from 'axios';

// Wrapper for interfaces
type ApiResponse<T> = Promise<AxiosResponse<{ message: string; data: T }>>;

class AuthService {
  api;
  apiUrl: string;

  constructor() {
    this.apiUrl = import.meta.env.VITE_BACKEND_URL;

    this.api = Axios.create({
      timeout: 10000,
    });
  }

  async createUser(uid: string): ApiResponse<null> {
    return await this.api.post(`${this.apiUrl}/auth/user`, {
      uid: uid,
    });
  }
}

const authService = new AuthService();

export default authService;
