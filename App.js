/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, Text, View} from 'react-native';
import TabNavigation from './navigations/TabNavigation';


export default class App extends Component {
  render() {
    return (
      <TabNavigation/>
    );
  }
}
