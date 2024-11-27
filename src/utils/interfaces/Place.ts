import type { IEtiquettePerPlace } from './Etiquette';
import type IExperience from './Experience';

export default interface IPlace {
  id: number;
  name: string;
  address: string;
  // generalInfo: ''; // [ ] Removed from Schema
  placeType: IPlaceType;
  location: {
    latitude: number;
    longitude: number;
  };
  etiquettes?: IEtiquettePerPlace[];
  experiences?: IExperience[];
  // - Photos
  // We may not have, or we may don't want to include it
  // in the interface
  photos?: IPhoto[];
  // Metadata
  metadata: {
    createdAt: Date;
    updatedAt: Date;
  };
}

type IPlaceType = 'shrine' | 'onsen' | 'restaurant';

interface IPhoto {
  id: number;
  fileData: string;
  metadata: {
    createdAt: string;
    authorName: string;
  };
}
