interface IPlaceVisitedAlias {
  placeId: number;
  placeName: string;
  placeType: string;
  experience: string;
  dateVisited: Date;
}

interface ApiResponsePlaceVisited<T> {
  message: string;
  data: T;
}

export type IPlacesVisited = ApiResponsePlaceVisited<IPlaceVisitedAlias[]> | null;
