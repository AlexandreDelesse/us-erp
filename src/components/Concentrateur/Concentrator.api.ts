import type { Concentrateur } from "./Concentrateur.model";

export const getConcentrator = async () => {
  //   return (await client.get("Mutuelle")).data;
  return await JSON.parse(localStorage.getItem("concentrators") ?? "[]");
};

export const deleteConcentrator = async (id: number) => {
  //   return (await client.delete("Mutuelle/" + id)).data;
  const mutuelles = await getConcentrator();
  return localStorage.setItem(
    "concentrators",
    JSON.stringify(mutuelles.filter((c: Concentrateur) => c.Id != id))
  );
};

export const postConcentrator = async (cmd: Concentrateur) => {
  //   return (await client.post("Mutuelle", cmd)).data;
  const mutuelles = await getConcentrator();
  return localStorage.setItem(
    "concentrators",
    JSON.stringify([...mutuelles, { ...cmd, id: mutuelles.length + 1 }])
  );
};

export const putConcentrator = async (mutuelle: Concentrateur) => {
  //   return (await client.put("Mutuelle", mutuelle)).data;
  const mutuelles = await getConcentrator();
  return localStorage.setItem(
    "mutuelles",
    JSON.stringify(
      mutuelles.map((c: Concentrateur) => (c.Id == mutuelle.Id ? mutuelle : c))
    )
  );
};
