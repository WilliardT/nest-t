import { Type } from "class-transformer";
import {
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";


export class CreateMovieDto {
  @ApiProperty({
    description: 'Название фильма',
    example: '8 miles',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Год релиза',
    example: 1988,
    type: Number
  })
  @IsNotEmpty()
  @IsInt()
  @Min(1888)
  @Max(new Date().getFullYear())
  releaseYear: number;

  @ApiPropertyOptional({
    description: 'Ссылка на постер фильма',
    example: 'https://storage.example.com/posters/123345.jpg',
    type: String,
  })
  @IsOptional()
  @IsString()
  imageUrl?: string

  @ApiProperty({
    description: 'Массив ID актёров',
    example: ['1', '2', '3'],
    type: [String]
  })
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @Type(() => Number)
  @IsInt({ each: true })
  @Min(1, { each: true })
  actorIds: number[]
}
