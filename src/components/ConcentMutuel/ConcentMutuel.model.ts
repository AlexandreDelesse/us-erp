import type { Concentrateur } from "../Concentrateur/Consentrateur.model";
import type { Mutuelle } from "../Mutuelle/Mutuelle.model";

export interface ConcentMutuel {
  mutuelle?: Mutuelle;
  concentrateur?: Concentrateur;
  start: string;
  end: string | null;
}
