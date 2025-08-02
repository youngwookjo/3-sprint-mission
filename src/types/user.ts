export interface UserDto {
  id: string;
  email: string;
  nickname: string;
  image?: string;
  password: string;
  refreshToken?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PatchUserDto {
  nickname?: string;
  image?: string;
  password?: string;
  refreshToken?: string;
} 

export type CreateUserDto = Omit<UserDto, 'id' | 'createdAt' | 'updatedAt' | 'refreshToken'>;
export type filterSensitiveUserData = Omit<UserDto, 'password' | 'refreshToken' | 'createdAt' | 'updatedAt'>;