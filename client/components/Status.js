import React, { Component } from 'react';
import { Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Spinner } from 'native-base';
import {
  StyleSheet,
  View,
  StatusBar,
} from 'react-native';
import { Query, graphql } from 'react-apollo';
import { GET_ALL_STATUS } from '../graphql/client';
import PropTypes from 'prop-types';

class Status extends Component {
  
    static propTypes = {
      data: PropTypes.shape({
        loading: PropTypes.bool,
        error: PropTypes.object,
        statuses: PropTypes.array,
      }).isRequired,
    }
    render() {
      console.log('props => ', this.props)
      if (this.props.data.error) {
        console.log('ERROR +++>', this.props.data.error)
        return (
          <View>
            <Text>Data error gan ssss</Text>
          </View>
        )
      }

      if (this.props.data.loading) {
        return (
          <View style={{ paddingTop: 100 }}>
            <Spinner color='red' />
          </View>
        )
      }

      // if (this.props.data.statuses != undefined) {
        return this.props.data.statuses.map(function(status, i) {
          return (
            <View key={`${status.status} + ${i}`}>
              <Card style={{flex: 0}}>
                  <CardItem>
                    <Left>
                      <Thumbnail source={{uri: 'https://z-p3-scontent-sit4-1.xx.fbcdn.net/v/t1.0-9/19657184_10207157642659137_4906501808988537286_n.jpg?_nc_cat=0&oh=9f27c38752395fa133808a7fa846d3fb&oe=5BAB5547'}} />
                      <Body>
                        <Text>{status.userId.fullname}</Text>
                        <Text note>April 15, 2016</Text>
                      </Body>
                    </Left>
                  </CardItem>
                  <CardItem>
                    <Body>
                      <Text>{status.status}</Text>
                    </Body>
                  </CardItem>
                  <CardItem>
                    <Left>
                      <Button transparent>
                        <Icon active name="thumbs-up" />
                        <Text>0 Likes</Text>
                      </Button>
                      <Button 
                        onPress={ () => this.props.navigation.navigate('DetailStatus') }
                        transparent>
                        <Icon active name="chatbubbles" />
                        <Text 
                        >{status.commentId.length} Comments</Text>
                      </Button>
                    </Left>
                  </CardItem>
              </Card>
            </View>
          )
        })
      // }

    }
}

const StatusWithData = graphql(GET_ALL_STATUS)(Status)

export default StatusWithData;