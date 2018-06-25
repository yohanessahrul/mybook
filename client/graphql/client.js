import { gql } from 'apollo-boost';

export const GET_ALL_STATUS = gql`
query {
  statuses {
    status
    userId
  }
}
`

export const GET_ALL_USERS = gql`
query {
  users {
    username
    password
    email
    fullname
  }
}
`