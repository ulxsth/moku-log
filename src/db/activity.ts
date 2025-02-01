import { PrismaClient, Prisma } from "@prisma/client";

export async function saveActivity(data: Prisma.ActivityCreateInput) {
  const prisma = new PrismaClient();
  const newActivity = await prisma.activity.create({data});
  await prisma.$disconnect();
  return newActivity;
}
