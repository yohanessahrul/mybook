import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Subtitle } from 'native-base';
import { Font } from "expo";

class headers extends Component {

    render() {
        return (
            <Header noLeft>
                <Left>
                </Left>
                <Body>
                    <Title>{this.props.title}</Title>
                </Body>
                <Right>
                    <Button transparent>
                    <Icon name='search' />
                    </Button>
                </Right>
            </Header>
        );
    }
}

export default headers;