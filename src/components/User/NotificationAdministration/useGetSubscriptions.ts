import { useQuery } from "@tanstack/react-query";
import { getSubscriptionsByUserId } from "./NotificationAdministration.api";

function useGetSubscriptions(userId?: string) {
  const query = useQuery({
    queryKey: ["SUBSCRIPTIONS", userId],
    queryFn: () => getSubscriptionsByUserId(userId),
  });

  return {
    subscriptions: query.data ?? [],
    query,
  };
}

export default useGetSubscriptions;
