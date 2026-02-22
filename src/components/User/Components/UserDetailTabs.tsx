import { Box, Tab, Tabs } from "@mui/material";

interface Props {
  tab: number;
  setTab: (i: number) => void;
}

function UserDetailTabs(props: Props) {
  const { tab, setTab } = props;

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
      <Tabs
        value={tab}
        onChange={(_e, index) => setTab(index)}
        aria-label="basic tabs example"
      >
        <Tab label="Information" />
        <Tab label="Notifications" />
      </Tabs>
    </Box>
  );
}

export default UserDetailTabs;
