import { PrismaClient } from '@prisma/client';

if (!global.prisma) {
  global.prisma = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
    errorFormat: 'pretty',
  });
}

const prisma = global.prisma;

export default prisma;