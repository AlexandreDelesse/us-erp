import type { IAssurance } from "./IAssurance";
import type { IEmprunt } from "./IEmprunt";
import type { IEntretien } from "./IEntretien";
import type { ILocation } from "./ILocation";
import type { IVente } from "./IVente";

export type IVehicle = {
  Immat: string;
  Alias: string;
  Marque: string;
  Model: string;
  Critair: boolean;
  Fonction: string;
  MiseEnService: string;
  Proprietaire: string;
  NumCarteTotal?: string;
  SteCarteTotal?: string;
  AgrementArs?: string;
  Km: number;

  Assurance?: IAssurance;
  ContratLocation: ILocation[];
  Entretiens: IEntretien[];
  Emprunt?: IEmprunt;
  Vente?: IVente;
};
