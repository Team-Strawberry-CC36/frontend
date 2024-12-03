import Axios, { type AxiosResponse } from 'axios';
import type IPlace from '@/utils/interfaces/Place';

// TEMP interfaces
export interface IPlaceMarker {
  id: string;
  location: {
    lat: number;
    lon: number;
  };
}

// Wrapper for interfaces
type ApiResponse<T> = Promise<AxiosResponse<{ message: string; data: T }>>;

class ApiService {
  private api;
  private apiUrl: string;

  constructor() {
    this.apiUrl = import.meta.env.VITE_BACKEND_URL;

    this.api = Axios.create({
      timeout: 10000,
    });

    // Set interceptor
    this.api.interceptors.request.use(
      (config) => {
        // Include session for firebase! or do nothing
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
  }
  // --- PLACES
  async search(search: string, category: string): ApiResponse<IPlaceMarker[]> {
    return await this.api.post(`${this.apiUrl}/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        textQuery: search,
        category: category,
      },
    });
  }

  async getPlace(placeId: string): ApiResponse<IPlace> {
    return await this.api.get(`${this.apiUrl}/places/${placeId}`);
  }
  // ---
}

const apiService = new ApiService();

export default apiService;
