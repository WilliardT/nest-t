import { Field, ObjectType } from "@nestjs/graphql";


@ObjectType({
  description: 'base model with base fields',
  isAbstract: true // true если описывается класс который унаследуется много раз
})
export  class BaseModel {
  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
