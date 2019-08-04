import { Ctx, Query, Resolver } from "type-graphql";

import { IContext } from "../";
import { User } from "../../models/user";
import { Book } from "../entities/book";

const books = [
  {
    title: "Harry Potter and the Chamber of Secrets",
    author: "J.K. Rowling",
  },
  {
    title: "Jurassic Park",
    author: "Michael Crichton",
  },
];
@Resolver(_of => Book)
export class BookResolver {
  @Query(_returns => [Book])
  async books(@Ctx() { UserRepository }: IContext) {
    const a = new User();
    a.firstName = "firstname";
    a.lastName = "lastname";
    a.age = 10;

    await UserRepository.save(a);

    const b = await UserRepository.findOne({
      where: {
        age: 10,
      },
    });

    if (b) {
      console.log("b", b);
      console.log("b.firstName", b.firstName);
    }
    return books;
  }
}
