import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  try {
    const userCount = await prisma.user.count()
    console.log('User count:', userCount)
    const users = await prisma.user.findMany({ take: 1 })
    console.log('Sample user:', users)
  } catch (e) {
    console.error('Database connection error:', e)
  } finally {
    await prisma.$disconnect()
  }
}

main()
