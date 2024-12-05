import type IPlace from '@/utils/interfaces/Place';
import {auth} from "@/firebase";
import Axios, {type AxiosInstance, type AxiosResponse} from "axios";
import type { IPlaceVisited } from '@/utils/interfaces/PlacesVisited';
import type { IPlaceEtiquetteVotes } from '@/utils/interfaces/PlaceEtiquetteVotes';

// TEMP interfaces
export interface IPlaceMarker {
  id: string;
  location: {
    lat: number;
    lon: number;
  };
}

// Adding a new experience
type ExperienceAddPackage = {
  dateVisited: string;
  experience: string;
  etiquetteSelected: {
    etiquette_id: number;
  }[];
};

type ApiResponse<T> = Promise<AxiosResponse<{ message: string; data: T }>>;

class ApiService {
  api: AxiosInstance;
  apiUrl: string;

  constructor() {
    this.apiUrl = import.meta.env.VITE_BACKEND_URL;

    this.api = Axios.create({
      timeout: 10000,
    });

      this.api.interceptors.request.use(
        async (config) => {
          const user = auth.currentUser;
          if (user) {
            const token = await user.getIdToken();
            config.headers.Authorization = `Bearer ${token}`;
          }
          return config;
        },
        (error) => {
          return Promise.reject(error);
        },
      );
  }

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

  async createExperience(placeId: number, data: ExperienceAddPackage): ApiResponse<IPlace> {
    return await this.api.post(`${this.apiUrl}/places/${placeId}/experiences`, {
      data: data
    })
  }

  async getPlaceEtiquetteVotesData(place: IPlace): ApiResponse<IPlaceEtiquetteVotes> {
    return await this.api.get(`${this.apiUrl}/moreTesting/places/${place.id}/votes`);
  }

  async postEtiquetteVotesData() {
    return await this.api.post(`${this.apiUrl}`);
  }

  async getPlacesVisitedByUser(): ApiResponse<IPlaceVisited[]> {
    return await this.api.get(`${this.apiUrl}/places`);
  }

  async updateExperience(expId: number, newExperience: string): ApiResponse<string> {
    return await this.api.patch(`${this.apiUrl}/experiences/${expId}`);
  }

}

const apiService = new ApiService();

export default apiService;
