import { GqlModuleOptions } from "@nestjs/graphql";
import { ApolloDriver } from "@nestjs/apollo";
import { join } from 'path';


export async function getGraphqlConfig(): Promise<GqlModuleOptions> {
  return {
    driver: ApolloDriver,
    autoSchemaFile: join(process.cwd(), 'src/movie-graphql/schema.gql'),
    sortSchema: true
  }
}
