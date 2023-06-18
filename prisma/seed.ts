import prisma from "../lib/prisma";

async function main() {
  const response = await Promise.all([
    prisma.users.upsert({
      where: { email: "mail@ihoey.com" },
      update: {},
      create: {
        name: "Ihoey",
        email: "mail@ihoey.com",
        image: "https://pbs.twimg.com/profile_images/1506792347840888834/dS-r50Je_400x400.jpg",
      },
    }),
    prisma.users.upsert({
      where: { email: "mujin@ihoey.com" },
      update: {},
      create: {
        name: "Mujin",
        email: "mujin@ihoey.com",
        image: "https://pbs.twimg.com/profile_images/1506792347840888834/dS-r50Je_400x400.jpg",
      },
    }),
  ]);
  console.log(response);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
