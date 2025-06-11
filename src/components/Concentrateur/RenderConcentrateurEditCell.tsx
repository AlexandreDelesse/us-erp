import type { GridRenderEditCellParams } from "@mui/x-data-grid";
import ConcentrateurAutocomplete from "./ConcentrateurAutocomplete";

export default function RenderConcentrateurEditCell(
  params: GridRenderEditCellParams
) {
  return (
    <ConcentrateurAutocomplete
      value={params.value ?? null}
      onChange={(newValue) => {
        params.api.setEditCellValue({
          id: params.id,
          field: params.field,
          value: newValue,
        });
      }}
    />
  );
}
