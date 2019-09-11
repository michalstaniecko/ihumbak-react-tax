import React from 'react';
import {createBottomTabNavigator, createAppContainer} from "react-navigation";

import SalaryScreen from "../screens/SalaryScreen";
import VatScreen from "../screens/VatScreen";

const TabNavigator = createBottomTabNavigator({
	"Kalkulator VAT": {
		screen: VatScreen
	},
	"Kalkulator wynagrodzenia":{
		screen: SalaryScreen
	},
}, {
	initialRouteName: "Kalkulator wynagrodzenia"
});

export default createAppContainer(TabNavigator);