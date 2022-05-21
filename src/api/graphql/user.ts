import { gql } from "@apollo/client";

export const LoginMutation = gql`
  mutation Login($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      message
      status
    }
  }
`;

export const LogoutMutation = gql`
  mutation Logout($email: String!) {
    logout(email: $email) {
      message
      status
    }
  }
`;

export const Me = gql`
  query Me {
    me {
      ... on EntityResult {
        messages
      }
      ... on User {
        id
        email
        citizen {
          names
          dni
          fr_lastname
          mr_lastname
        }
      }
    }
  }
`;
