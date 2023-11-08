import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query getRepositories(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
    ) {
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
          url
        }
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  query getById($id: ID!, $first: Int, $after: String) {
    repository(id: $id) {
      id
      fullName
      description
      language
      forksCount
      stargazersCount
      ratingAverage
      reviewCount
      ownerAvatarUrl
      url
      reviews(first: $first, after: $after) {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
          cursor
        }
        pageInfo {
          endCursor
          hasNextPage
          startCursor
        }
      }
    }
  }
`;

export const GET_USER = gql`
  query getCurrentUser($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            createdAt
            id
            rating
            repository {
              fullName
              id
            }
            text
            userId
          }
        }
      }
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
