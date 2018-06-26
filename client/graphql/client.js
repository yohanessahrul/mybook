import { gql } from 'apollo-boost';

export const GET_ALL_STATUS = gql`
query {
  statuses {
    status
    userId {
      username
      fullname
    }
    commentId
  }
}
`

export const GET_ALL_USERS = gql`
query {
  users {
    username
    email
    fullname
  }
}
`

export const LOGIN_USER = gql`
mutation login($email:String, $password:String) {
  login(email: $email, password: $password)
}
`

