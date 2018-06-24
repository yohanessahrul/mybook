const axios = require('axios');

const resolvers = {
  Query: {
    users: async () => {
      try {
        let userData = await axios.get(`http://localhost:3000/users/all`);
        return userData.data.data
      }
      catch(err) {
        console.log(err)
      }
    },
    statuses: async () => {
      try {
        let statusesData = await axios.get(`http://localhost:3000/statuses/allusers`, {
          headers: { token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViMmEyYjljYjk1NDYwN2E4YzYwMzBkNiIsImVtYWlsIjoieW9zYUBnbWFpbC5jb20iLCJpYXQiOjE1Mjk0OTM0NTV9.2tivadgSeZxqvNVnne1hMbaaXjxHueYWSAj0ccnfUmg` }
        })
        console.log('====>', statusesData.data.data[0].commentId)
        return statusesData.data.data
      }
      catch(err) {
        console.log(err)
      }
    },
    timeline: async () => {
      try {
        let timelineData = await axios.get(`http://localhost:3000/statuses/allusers`, {
          headers: { token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViMmEyYjljYjk1NDYwN2E4YzYwMzBkNiIsImVtYWlsIjoieW9zYUBnbWFpbC5jb20iLCJpYXQiOjE1Mjk0OTM0NTV9.2tivadgSeZxqvNVnne1hMbaaXjxHueYWSAj0ccnfUmg` }
        })
        console.log('Data timeline===>', timelineData.data.data)
        return timelineData.data.data
      }
      catch(err) {
        console.log(err)
      }
    },
  },
  Mutation: {
    login: async (_, {email, password}) => {
      try {
        let loginData = await axios.post(`http://localhost:3000/users/login`, {
          email,
          password
        }, {})
        console.log('===>', loginData.data.data)
        return loginData.data.data
      }
      catch(err) {
        console.log(err)
      }
    },
    register: async (_, {username, password, email, fullname}) => {
      try {
        let registerData = await axios.post(`http://localhost:3000/users/register`, {
          username,
          password,
          email,
          fullname
        })
        console.log('register ===>', registerData.data)
        return registerData.data
      }
      catch(err) {
        console.log(err)
      }
    }
  }
}

module.exports = resolvers;