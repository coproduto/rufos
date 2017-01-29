/**
 * CityUI iOS App
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import App from 'city-ui-app';

export default class CityUI extends Component {
  render() {
    return (<App />);
  }
}

AppRegistry.registerComponent('CityUI', () => CityUI);
