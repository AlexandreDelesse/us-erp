import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import KcUserList from "../components/User/KcUserList";
import UsersMapList from "../components/User/UsersMapList";
import UserList from "../components/User/UserList";

export default function UserPage() {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={activeTab}
          onChange={(_e, t) => setActiveTab(t)}
          aria-label="basic tabs example"
        >
          <Tab label="Utilisateurs Keycloak" />
          <Tab label="Mappages Urgence Sante" />
          <Tab label="Utilisateurs" />
        </Tabs>
      </Box>

      {activeTab == 0 && <KcUserList />}
      {activeTab == 1 && <UsersMapList />}
      {activeTab == 2 && <UserList />}
    </>
  );
}
