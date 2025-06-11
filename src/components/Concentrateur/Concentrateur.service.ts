import type { Concentrateur } from "./Consentrateur.model";

export const getConcentrateurs = async () => {
  const concentrateurs = await localStorage.getItem("concentrateur");
  return concentrateurs ? JSON.parse(concentrateurs) : [];
};

export const getConcentrateurByAmc = async (amcNb: string) => {
  const concentrateurs = await getConcentrateurs();
  return concentrateurs.find((m: Concentrateur) => m.amc == amcNb);
};

export const postConcentrateur = async (newConcentrateur: Concentrateur) => {
  const concentrateur = await getConcentrateurByAmc(newConcentrateur.amc);
  const mutuelles = await getConcentrateurs();
  let toStore = [];
  if (!concentrateur) {
    toStore = [...mutuelles, newConcentrateur];
  } else {
    toStore = mutuelles.map((m: Concentrateur) =>
      m.amc == newConcentrateur.amc ? newConcentrateur : m
    );
  }
  localStorage.setItem("concentrateur", JSON.stringify(toStore));
  return toStore;
};

export const deleteConcentrateur = async (amcNb: string) => {
  const concentrateur = await getConcentrateurs();
  await localStorage.setItem(
    "concentrateur",
    JSON.stringify(concentrateur.filter((m: Concentrateur) => m.amc != amcNb))
  );
};

export const updateConcentrateur = async (
  amcNb: string,
  update: Concentrateur
) => {
  const concentrateur = await getConcentrateurs();
  await localStorage.setItem(
    "concentrateur",
    JSON.stringify(
      concentrateur.map((m: Concentrateur) => (m.amc == amcNb ? update : m))
    )
  );
};
