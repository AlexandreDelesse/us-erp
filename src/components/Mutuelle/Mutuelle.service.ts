import type { Mutuelle } from "./Mutuelle.model";

export const getMutuelles = async () => {
  const mutuelles = await localStorage.getItem("mutuelle");
  return mutuelles ? JSON.parse(mutuelles) : [];
};

export const getMutuelleByAmc = async (amcNb: string) => {
  const mutuelles = await getMutuelles();
  return mutuelles.find((m: Mutuelle) => m.amc == amcNb);
};

export const postMutuelle = async (newMutuelle: Mutuelle) => {
  const mutuelle = await getMutuelleByAmc(newMutuelle.amc);
  const mutuelles = await getMutuelles();
  let toStore = [];
  if (!mutuelle) {
    toStore = [...mutuelles, newMutuelle];
  } else {
    toStore = mutuelles.map((m: Mutuelle) =>
      m.amc == newMutuelle.amc ? newMutuelle : m
    );
  }
  localStorage.setItem("mutuelle", JSON.stringify(toStore));
  return toStore;
};

export const deleteMutuelle = async (amcNb: string) => {
  const mutuelle = await getMutuelles();
  await localStorage.setItem(
    "mutuelle",
    JSON.stringify(mutuelle.filter((m: Mutuelle) => m.amc != amcNb))
  );
};

export const updateMutuelle = async (amcNb: string, update: Mutuelle) => {
  const mutuelle = await getMutuelles();
  await localStorage.setItem(
    "mutuelle",
    JSON.stringify(mutuelle.map((m: Mutuelle) => (m.amc == amcNb ? update : m)))
  );
};
