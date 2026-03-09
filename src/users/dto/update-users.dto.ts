import { IsOptional, IsString, MinLength } from "class-validator";


export class UpdateUsersDto {
  @IsOptional()
  @IsString({ message: 'Поле Имя должно быть строкой' })
  @MinLength(3, { message: 'Поле Имя должно быть от 3 символов' })
  name?: string;

  @IsOptional()
  @IsString({ message: 'Поле Биография должно быть строкой' })
  @MinLength(5, { message: 'Поле Биография должно быть от 5 символов' })
  bio?: string;
}
