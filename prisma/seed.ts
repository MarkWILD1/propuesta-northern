import { hash } from "bcryptjs";

import { defaultLandingPageCreateData, HOME_SLUG } from "../lib/default-content";
import { prisma } from "../lib/prisma";

async function main() {
  const email = (process.env.ADMIN_EMAIL ?? "admin@northern.edu").toLowerCase();
  const password = process.env.ADMIN_PASSWORD ?? "change-this-password";
  const passwordHash = await hash(password, 12);

  await prisma.adminUser.upsert({
    where: { email },
    update: {
      passwordHash,
      passwordPlain: password,
      name: "Colegio Northern Admin",
    },
    create: {
      email,
      passwordHash,
      passwordPlain: password,
      name: "Colegio Northern Admin",
    },
  });

  await prisma.landingPage.upsert({
    where: { slug: HOME_SLUG },
    update: {},
    create: defaultLandingPageCreateData(),
  });

  console.log(`Seeded admin user: ${email}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
