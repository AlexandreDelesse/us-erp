import { notificationClient } from "../../../api/client";

export interface GetSubscriptionApiResponse {
  id: number;
  userId: string;
  endpoint: string;
  auth: string;
  p256dh: string;
  navigatorName: string;
  osName: string;
  osVersion: string;
  createdDate: string;
  lastUsed: string;
}
export const getSubscriptionsByUserId = async (
  userId?: string,
): Promise<GetSubscriptionApiResponse[]> => {
  return (await notificationClient.get(`Subscription/${userId}`)).data;
};

export interface PostNotificationApiRequest {
  userIds: string[];
  title: string;
  message: string;
}
export const sendNotificationOnUserDevices = async (
  payload: PostNotificationApiRequest,
) => (await notificationClient.post("Notifications/notifyByIds", payload)).data;
