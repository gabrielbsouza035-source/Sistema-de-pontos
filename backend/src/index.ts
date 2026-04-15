import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const app = express();

  app.use(cors());        
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get('/users', async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
  });

  app.post('/users', async (req, res) => {
    const { name, email } = req.body;
    const user = await prisma.user.create({
      data: { name, email },
    });
    res.json(user);
  });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });