# 프로젝트 루트 이동
cd /home/ec2-user/3-sprint-mission

# 최신코드 가져오기
git pull origin main

# 의존성 설치
npm install

# prisma 클라이언트 재생성
npx prisma generate

# 데이터베이스 마이그레이션
npx prisma migrate deploy

# 타입스크립트 빌드
npm run build

# 빌드 확인 (TypeScript 프로젝트라면)
if [ ! -d "dist" ]; then
  echo "dist 폴더가 없습니다. 빌드를 먼저 진행하세요."
  exit 1
fi

# PM2 실행
mkdir -p logs
pm2 start dist/src/main.js \
  --name my-app \
  --env production \
  --output logs/out.log \
  --error logs/err.log \
  --log-date-format "YYYY-MM-DD HH:mm:ss" \
  --instances 1 \
  --watch

# 재부팅 시 자동 실행
pm2 save
pm2 startup

# 실행 상태 확인
pm2 list