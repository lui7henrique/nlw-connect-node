import { redis } from "../redis/client";

interface AccessInviteLinkParams {
  subscriberId: string;
}

export async function accessInviteLink({
  subscriberId,
}: AccessInviteLinkParams) {
  await redis.hincrby("referral:access-count", subscriberId, 1); // Increment the access count for the subscriber
}
