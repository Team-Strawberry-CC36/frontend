export default interface IPlace {
	id: number
	name: string;
	address: string;
	// generalInfo: ''; // [ ] Removed from Schema
	placeType: PlaceType;
	location: {
		latitude: number;
		longitude: number;
	},
	etiquettes?: IEtiquettePerPlace[]
	experiences?: IExperience[];
	// - Photos
	// We may not have, or we may don't want to include it
	// in the interface
	photos?: IPhoto[];
	// Metadata
	metadata: {
		createdAt: Date;
		updatedAt: Date;
	}
}


interface IExperience {
	id: number;
	// --
	// We don't need this element
	// --
	// placeId: number;
	username: string;
	dateVisited: Date;
	//
	experience: string;
	etiquettes: IEtiquettePerExperience[]
	//
	metadata: {
		createdAt: Date;
		updatedAt: Date;
	}
}

interface IPhoto {
	id: number;
  fileData: string;
  metadata: {
	  createdAt: string;
	  authorName: string;
  }
}

type PlaceType = "shrine" | "onsen" | "restaurant";

interface IEtiquette {
	id: number;
	label: string;
}

interface IEtiquettePerPlace extends IEtiquette {
	status: EtiquetteStatus;
}

interface IEtiquettePerExperience extends IEtiquette {}



type EtiquetteStatus = "allowed" | "not-allowed";
