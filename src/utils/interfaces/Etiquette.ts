interface IEtiquette {
  id: number;
  label: string;
}

export interface IEtiquettePerPlace extends IEtiquette {
  status: EtiquetteStatus;
}

export type IEtiquettePerExperience = IEtiquette;

type EtiquetteStatus = 'allowed' | 'not-allowed';
