interface IPlaceVisitedAlias {
  experienceId: number; // ID of experience from Experiences table: id
  placeName: string; // Name of the place described in the experience
  placeType: string; // Type of the place described in the experience
  experience: string; // The written experience text from Experiences table: experience
  dateVisited: Date; // Visit date from Experiences table: created_at
}

interface ApiResponsePlaceVisited<T> {
  message: string;
  data: T;
}

export type IPlacesVisited = ApiResponsePlaceVisited<IPlaceVisitedAlias[]> | null;
