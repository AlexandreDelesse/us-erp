import type { GridRenderEditCellParams } from "@mui/x-data-grid";

import MutuelleAutocomplete from "./MutuelleAutocomplete";

export default function RenderMutuelleEditCell(
  params: GridRenderEditCellParams
) {
  return (
    <MutuelleAutocomplete
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
