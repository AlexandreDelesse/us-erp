import useGetVehicles from "../useGetVehicles";

export default function useGetDashboardData() {
  const vehicles = useGetVehicles();

  if (!vehicles.data) return;

  const vehicleNumberByDepartment = {
    ambulance: vehicles.data.filter((v) => v.department === "ambulance").length,
    funeraire: vehicles.data.filter((v) => v.department === "funeraire").length,
    marbredie: vehicles.data.filter((v) => v.department === "marbrerie").length,
  };
  return { isLoading: vehicles.isLoading, vehicleNumberByDepartment };
}
