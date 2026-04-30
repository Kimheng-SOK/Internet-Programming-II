import { GraphQLScalarType, Kind } from 'graphql';

export const DateTimeScalar = new GraphQLScalarType({
  name: 'DateTime',
  description: 'ISO-8601 date time scalar',
  serialize(value: unknown) {
    if (value instanceof Date) return value.toISOString();
    return new Date(String(value)).toISOString();
  },
  parseValue(value: unknown) {
    return new Date(String(value));
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) return new Date(ast.value);
    return null;
  },
});
