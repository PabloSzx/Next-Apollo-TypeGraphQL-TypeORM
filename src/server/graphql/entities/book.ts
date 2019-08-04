import { Field, ObjectType } from "type-graphql";



@ObjectType()
export class Book {
  @Field(type => String)
  title!: string;

  @Field(type => String)
  author!: string;
}
