import React from 'react';
import {createBottomTabNavigator, createAppContainer, createMaterialTopTabNavigator} from "react-navigation";

import SalaryScreen from "../screens/SalaryScreen";
import VatScreen from "../screens/VatScreen";
import Colors from "../settings/Colors";

const TabNavigator = createMaterialTopTabNavigator({
	"Kalkulator VAT": {
		screen: VatScreen
	},
	"employee-and-employer":{
		screen: SalaryScreen,
		navigationOptions: {
			tabBarLabel: 'Koszty pracownika i pracodawcy'
		}
	},
}, {
	//initialRouteName: "Kalkulator wynagrodzenia",
	tabBarPosition: 'bottom',
	tabBarOptions: {
		activeTintColor: Colors.accent,
		inactiveTintColor: Colors.text,
		indicatorStyle: {
			backgroundColor: Colors.accent
		},
		showIcon: false,
		upperCaseLabel: false,
		style: {
			backgroundColor: Colors.headerBackground
		},
		tabStyle: {

		}
	}
});

export default createAppContainer(TabNavigator);