/**
 * @providesModule city-ui-description-view
 */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  BackAndroid
} from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Icon,
  Button
} from 'native-base';
import DescriptionKVStore from 'ui-city-description-store';


function isCloseToBottom(height, offset, screenHeight) {
  console.log("close to bot?",height,offset+screenHeight);
  const paddingToBottom = 20;
  return offset + screenHeight >= height - paddingToBottom;
}


export default class DescriptionView extends Component {
  constructor(props) {
    super(props);

    this.name = props.name;
    this.keyValueStore = new DescriptionKVStore();

    this.scrollStep = 5;
    this.scrollInterval = 50;
    this.state = { scrollPosition: 0, text: "", scroll: true };

    this._animation = null;
    this._text = props.text;
    this.updateScrollPosition = this.updateScrollPosition.bind(this);
    this.isCloseToBottom = false;

    BackAndroid.addEventListener('hardwareBackPress', props.back);
  }

  componentWillMount() {
    /*const result = this.keyValueStore.getDescriptionForKey("MAKEATHONFABCITY_DEMO");
    if(result.found) {
      this.setState({ text: result.value });
      }*/

    this.setState({ text: this._text });
  }

  componentWillUnmount() {
    if(this._animation !== null) {
      cancelAnimationFrame(this._animation);
    }
  }

  componentDidMount() {
    requestAnimationFrame(this.updateScrollPosition);
  }

  updateScrollPosition() {
    this.setState({ scrollPosition: this.state.scrollPosition + this.scrollStep });
    this._content._scrollview.scrollToPosition(0,this.state.scrollPosition,true);
    if(!this.isCloseToBottom) {
      console.log("requesting frame");
      if(this.state.scroll) {
        this._animation = requestAnimationFrame(this.updateScrollPosition);
      }
    } else {
      console.log("frame not requested. we are close to bottom.");
    }
  }

  /*componentWillUnmount() {
    clearInterval(this._intervalRef);
  }*/

  render() {
    return (
        <Container style={styles.container}> 
          <Header>
            <Button transparent onPress={this.props.back}>
              <Icon name='ios-arrow-back' style={{fontSize: 20, color: "#ffffff"}}/>
            </Button>
      
            <Title>{this.name}</Title>
          </Header>
            <Content ref={(ref) => this._content = ref}
                     style={styles.content}
                     onScroll={(event) => {
                       if(isCloseToBottom(event.nativeEvent.contentSize.height,
                                          event.nativeEvent.contentOffset.y,
                                          this._height)) {
                         console.log("close to bottom.");
                         this.isCloseToBottom = true;
                         this.setState({scroll: false});
                       } else {
                         console.log("not close to bottom");
                         this.isCloseToBottom = false;
                       }
                       if(!this.state.scroll) {
                         this.setState({
                           scrollPosition: event.nativeEvent.contentOffset.y,
                         });
                       }
                     }}
                     onLayout={(event) => {
                       this._height = event.nativeEvent.layout.height;
                     }}>
             <TouchableWithoutFeedback onPress={() => {
               const inverted = !this.state.scroll;
               this.setState({scroll: inverted});
               console.log("touched. scroll was set to", inverted);
               if(inverted) {
                 this._animation = requestAnimationFrame(this.updateScrollPosition);
               }
             }}>
              <View style={styles.textContainer}>
                <Text style={styles.descriptionText}>
                  {this.state.text}
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableOpacity onPress={() => {

              this._content._scrollview.scrollToPosition(0,0,true);
              console.log("Scrolled!");
            }}>
              <Text>Top</Text>
            </TouchableOpacity>
          </Content>
        </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  textContainer: {
    flex: 1,
    margin: 40,
  },
  descriptionText: {
    fontSize: 40,
    textAlign: "center",
  },
});
