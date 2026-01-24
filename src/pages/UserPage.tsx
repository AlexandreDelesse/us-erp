import { Box, Divider, Tab, Tabs, Typography } from "@mui/material";

import UserList from "../components/User/UserList";

export default function UserPage() {
  // const [activeTab, setActiveTab] = useState(0);
  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Typography fontSize={24} variant="body1">
          Utilisateurs
        </Typography>
        <Divider sx={{ width: "100%" }} />
      </Box>

      <UserList />
    </>
  );
}
