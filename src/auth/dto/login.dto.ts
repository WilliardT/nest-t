import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from "../constants/constants";


export class LoginRequest {
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
