import Axios, { type AxiosResponse } from 'axios';
import type IPlace from '@/utils/interfaces/Place';
import type ExperienceHelpfulnessVote from '@/utils/interfaces/ExperienceHelpfulnessVote';

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
}

// Delete existing vote
type deleteUserHelpfulnessPackage = {
  experienceID: number;
  vote_id: number;
  vote: string;
}

// Edit existing vote
type editUserHelpfulnessPackage = {
  experienceID: number;
  vote_id: number;
  vote: string;
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

  async createExperience(placeId: number, data: ExperienceAddPackage): ApiResponse<IPlace> {
    return await this.api.post(`${this.apiUrl}/places/${placeId}/experiences`, {
      data: data
    })
  }

  async retrieveHelpfulnessVote(experienceId: number): ApiResponse<ExperienceHelpfulnessVote[]> {
    return await this.api.get(`${this.apiUrl}/experiences/${experienceId}/votes`);
  }

  async addHelpfulnessVote(experienceId: number, vote: string): ApiResponse<newUserHelpfulnessPackage> {
    return await this.api.post(`${this.apiUrl}/experiences/${experienceId}/votes`, {
      vote: vote
    });
  }

  async deleteHelpfulnessVote(experienceId: number, voteId: number): ApiResponse<deleteUserHelpfulnessPackage> {
    return await this.api.delete(`${this.apiUrl}/experiences/${experienceId}/votes/${voteId}`)
  }

  async editHelpfulnessVote(experienceId: number, voteId: number | undefined, vote: string): ApiResponse<editUserHelpfulnessPackage> {
    return await this.api.patch(`${this.apiUrl}/experiences/${experienceId}/votes/${voteId}`, {
      vote: vote
    });
  }
}

const apiService = new ApiService();

export default apiService;
