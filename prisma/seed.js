import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // 유저 생성
  const user = await prisma.user.create({
    data: {
      email: 'test@example.com',
      nickname: '테스터',
      image: null,
      password: 'hashed_password',
    },
  });
  // 상품 생성
  const product = await prisma.product.create({
    data: {
      name: '멋진 상품',
      description: '이건 정말 멋진 상품입니다.',
      price: 5000,
      tags: ['테스트', '인기'],
      userId: user.id,
    },
  });

  // 게시글 생성
  const article = await prisma.article.create({
    data: {
      title: '첫 게시글',
      content: '내용이 매우 알차요.',
      userId: user.id,
    },
  });

  // 댓글 생성 (상품에)
  await prisma.comment.create({
    data: {
      content: '이 상품 정말 좋아요!',
      productId: product.id,
      userId: user.id,
    },
  });

  // 댓글 생성 (게시글에)
  await prisma.comment.create({
    data: {
      content: '이 게시글 정말 유익해요!',
      articleId: article.id,
      userId: user.id,
    },
  });

  // 좋아요 (상품)
  await prisma.productLike.create({
    data: {
      userId: user.id,
      productId: product.id,
    },
  });

  // 좋아요 (게시글)
  await prisma.articleLike.create({
    data: {
      userId: user.id,
      articleId: article.id,
    },
  });

  console.log('🌱 시드 데이터 삽입 완료!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });