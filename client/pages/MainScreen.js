import React, { Component } from 'react';
import { Container, Content, Button, Text, Form, Item, Input, Label } from 'native-base';
import {
  StyleSheet,
  View,
  StatusBar,
} from 'react-native';
import Headers from '../components/headers';
import FootersTab from '../components/FootersTab';
import { Constants } from 'expo';
import Status from '../components/Status';

class MainScreen extends Component {
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
                <Headers title={"Pacebuk"}/>
                <Content style={styles.pad10}>
                    <Status navigation={this.props.navigation}/>
                </Content>
                <FootersTab navigation={this.props.navigation}/>
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
      paddingLeft: 8,
      paddingRight: 8
    },
  });

export default MainScreen;