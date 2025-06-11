import type { ConcentMutuel } from "./ConcentMutuel.model";

export const getConcentMutuels = async () => {
  const concentMutuels = await localStorage.getItem("concentMutuel");
  return concentMutuels ? JSON.parse(concentMutuels) : [];
};

export const getConcentMutuelByAmc = async (amcNb: string) => {
  const concentMutuels = await getConcentMutuels();
  return concentMutuels.find(
    (m: ConcentMutuel) => m.concentrateur?.amc == amcNb
  );
};

export const postConcentMutuel = async (newConcentMutuel: ConcentMutuel) => {
  console.log("crossed postConcent", newConcentMutuel);
  const mutuelle = await getConcentMutuelByAmc(
    newConcentMutuel.concentrateur!.amc
  );
  const mutuelles = await getConcentMutuels();
  let toStore = [];
  if (!mutuelle) {
    toStore = [...mutuelles, newConcentMutuel];
  } else {
    toStore = mutuelles.map((m: ConcentMutuel) =>
      m.concentrateur!.amc == newConcentMutuel.concentrateur!.amc
        ? newConcentMutuel
        : m
    );
  }
  console.log("before storage");
  localStorage.setItem("concentMutuel", JSON.stringify(toStore));
  console.log("toStore", toStore);
  return toStore;
};

export const deleteConcentMutuel = async (amcNb: string) => {
  const concentMutuel = await getConcentMutuels();
  await localStorage.setItem(
    "concentMutuel",
    JSON.stringify(
      concentMutuel.filter((m: ConcentMutuel) => m.concentrateur!.amc != amcNb)
    )
  );
};

export const updateConcentMutuel = async (
  amcNb: string,
  update: ConcentMutuel
) => {
  const concentMutuel = await getConcentMutuels();
  await localStorage.setItem(
    "concentMutuel",
    JSON.stringify(
      concentMutuel.map((m: ConcentMutuel) =>
        m.concentrateur!.amc == amcNb ? update : m
      )
    )
  );
};
