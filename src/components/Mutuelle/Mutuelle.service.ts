import type { Mutuelle } from "./Mutuelle.model";

export const getMutuelles = async () => {
  const mutuelles = await localStorage.getItem("mutuelle");
  return mutuelles ? JSON.parse(mutuelles) : [];
};

export const getMutuelleByAmc = async (amcNb: string) => {
  const mutuelles = await getMutuelles();
  return mutuelles.find((m: Mutuelle) => m.amcNb == amcNb);
};

export const postMutuelle = async (newMutuelle: Mutuelle) => {
  const mutuelle = await getMutuelleByAmc(newMutuelle.amcNb);
  if (!mutuelle) {
    const mutuelles = await getMutuelles();
    await localStorage.setItem(
      "mutuelle",
      JSON.stringify([...mutuelles, newMutuelle])
    );
  }
};

export const deleteMutuelle = async (amcNb: string) => {
  const mutuelle = await getMutuelles();
  await localStorage.setItem(
    "mutuelle",
    JSON.stringify(mutuelle.filter((m: Mutuelle) => m.amcNb != amcNb))
  );
};

export const updateMutuelle = async (amcNb: string, update: Mutuelle) => {
  const mutuelle = await getMutuelles();
  await localStorage.setItem(
    "mutuelle",
    JSON.stringify(
      mutuelle.map((m: Mutuelle) => (m.amcNb == amcNb ? update : m))
    )
  );
};
