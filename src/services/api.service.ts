import type IPlace from '@/utils/interfaces/Place';
import type ExperienceHelpfulnessVote from '@/utils/interfaces/ExperienceHelpfulnessVote';
import { auth } from '@/firebase';
import Axios, { type AxiosInstance, type AxiosResponse } from 'axios';
import type IExperience from '@/utils/interfaces/Experience';
import type { IPlacesVisited } from '@/utils/interfaces/PlacesVisited';

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

// Helpfulness voting
// Add new vote
type newUserHelpfulnessPackage = {
  experienceID: number;
  vote: string;
};

// Delete existing vote
type deleteUserHelpfulnessPackage = {
  experienceID: number;
  vote_id: number;
  vote: string;
};

// Edit existing vote
type editUserHelpfulnessPackage = {
  experienceID: number;
  vote_id: number;
  vote: string;
};

// Wrapper for interfaces
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

  async getUserExperience() :ApiResponse<IPlacesVisited> {
    return await this.api.get(`${this.apiUrl}/experiences`)
  }

  async createExperience(placeId: number, data: ExperienceAddPackage): ApiResponse<IExperience> {
    return await this.api.post(`${this.apiUrl}/places/${placeId}/experiences`, {
      data: data,
    });
  }

  async updateExperience(experienceId: number, experience: string): ApiResponse<IExperience>{
    return await this.api.patch(`${this.apiUrl}/experiences/${experienceId}/edit`, {
      data: experience,
    });
  }

  async deleteExperience(experienceId: number) {
    return await this.api.delete(`${this.apiUrl}/experiences/${experienceId}/delete`);
  }

  async retrieveHelpfulnessVote(): ApiResponse<ExperienceHelpfulnessVote[]> {
    return await this.api.get(`${this.apiUrl}/experiences/votes`);
  }

  async addHelpfulnessVote(
    experienceId: number,
    vote: string,
  ): ApiResponse<newUserHelpfulnessPackage> {
    return await this.api.post(`${this.apiUrl}/experiences/${experienceId}/votes`, {
      vote: vote,
    });
  }

  async deleteHelpfulnessVote(
    experienceId: number,
    voteId: number,
  ): ApiResponse<deleteUserHelpfulnessPackage> {
    return await this.api.delete(`${this.apiUrl}/experiences/${experienceId}/votes/${voteId}`);
  }

  async editHelpfulnessVote(
    experienceId: number,
    voteId: number | undefined,
    vote: string,
  ): ApiResponse<editUserHelpfulnessPackage> {
    return await this.api.patch(`${this.apiUrl}/experiences/${experienceId}/votes/${voteId}`, {
      vote: vote,
    });
  }

  async fetchPhotos(placeId: number): ApiResponse<string[]> {
    return await this.api.get(`${this.apiUrl}/places/${placeId}/photos`);
  }
}

const apiService = new ApiService();

export default apiService;
