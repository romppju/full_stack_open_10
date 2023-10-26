import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          id
          fullName
          description
          language
          forksCount
          stargazersCount
          ratingAverage
          reviewCount
          ownerAvatarUrl
        }
      }
    }
  }
`;

export const GET_USER = gql`
  query {
    me {
      id
      username
    }
  }
`;

/*
const typeDefs = `
type Repository {
    id: ID!
    name: string!
    ownerName: string!
    createdAt: string!
    fullName: string!
    reviewCount: Int!
    ratingAverage: Int!
    forksCount: Int!
    stargazersCount: Int!
    description: String!
    language: String!
    ownerAvatarUrl: String!
}

type Query {
    allRepositories: [Repository!]!
}
`
*/
