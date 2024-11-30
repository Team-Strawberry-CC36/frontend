import type { EtiquetteStatus } from "./Etiquette";

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
    usersVote:IEtiquetteUsersVote[];
};

export type IPlaceEtiquetteVotes = IPlaceEtiquetteVotesAlias;