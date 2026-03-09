import {IsArray, IsEnum, IsOptional, IsString, Matches, MinLength} from 'class-validator';
import { EUserType } from "../constants/constants";

export class CreateUsersDto {
  @IsString({ message: 'Поле Имя должно быть строкой' })
  @MinLength(3, { message: 'Поле Имя должно быть от 3 символов' })
  name: string;

  @IsOptional()
  @IsString({ message: 'Поле Биография должно быть строкой' })
  @MinLength(5, { message: 'Поле Имя должно быть от 5 символов' })
  bio?: string;

  // IsNumber({}, {message: 'Поле должно быть числом'})
  // IsInt({message: 'Поле должно быть целым числом'})
  // IsPositive({message: 'должно быть положительным числом'})


  @IsOptional()
  @IsArray( {message: 'Поле userType должно быть массивом'} )
  //@IsString({each: true, message: 'Каждый тег - должен быть строкой'}) // чтобы были одного типа
  @IsEnum(EUserType, { each: true, message: 'Недопустимое значение тега' }) // чтобы были одного типа
  userType : EUserType[]


  // @Matches (например регулярку)
  // password: string;
}
