import { useQuery } from "@tanstack/react-query";

import type { Vehicle } from "../components/Vehicles/IVehicle";
import { mockVehicles } from "../mock-data";

export default function useGetVehicles() {
  const getVehicles = async (): Promise<Vehicle[]> => {
    try {
      return await mockVehicles;
    } catch (error) {
      throw error;
    }
  };
  const req = useQuery({ queryKey: ["vehicles"], queryFn: getVehicles });
  return req;
}
