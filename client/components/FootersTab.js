import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Container, Header, Content, Footer, FooterTab, Button, Text } from 'native-base';

class FootersTab extends Component {

  render() {
    return (
        <Footer>
          <FooterTab>
            <Button 
              onPress={() => this.props.navigation.navigate('Main')}
              vertical>
              <Icon name="home" size={20} color="#c9edfc" />
              <Text>Home</Text>
            </Button>
            <Button 
              onPress={() => this.props.navigation.navigate('Profile')}
              vertical>
              <Icon name="edit" size={20} color="#c9edfc" />
              <Text>Profile</Text>
            </Button>
            <Button
              onPress={() => this.props.navigation.navigate('Friend')}
              vertical active>
              <Icon name="users" size={20} color="#c9edfc" />
              <Text>Friend</Text>
            </Button>
          </FooterTab>
        </Footer>
    );
  }
}

export default FootersTab;