import { Button, Stack, Typography } from "@mui/material";
import ErrorHandler from "../../Utils/Error/ErrorHandler";
import LogoLoader from "../../Utils/LogoLoader";
import useGetSubscriptions from "./useGetSubscriptions";
import SubscriptionDisplayCard from "./SubscriptionDisplayCard";
import type { PostNotificationApiRequest } from "./NotificationAdministration.api";
import useNotifyUserDevices from "./useNotifyUserDevices";

interface Props {
  userId?: string;
}

function SubscriptionList(props: Props) {
  const { userId } = props;
  const { query, subscriptions } = useGetSubscriptions(userId);
  const { notifyMutation } = useNotifyUserDevices();

  if (query.isLoading) return <LogoLoader />;
  if (query.isError) return <ErrorHandler error={query.error} />;

  const sendTestNotification = () => {
    const payload: PostNotificationApiRequest = {
      title: "Notification de test !",
      message: "A ne pas prendre en compte :)",
      userIds: [userId!],
    };
    notifyMutation.mutate(payload);
  };

  if (!subscriptions.length)
    return (
      <Typography textAlign={"center"}>
        Notifications activées sur aucun device
      </Typography>
    );

  return (
    <>
      <Stack spacing={2} direction="row">
        {subscriptions.map((sub) => (
          <SubscriptionDisplayCard sub={sub} />
        ))}
      </Stack>
      <Button
        disabled={notifyMutation.isPending}
        variant="contained"
        sx={{ my: 2 }}
        onClick={sendTestNotification}
      >
        Test notifications
      </Button>
    </>
  );
}

export default SubscriptionList;
