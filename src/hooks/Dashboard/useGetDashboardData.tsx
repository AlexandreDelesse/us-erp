import useGetVehicles from "../useGetVehicles";

export default function useGetDashboardData() {
  const vehicles = useGetVehicles();

  if (!vehicles.data) return;

  const vehicleNumberByDepartment = {
    ambulance: vehicles.data.filter((v) => v.Fonction === "ambulance").length,
    funeraire: vehicles.data.filter((v) => v.Fonction === "funeraire").length,
    marbredie: vehicles.data.filter((v) => v.Fonction === "marbrerie").length,
  };
  return { isLoading: vehicles.isLoading, vehicleNumberByDepartment };
}
