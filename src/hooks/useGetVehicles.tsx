import { useQuery } from "@tanstack/react-query";

import { mockVehicles } from "../mock-data";
import type { IVehicle } from "../components/Vehicles/IVehicle";

export default function useGetVehicles() {
  const getVehicles = async (): Promise<IVehicle[]> => {
    try {
      return await mockVehicles;
    } catch (error) {
      throw error;
    }
  };
  const req = useQuery({ queryKey: ["vehicles"], queryFn: getVehicles });
  return req;
}
