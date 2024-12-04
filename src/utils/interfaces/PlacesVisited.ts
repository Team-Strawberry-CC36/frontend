export interface IPlaceVisited {
    placeId: number;
    placeName: string;
    placeType: string;
    experience: string;
    dateVisited: Date;
    experienceId: number
}

// interface ApiResponsePlaceVisited<T> {
//     message: string;
//     data: T;
// }

// export type IPlacesVisited = ApiResponsePlaceVisited<IPlaceVisitedAlias[]> | null;