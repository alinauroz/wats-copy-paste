import { gql } from 'graphql-tag';
import projectTypedefs from './project';

const typeDefs = gql`
  scalar Date

  type Bin {
    id: ID
    i_id: String
    text: String
    createOn: Date
  }

  type Query {
    bin(id: ID!): Bin
  }
  type Mutation {
    createBin(texts: [String!]): [Bin]
  }

  ${projectTypedefs}
`;

export default typeDefs;
