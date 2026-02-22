import SimpleCard from "../../Utils/Cards/SimpleCard";
import type { GetSubscriptionApiResponse } from "./NotificationAdministration.api";
import { Typography } from "@mui/material";

interface Props {
  sub: GetSubscriptionApiResponse;
}

function SubscriptionDisplayCard(props: Props) {
  const { sub } = props;

  return (
    <SimpleCard sx={{ minWidth: 250 }} title={`${sub.osName} ${sub.osVersion}`}>
      <Typography>{sub.navigatorName}</Typography>
    </SimpleCard>
  );
}

export default SubscriptionDisplayCard;
