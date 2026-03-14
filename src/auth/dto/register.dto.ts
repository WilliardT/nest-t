import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { NAME_MAX_LENGTH, PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from "../constants/constants";


export class RegisterRequest {
  @IsString({ message: 'Имя должно быть строкой' })
  @IsNotEmpty({ message: 'Имя обязательно для заполнения' })
  @MaxLength(NAME_MAX_LENGTH, { message: `Имя не должно превышать ${NAME_MAX_LENGTH} символов`})
  name: string;

  @IsString({ message: 'Почте должна быть строкой' })
  @IsNotEmpty({ message: 'Почта обязательна для заполнения' })
  @IsEmail({}, { message: 'Некорректный формат электронной почты' })
  email: string;

  @IsString({ message: 'Почте должна быть строкой' })
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
