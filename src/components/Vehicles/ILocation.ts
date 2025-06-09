export interface ILocation {
  Locataire: string;
  Tarif: number;
  DateDebut: string;
  DateFin: string;
  Loyers: ILoyer[];
}

export interface ILoyer {
  DatePaiement: string;
  Montant: number;
}
