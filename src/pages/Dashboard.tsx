import { Box } from "@mui/material";

import TotalVehicleType from "../components/Dashboard/TotalVehicleType";
import useGetDashboardData from "../hooks/Dashboard/useGetDashboardData";

export default function Dashboard() {
  const dashboard = useGetDashboardData();

  if (dashboard?.isLoading) return <>loading</>;
  if (!dashboard?.vehicleNumberByDepartment) return null;

  return (
    <Box>
      <TotalVehicleType
        v1={dashboard.vehicleNumberByDepartment.ambulance}
        v2={dashboard.vehicleNumberByDepartment.funeraire}
        v3={dashboard.vehicleNumberByDepartment.marbredie}
      />
    </Box>
  );
}
