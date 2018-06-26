import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import HomeScreen from './pages/HomeScreen';
import LoginScreen from './pages/LoginScreen';
import RegisterScreen from './pages/RegisterScreen';
import MainScreen from './pages/MainScreen';
import ProfileScreen from './pages/ProfileScreen';
import FriendScreen from './pages/FriendScreen';
import DetailStatusScreen from './pages/DetailStatusScreen';

import { ApolloClient } from "apollo-client";
import { ApolloLink } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http'
import { ApolloProvider } from 'react-apollo';

const RootStack = createStackNavigator({
  Home: {
    screen: LoginScreen,
    navigationOptions: {
      header: null
    }
  },
  // Login: {
  //   screen: LoginScreen,
  //   navigationOptions: {
  //     header: null
  //   }
  // },
  Register: {
    screen: RegisterScreen,
    navigationOptions: {
      header: null
    }
  },
  Main: {
    screen: MainScreen,
    navigationOptions: {
      header: null
    }
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      header: null
    }
  },
  Friend: {
    screen: FriendScreen,
    navigationOptions: {
      header: null
    }
  },
  DetailStatus: {
    screen: DetailStatusScreen,
    navigationOptions: {
      header: null
    }
  }
}, {
  initialRouteName: 'Home',
  // headerMode: "none",
});

const client = new ApolloClient({
  link: new HttpLink({ uri: "http://35.240.251.226:3000/graphql" }),
  cache: new InMemoryCache()
})

export default class App extends React.Component {
  constructor() {
    super()
    this.state ={
      token: null
    }
  }

  async componentDidMount() {
    const token = await AsyncStorage.getItem('token')
    this.setState({token})
    console.log('===============>', token)
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <RootStack/>
      </ApolloProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
