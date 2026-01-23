import { mockVehicles } from "../mock-data";
import type { IVehicle } from "../components/Vehicles/IVehicle";
import { useQuery } from "@tanstack/react-query";

export default function useGetVehicles() {
  const getVehicles = async (): Promise<IVehicle[]> =>
    await Promise.resolve(mockVehicles);

  const req = useQuery({ queryKey: ["vehicles"], queryFn: getVehicles });
  return req;
}
