import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('시드 데이터베이스');

  // 1. Product 생성
  const product = await prisma.product.create({
    data: {
      name: '샘플 상품',
      description: '이것은 예시 상품입니다.',
      price: 15000,
      tags: ['테스트', '신상품'],
    },
  });

  // 2. Article 생성
  const article = await prisma.article.create({
    data: {
      title: '첫 번째 게시글',
      content: '이것은 시드용 게시글입니다.',
    },
  });

  // 3. Product용 Comment 생성
  await prisma.comment.create({
    data: {
      content: '이 상품 정말 좋아요!',
      productId: product.id,
    },
  });

  // 4. Article용 Comment 생성
  await prisma.comment.create({
    data: {
      content: '좋은 글 잘 읽었습니다.',
      articleId: article.id,
    },
  });

  console.log('시드완료');
}

main()
  .catch((error) => {
    console.error('시드에러', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });