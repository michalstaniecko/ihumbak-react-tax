/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import DrawerNavigation from "./navigations/DrawerNavigation";
import SplashScreen from "react-native-splash-screen";

export default class App extends Component {
	componentDidMount() {
		SplashScreen.hide();
	}

	render() {
    return (
      <DrawerNavigation/>
    );
  }
}
