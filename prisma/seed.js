import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 1. 사용자 생성
  const user = await prisma.user.create({
    data: {
      email: 'test@example.com',
      nickname: '테스트유저',
      password: 'hashedpassword', // 실제 서비스에서는 bcrypt 등으로 해시된 비밀번호 사용
      image: 'https://example.com/avatar.png',
      refreshToken: 'initial-refresh-token',
    },
  });

  // 2. 상품 생성
  const product1 = await prisma.product.create({
    data: {
      name: '노트북',
      description: '고성능 개발용 노트북',
      price: 1500000,
      tags: ['전자기기', '개발'],
      userId: user.id,
    },
  });

  const product2 = await prisma.product.create({
    data: {
      name: '키보드',
      description: '기계식 키보드',
      price: 100000,
      tags: ['전자기기', '입력장치'],
      userId: user.id,
    },
  });

  // 3. 게시글 생성
  const article = await prisma.article.create({
    data: {
      title: '첫 번째 게시글',
      content: '이것은 예시 게시글입니다.',
      userId: user.id,
    },
  });

  // 4. 댓글 생성
  await prisma.comment.createMany({
    data: [
      {
        content: '좋은 상품이네요!',
        userId: user.id,
        productId: product1.id,
      },
      {
        content: '유용한 글 감사합니다.',
        userId: user.id,
        articleId: article.id,
      },
    ],
  });

  console.log('시드 데이터가 성공적으로 생성되었습니다!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });