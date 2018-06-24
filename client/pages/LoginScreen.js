import React, { Component } from 'react';
import { Container, Content, Button, Text, Form, Item, Input, Label } from 'native-base';
import {
  StyleSheet,
  View,
  StatusBar,
} from 'react-native';
import Headers from '../components/headers';
import { Constants } from 'expo';

class LoginScreen extends Component {
    constructor(props) {
        super(props)
        this.state = { loading: true };
    }
    
    async componentWillMount() {
        await Expo.Font.loadAsync({
          'Roboto': require('native-base/Fonts/Roboto.ttf'),
          'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        });
        this.setState({ loading: false });
    }

    render() {
        if (this.state.loading) {
          return <Expo.AppLoading />;
        }
        return (
            <Container>
                <View style={styles.statusBar} />
                <Headers/>
                <Content style={styles.pad10}>
                    <Form>
                        <Item floatingLabel last>
                            <Label>Username</Label>
                            <Input />
                        </Item>
                        <Item floatingLabel last>
                            <Label>Password</Label>
                            <Input />
                        </Item>
                        <Button block style={styles.btnLogin}>
                            <Text>Login</Text>
                        </Button>
                        <Button block transparent dark style={styles.btnRegistrasi}>
                            <Text>Register</Text>
                        </Button>
                    </Form>
                </Content>
            </Container>
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

export default LoginScreen;