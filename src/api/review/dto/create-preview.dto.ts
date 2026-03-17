import { IsInt, IsNumber, IsString, Max, Min } from "class-validator";


export class CreatePreviewDto {
  @IsString()
  text: string;

  @IsNumber()
  @Min(0)
  @Max(10)
  rating: number;

  @IsInt()
  @Min(1)
  movieId: number;
}
