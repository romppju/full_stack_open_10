import { gql } from '@apollo/client';

export const GET_TOKEN = gql`
  mutation getToken($credentials: AuthenticateInput!) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`;

export const CREATE_USER = gql`
  mutation newUser($user: CreateUserInput!) {
    createUser(user: $user) {
      createdAt
      id
      reviewCount
      username
    }
  }
`;

export const DELETE_REVIEW = gql`
  mutation removeReview($id: ID!) {
    deleteReview(id: $id)
  }
`;

export const CREATE_REVIEW = gql`
  mutation review($review: CreateReviewInput!) {
    createReview(review: $review) {
      createdAt
      id
      rating
      repositoryId
      text
      userId
    }
  }
`;
