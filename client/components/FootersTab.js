import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Container, Header, Content, Footer, FooterTab, Button, Text } from 'native-base';
class FootersTab extends Component {
  render() {
    return (
        <Footer>
          <FooterTab>
            <Button vertical>
              <Icon name="home" />
              <Text>Home</Text>
            </Button>
            <Button vertical>
              <Icon name="camera" />
              <Text>Profile</Text>
            </Button>
            <Button vertical active>
              <Icon active name="navigate" />
              <Text>Friend</Text>
            </Button>
          </FooterTab>
        </Footer>
    );
  }
}

export default FootersTab;