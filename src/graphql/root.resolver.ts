import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class RootResolver {
  @Query(() => String)
  hello(): string {
    return 'Hello World!';
  }
}
