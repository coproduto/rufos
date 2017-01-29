/**
 * @providesModule city-ui-app
 */

import React, { Component } from 'react';
import { Navigator } from 'react-native';
import CameraView from 'city-ui-camera-view';
import DescriptionView from 'city-ui-description-view';

function makeReplaceView(navigator, toScene) {
  return (args) => {
    route = navigator.getCurrentRoutes()[0];
    if(!args) {
      navigator.replace({scene: toScene});
    } else {
      navigator.replace({scene: toScene, args: args});
    }
  }
}


export default class App extends Component {
  constructor(props) {
    super(props);

    this.initialRoute = {scene: "camera"};
    this.renderScene = this.renderScene.bind(this);
    this.configureScene = this.configureScene.bind(this);
    //this._onDidFocus = this._onDidFocus.bind(this);
  }

  renderScene(route, navigator) {
    scene = route.scene || "camera";
    
    if(scene == "camera") {
      return(<CameraView ref={(camera) => { route.camera = camera; }}
                         forward={makeReplaceView(navigator, "description")}/>);
    } else if(scene == "description") {
      return(<DescriptionView back={makeReplaceView(navigator, "camera")}
                              name={route.args.name}
                              text={route.args.text}/>); //mudar aqui
    } else {
      return(<CameraView ref={(camera) => { route.camera = camera; }}
                         forward={makeReplaceView(navigator, "description")}/>);
    }
  }

  _onDidFocus(route) {
    if(route.scene === "camera") {
      route.camera.enableCamera;
    }
  }

  configureScene(route, routeStack) {
    scene = route.scene;
    
    if(scene == "description") {
      return Navigator.SceneConfigs.FloatFromRight;
    } else if(scene == "camera") {
      return Navigator.SceneConfigs.FloatFromLeft;
    } else {
      return Navigator.SceneConfigs.PushFromRight;
    }
  }
  
  render() {
    return(
      <Navigator
        initialRoute={this.initialRoute}
        renderScene={this.renderScene}
        configureScene={this.configureScene}
        onDidFocus={this._onDidFocus}
        style={{flex: 1}}/>
    )
  }
}
