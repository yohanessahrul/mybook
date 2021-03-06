import React, { Component } from 'react';
import { Container, Content, Button, Text, Form, Item, Input, Label, Thumbnail } from 'native-base';
import {
  StyleSheet,
  View,
  StatusBar,
} from 'react-native';
import Headers from '../components/headers';
import FootersTab from '../components/FootersTab';
import { Constants } from 'expo';
import Status from '../components/Status'

class ProfileScreen extends Component {
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
                <Headers title={"Profile"}/>
                <Content style={styles.pad10}>
                    <Thumbnail style={{ justifyContent: "center" }} large source={{uri: 'https://z-p3-scontent-sit4-1.xx.fbcdn.net/v/t1.0-9/19657184_10207157642659137_4906501808988537286_n.jpg?_nc_cat=0&oh=9f27c38752395fa133808a7fa846d3fb&oe=5BAB5547'}} />
                    <Text>Ini adalah halaman profile</Text>
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
      marginLeft: 8,
      marginRight: 8
    },
  });

export default ProfileScreen;