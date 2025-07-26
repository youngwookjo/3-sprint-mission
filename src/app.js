//환경변수 로딩
import dotenv from 'dotenv';
dotenv.config();
// 프레임워크,외부 라이브러리
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
//미들웨어 & 설정
import corsOptions from './config/corsOptions.js';
import { errorHandler } from './middlewares/errorHandler.js';
//내부 라우터
import userRouter from './routes/userRouter.js';
import productRouter from './routes/productRouter.js';
import { productCommentRouter, freeCommentRouter } from './routes/commentRouter.js';
import articleRouter from './routes/articleRouter.js';
import uploadImageRouter from './routes/uploadImageRouter.js';
import authRouter from './routes/authRouter.js';


const app = express();
const PORT = process.env.PORT || 3000;

//기본 미들웨어
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
//정적 파일 제공
app.use('/files', express.static('uploads'));
//라우터
app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/products', productRouter);
app.use('/articles', articleRouter);
app.use('/product-comments', productCommentRouter);
app.use('/freeBoard-comments', freeCommentRouter);
app.use('/upload', uploadImageRouter);
//에러 핸들러
app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`서버가 ${PORT} 포트에서 실행 중입니다.`);
});