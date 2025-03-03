import { faker } from "@faker-js/faker";
import { db } from "../client";
import { subscriptions } from "../schema/subscriptions";
import { redis } from "../../redis/client";

async function seed() {
  console.log("🌱 Starting seeding...");

  try {
    // First batch without referrers (initial subscribers)
    const initialSubscribers = Array.from({ length: 5 }, () => ({
      name: faker.person.fullName(),
      email: faker.internet.email(),
    }));

    const [firstBatch] = await db
      .insert(subscriptions)
      .values(initialSubscribers)
      .returning();

    console.log("✅ Created initial subscribers");

    // Second batch with referrers
    const subscribersWithReferrers = Array.from({ length: 15 }, () => {
      const referrerId = firstBatch.id; // Use one of the initial subscribers as referrer
      return {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        referrerId,
      };
    });

    await db.insert(subscriptions).values(subscribersWithReferrers);

    // Update Redis referral ranking
    await Promise.all(
      subscribersWithReferrers.map((sub) =>
        redis.zincrby("referral:ranking", 1, sub.referrerId)
      )
    );

    console.log("✅ Created subscribers with referrers and updated Redis ranking");
    console.log("✅ Seeding completed successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    await Promise.all([db.$client.end(), redis.quit()]);
  }
}

seed(); 