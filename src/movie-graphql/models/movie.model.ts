import { Field, ObjectType } from "@nestjs/graphql";


@ObjectType()
export class MovieModel {
  @Field(() => Number)
  id: number

  @Field(() => String)
  title: string
}
