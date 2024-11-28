import type { IEtiquettePerExperience } from './Etiquette';

export default interface IExperience {
  id: number;
  // --
  // We don't need this element
  // --
  // placeId: number;
  username: string;
  dateVisited: Date;
  //
  experience: string;
  etiquettes: IEtiquettePerExperience[];
  //
  metadata: {
    createdAt: Date;
    updatedAt: Date;
  };
}
