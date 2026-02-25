import SimpleCard from "../../Utils/Cards/SimpleCard";
import type { GetSubscriptionApiResponse } from "./NotificationAdministration.api";
import { Typography } from "@mui/material";

interface Props {
  sub: GetSubscriptionApiResponse;
  onClick: (endpoint: string) => void;
  action: React.ReactNode;
}

function SubscriptionDisplayCard(props: Props) {
  const { sub } = props;

  return (
    <SimpleCard
      sx={{ minWidth: 350 }}
      title={`${sub.osName} ${sub.osVersion}`}
      action={props.action}
    >
      <Typography>{sub.navigatorName}</Typography>
    </SimpleCard>
  );
}

export default SubscriptionDisplayCard;
