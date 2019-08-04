import { Query, Resolver } from "type-graphql";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

import { User } from "../../entities/user";

@Resolver(_of => User)
export class UserResolver {
  constructor(
    @InjectRepository(User) private readonly UserRepository: Repository<User>
  ) {}

  @Query(_returns => [User])
  async users() {
    const a = new User();
    a.firstName = "firstname";
    a.lastName = "lastname";
    a.age = 10;

    await this.UserRepository.save(a);

    return await this.UserRepository.find();
  }
}
