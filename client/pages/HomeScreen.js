import React, { Component } from 'react';
import { Container, Content, Button, Text, Form, Item, Input, Label } from 'native-base';
import {
  StyleSheet,
  View,
  StatusBar,
} from 'react-native';
import Headers from '../components/headers';
import { Constants } from 'expo';

class HomeScreen extends Component {
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
                    <Button
                      onPress={() => this.props.navigation.navigate('Login')}
                      block style={styles.btn}>
                        <Text>To Login</Text>
                    </Button>
                    <Button
                      onPress={() => this.props.navigation.navigate('Register')}
                      block success style={styles.btn}>
                        <Text>To Register</Text>
                    </Button>
                    <Button
                      onPress={() => this.props.navigation.navigate('Main')}
                      block warning style={styles.btn}>
                        <Text>To Main Screen</Text>
                    </Button>
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
    btn: {
      marginTop: 20
    }
  });

export default HomeScreen;