import { Box, Typography } from "@mui/material";
import packagejson from "../../../package.json";

const version = packagejson.version || "x.x.x";
const versionName = import.meta.env.VITE_ENV_NAME || "No Env";

export default function VersionDisplay() {
  return (
    <Box sx={{ marginTop: 2, textAlign: "center" }}>
      <Typography variant="caption" color="text.secondary">
        Version {version} – {versionName}
      </Typography>
    </Box>
  );
}
