import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Subtitle } from 'native-base';
import { Font } from "expo";

class headers extends Component {

    render() {
        return (
            <Header>
                <Left>
                    <Button transparent>
                        <Icon name='arrow-back' />
                    </Button>
                </Left>
                <Body>
                    <Title>Header</Title>
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