import { Field, InputType, Int } from "@nestjs/graphql";
import {
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
  MinLength
} from "class-validator";


@InputType()
export class CreateMovieInput {

  @Field(() => String)
  @IsString()
  @MinLength(1)
  title: string;

  @Field(() => Int)
  @IsInt()
  @Min(1888)
  @Max(new Date().getFullYear())
  releaseYear: number;

  @Field(
    () => String,
    { nullable: true }
  )
  @IsOptional()
  @IsString()
  imageUrl?: string

  @Field(() => [Int])
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsInt({ each: true })
  @Min(1, { each: true })
  actorIds: number[]
}
