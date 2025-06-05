import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('test', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'contact@luxeloc.fr' },
    update: {},
    create: {
      email: 'contact@luxeloc.fr',
      name: 'Administrateur',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  console.log('Admin créé avec succès:', { email: admin.email, role: admin.role });
}

main()
  .catch((e) => {
    console.error('Erreur lors de la création de l\'admin:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 