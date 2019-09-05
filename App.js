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
import BruttoNettoScreen from "./screens/BruttoNettoScreen";
import SplashScreen from "react-native-splash-screen";

export default class App extends Component {
	componentDidMount() {
		SplashScreen.hide();
	}

	render() {
    return (
      <BruttoNettoScreen/>
    );
  }
}
