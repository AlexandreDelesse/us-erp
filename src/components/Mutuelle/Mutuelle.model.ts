export interface Mutuelle extends MutuelleCmd {
  ID: number;
}

export interface MutuelleCmd {
  ID?: number;
  AMC: string;
  IsConcentrator: boolean;
  TeletransNumber: string;
  Name: string;
}
