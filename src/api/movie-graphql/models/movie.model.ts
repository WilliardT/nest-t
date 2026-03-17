import { Field, ObjectType } from "@nestjs/graphql";
import { BaseModel } from "./base.model";


@ObjectType({
  description: 'movie model',
})
export class MovieModel extends BaseModel {
  @Field(() => Number)
  id: number

  @Field(() => String)
  uuid: string

  @Field(
    () => String,
    {
      defaultValue: 'FILM_TITLE',
      description: 'Название фильма'
    }
  )
  title: string
}
