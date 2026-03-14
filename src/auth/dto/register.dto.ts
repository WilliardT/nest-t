import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { NAME_MAX_LENGTH, PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from "../constants/constants";
import { ApiProperty } from "@nestjs/swagger";


export class RegisterRequest {
  @ApiProperty({
    description: 'Отображаемое имя',
    example: 'Valera Petrov',
    maxLength: NAME_MAX_LENGTH
  })
  @IsString({ message: 'Имя должно быть строкой' })
  @IsNotEmpty({ message: 'Имя обязательно для заполнения' })
  @MaxLength(NAME_MAX_LENGTH, { message: `Имя не должно превышать ${NAME_MAX_LENGTH} символов`})
  name: string;


  @ApiProperty({
    description: 'Электронный почтовый адрес',
    example: 'valera@mail.ru'
  })
  @IsString({ message: 'Почте должна быть строкой' })
  @IsNotEmpty({ message: 'Почта обязательна для заполнения' })
  @IsEmail({}, { message: 'Некорректный формат электронной почты' })
  email: string;


  @ApiProperty({
    description: 'Пароль',
    example: 'valera123',
    minLength: PASSWORD_MIN_LENGTH,
    maxLength: PASSWORD_MAX_LENGTH
  })
  @IsString({ message: 'Почта должна быть строкой' })
  @IsNotEmpty({ message: 'Почта обязательна для заполнения' })
  @MinLength(
    PASSWORD_MIN_LENGTH,
    { message: `Пароль должен содержать не менее ${PASSWORD_MIN_LENGTH} символов` }
  )
  @MaxLength(
    PASSWORD_MAX_LENGTH,
    { message: `Пароль должен содержать не более ${PASSWORD_MAX_LENGTH} символов` }
  )
  @IsString()
  password: string;
}
