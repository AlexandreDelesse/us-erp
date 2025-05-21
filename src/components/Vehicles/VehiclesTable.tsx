// VehicleTable.tsx with DataGrid
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { Paper } from "@mui/material";
import useGetVehicles from "../../hooks/useGetVehicles";
import { frFR } from "@mui/x-data-grid/locales";

export default function VehicleTable() {
  const { isLoading, isError, data = [] } = useGetVehicles();

  if (isLoading) return <>Loading...</>;
  if (isError) return <>Error!</>;

  const columns: GridColDef[] = [
    { field: "immat", headerName: "Immat", width: 130 },
    { field: "brand", headerName: "Brand", width: 130 },
    { field: "model", headerName: "Model", width: 130 },
    { field: "year", headerName: "Year", width: 100, type: "number" },
    {
      field: "mileage",
      headerName: "Mileage (km)",
      width: 140,
      type: "number",
      renderCell: (params) => params.value.toLocaleString(),
    },
    { field: "status", headerName: "Status", width: 130 },
    {
      field: "purchasePrice",
      headerName: "Purchase Price (€)",
      width: 170,
      type: "number",
      renderCell: (params) => `${params.value.toLocaleString()} €`,
    },
    { field: "purchaseDate", headerName: "Purchase Date", width: 150 },
    { field: "department", headerName: "Department", width: 130 },
  ];

  return (
    <Paper sx={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        getRowId={(row) => row.id}
        disableRowSelectionOnClick
        localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
        showToolbar
        initialState={{
          filter: {
            filterModel: {
              items: [],
            },
          },
        }}
      />
    </Paper>
  );
}
