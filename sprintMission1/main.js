import { Product } from './models/Product.js';
import { ElectronicProduct } from './models/ElectronicProduct.js';
import { Article } from './models/Article.js';
import PS from './service/ProductService.js';
import AS from './service/ArticleService.js';

async function main() {
   // ProductService 테스트
   try {
      // 상품 목록 조회
      const getProductList = await PS.getProductList();
      console.log('상품 목록:', getProductList);

      // 상품 상세 조회
      const getProduct = await PS.getProduct(864);
      console.log('상품 상세:', getProduct);

      // 상품 생성
      const newProduct = await PS.createProduct({
         name: '새로운 상품',
         price: 10000,
         description: '상품 설명',
         tags: '전자제품,백색가전',
         images: "https://example.com/image.jpg",
      });
      console.log('생성된 상품:', newProduct);

      // 상품 수정
      const updatedProduct = await PS.patchProduct(864, {
         price: 12000,
         tags: '가전제품',
      });
      console.log('수정된 상품:', updatedProduct);

      // 상품 삭제
      const deleteProduct = await PS.deleteProduct(864);
      console.log('삭제 응답:', deleteProduct);
   } catch (error) {
      console.error('상품 처리 중 에러 발생:', error.message);
   }

   // 상품 인스턴스 변환 테스트
   try {
      const products = await PS.getProductList();
      const productList = [];

      for (const product of products.list) {
         const instance = (product.tags.includes('#전자제품') || product.tags.includes('전자제품'))
            ? new ElectronicProduct(product)
            : new Product(product);
         productList.push(instance);
      }

      console.log('상품 인스턴스 목록:', productList);
   } catch (error) {
      console.error('상품 인스턴스 생성 중 에러 발생:', error.message);
   }

   // ArticleService 테스트
   try {
      // 게시글 목록 조회
      const getArticleList = await AS.getArticleList(1, 10);
      console.log('게시글 목록:', getArticleList);

      // 게시글 상세 조회
      const getArticle = await AS.getArticle(1380);
      console.log('게시글 상세:', getArticle);

      // 게시글 생성
      const createArticle = await AS.createArticle({
         articleData: {
            title: '새로운 게시글',
            content: '게시글 내용',
            image: 'https://example.com/...',
         },
      });
      console.log('생성된 게시글:', createArticle);

      // 게시글 수정
      const patchArticle = await AS.patchArticle(1515, {
         title: '수정된 게시글 제목',
         content: '수정된 게시글 내용',
      });
      console.log('수정된 게시글:', patchArticle);

      // 게시글 삭제
      const deleteArticle = await AS.deleteArticle(1515);
      console.log('삭제된 게시글 응답:', deleteArticle);

      // 게시글 인스턴스 생성
      for (const article of getArticleList.list) {
         const instance = new Article(article);
         console.log('게시글 인스턴스:', instance);
      }
   } catch (error) {
      console.error('게시글 처리 중 에러 발생:', error.message);
   }
}

main();