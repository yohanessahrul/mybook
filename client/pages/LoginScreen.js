import React, { Component } from 'react';
import {
    Container,
    Content,
    Button,
    Text,
    Form,
    Item,
    Input,
    Label
} from 'native-base';
import {
  StyleSheet,
  View,
  StatusBar,
  TextInput,
  AsyncStorage,
} from 'react-native';
import Headers from '../components/headers';
import { Constants } from 'expo';
import gql from "graphql-tag";
import { Mutation } from 'react-apollo';
import { graphql } from 'react-apollo';

const LOGIN_USER = gql`
mutation login($email:String, $password:String) {
    login(email: $email, password: $password)
}
`

class LoginScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            email: '',
            password: ''
        };
    }
    
    async componentWillMount() {
        await Expo.Font.loadAsync({
          'Roboto': require('native-base/Fonts/Roboto.ttf'),
          'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        });
        this.setState({ loading: false });
    }

    handleLogin = async() => {
        try {
            let result = await this.props.mutate({
                variables: {
                    email: this.state.email,
                    password: this.state.password
                }
            })
            console.log(result.data.login)
            await AsyncStorage.setItem('token', result.data.login)
            
            if (result.data.login) {
                this.props.navigation.navigate('Main');
            }
        }
        catch(err) {
            console.log(err)
        }
    }

    render() {
        console.log(this.state)
        if (this.state.loading) {
          return <Expo.AppLoading />;
        }


        return (
            // <Mutation mutation={LOGIN_USER}>
            //     {loginUser => (
                <Container>
                    <View style={styles.statusBar} />
                    <Headers/>
                    <Content style={styles.pad10}>
                            <Form>
                                <Item last>
                                    <Label>Email</Label>
                                    <Input
                                        onChangeText={(text) => {this.setState({email: text}) }  }
                                    />
                                </Item>
                                <Item last>
                                    <Label>Password</Label>
                                    <Input
                                        onChangeText={(text) => this.setState({password: text}) }
                                    />
                                </Item>
                                <Button
                                    block style={styles.btnLogin}>
                                    <Text onPress={ this.handleLogin } >Login</Text>
                                </Button>
                                <Button block transparent dark style={styles.btnRegistrasi}>
                                    <Text>Register</Text>
                                </Button>
                            </Form>
                    </Content>
                </Container>
            //     )}
            // </Mutation>
        );
    }
}

const styles = StyleSheet.create({
    statusBar: {
      backgroundColor: "#294493",
      height: Constants.statusBarHeight,
    },
    pad10: {
      marginLeft: 15,
      marginRight: 15
    },
    formLogin: {
      marginTop: 150
    },
    items: {
      marginLeft: 10,
      marginRight: 10,
      paddingLeft: 5
    },
    btnLogin: {
      marginTop: 40
    },
    btnRegistrasi: {
      marginTop: 10
    }
  });

export default graphql(LOGIN_USER)(LoginScreen);