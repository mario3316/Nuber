// import { GraphQLSchema } from "graphql";
import { makeExecutableSchema } from "graphql-tools";
import { fileLoader, mergeResolvers, mergeTypes } from "merge-graphql-schemas";
import path from "path";

const allTypes: any = fileLoader(path.join(__dirname, "./api/**/*.graphql"));

const allResolvers: any = fileLoader(
  path.join(__dirname, "./api/**/*.resolvers.*")
);

const mergedTypes: any = mergeTypes(allTypes);
const mergedResolvers: any = mergeResolvers(allResolvers);
// api 폴더의 모든 type 들과 resolver들을 묶어줌( 연결시켜줌 )

const schema = makeExecutableSchema({
  typeDefs: mergedTypes,
  resolvers: mergedResolvers
});
// 묶은 type과 resolver들로 schema를 생성

export default schema;
