export interface ProductDto {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  tags: string[];
  createdAt: Date;
  userId: string;
}

export interface ProductWithLikeDto extends ProductDto {
  isLiked: boolean;
}

export type SimpleProductDto = Omit<ProductDto, 'tags' | 'createdAt' | 'userId'>;
export type CreateProductDto = Omit<ProductDto, 'id' | 'createdAt'>;
export type PatchProductDto = Partial<Omit<CreateProductDto, 'userId'>>;