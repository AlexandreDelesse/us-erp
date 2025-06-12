import client from "../../api/client";
import type { Mutuelle, MutuelleCmd } from "./Mutuelle.model";

export const getMutuelle = async () => {
  return (await client.get("Mutuelle")).data;
  // return await JSON.parse(localStorage.getItem("mutuelles") ?? "[]");
};

export const deleteMutuelle = async (id: number) => {
  return (await client.delete("Mutuelle/" + id)).data;
  // const mutuelles = await getMutuelle();
  // return localStorage.setItem(
  //   "mutuelles",
  //   JSON.stringify(mutuelles.filter((m: Mutuelle) => m.ID != id))
  // );
};

export const postMutuelle = async (cmd: MutuelleCmd) => {
  return (await client.post("Mutuelle", cmd)).data;
  // const mutuelles = await getMutuelle();
  // return localStorage.setItem(
  //   "mutuelles",
  //   JSON.stringify([...mutuelles, { ...cmd, id: mutuelles.length + 1 }])
  // );
};

export const putMutuelle = async (mutuelle: Mutuelle) => {
  return (await client.put("Mutuelle", mutuelle)).data;
  // const mutuelles = await getMutuelle();
  // return localStorage.setItem(
  //   "mutuelles",
  //   JSON.stringify(
  //     mutuelles.map((m: Mutuelle) => (m.ID == mutuelle.ID ? mutuelle : m))
  //   )
  // );
};
