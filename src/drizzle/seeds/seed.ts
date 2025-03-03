import { faker } from '@faker-js/faker'
import { redis } from '../../redis/client'
import { db } from '../client'
import { subscriptions } from '../schema/subscriptions'

async function seed() {
  console.log('🌱 Starting seeding...')

  try {
    // Create 3 initial subscribers
    const initialSubscribers = Array.from({ length: 3 }, () => ({
      name: faker.person.fullName(),
      email: faker.internet.email(),
    }))

    const initialUsers = await db
      .insert(subscriptions)
      .values(initialSubscribers)
      .returning()

    console.log('✅ Created initial subscribers')

    // Create referrals with different distribution
    const referralDistribution = [
      { referrerId: initialUsers[0].id, count: 3 }, // First user gets 3 referrals
      { referrerId: initialUsers[1].id, count: 2 }, // Second user gets 2 referrals
      { referrerId: initialUsers[2].id, count: 1 }, // Third user gets 1 referral
    ]

    for (const { referrerId, count } of referralDistribution) {
      const referredSubscribers = Array.from({ length: count }, () => ({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        referrerId,
      }))

      await db.insert(subscriptions).values(referredSubscribers)

      // Update Redis referral ranking
      await redis.zincrby('referral:ranking', count, referrerId)

      // Simulate random clicks on invite links (between 1-5 clicks per referral)
      const clicks = faker.number.int({ min: 1, max: 5 })
      await redis.hincrby('referral:access-count', referrerId, clicks)
    }

    console.log('✅ Created subscribers with referrers')
    console.log('✅ Updated Redis ranking and click counts')
    console.log('✅ Seeding completed successfully!')
  } catch (error) {
    console.error('❌ Error seeding database:', error)
  } finally {
    await Promise.all([db.$client.end(), redis.quit()])
  }
}

seed()
