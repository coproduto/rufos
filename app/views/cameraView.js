/**
 * @providesModule city-ui-camera-view
 */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import {
  Container,
  Header,
  Title,
  Content
} from 'native-base';
import Camera from 'react-native-camera';
import DescriptionKVStore from 'ui-city-description-store';


export default class CameraView extends Component {
  constructor(props) {
    super(props);
    this.next = this.props.next;
    this.readBarcode = this.readBarcode.bind(this);
    this.keyValueStore = new DescriptionKVStore();
    this.enableCamera = this.enableCamera.bind(this);
    this.cameraEnabled = true;
  }

  enableCamera() {
    this.cameraEnabled = true;
  }
  
  readBarcode(event) {
    if(this.cameraEnabled) {
      console.log("Barcode bounds: ", event.bounds);
      console.log("Barcode data: ", event.data);
      const result = this.keyValueStore.getDescriptionForKey(event.data);
      if(result.found) {
        this.props.forward({name: result.name, text: result.value});
        this.cameraEnabled = false;
      }
    } else {
      console.log("Barcode found but camera disabled");
    }
  }
  
  render() {
    return (
      <Container>
        <Header>
          <Title>CityUI</Title>
        </Header>
        <Content>
          <View style={styles.container}>
            <Camera
              ref={(cam) => {
                this.camera = cam;
              }}
              style={styles.preview}
              aspect={Camera.constants.Aspect.fill}
              orientation={Camera.constants.Orientation.portrait}
              type={Camera.constants.Type.back}
              onBarCodeRead={this.readBarcode}
              barCodeTypes={["qr"]} />
          </View>
        </Content>
      </Container>
    );
  }
}

/*              <TouchableOpacity onPress={this.takePicture}>
                <Text style={styles.capture}>
                  [CAPTURE]
                </Text>
              </TouchableOpacity>*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height - 50,
    width: Dimensions.get('window').width
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});
