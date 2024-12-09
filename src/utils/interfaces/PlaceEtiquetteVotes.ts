import type { EtiquetteStatus } from './Etiquette';

interface IEtiquetteVotes {
  etiquetteId: number;
  etiquetteType: string;
  numberOfVotesForAllowed: number;
  numberOfVotesForNotAllowed: number;
}

interface IEtiquetteUsersVote {
  etiquetteId: number;
  etiquetteType: string;
  vote: EtiquetteStatus;
}

interface IPlaceEtiquetteVotesAlias {
  placeId: number;
  userId: string | undefined;
  userHasVoted: boolean;
  etiquetteVotes: IEtiquetteVotes[];
  usersVote: IEtiquetteUsersVote[];
}

interface ApiResponseEtiquetteVotes<T> {
  message: string;
  data: T;
}

export type IPlaceEtiquetteVotes = ApiResponseEtiquetteVotes<IPlaceEtiquetteVotesAlias> | null;
