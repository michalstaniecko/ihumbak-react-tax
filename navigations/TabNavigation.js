import React from 'react';
import {createBottomTabNavigator, createAppContainer} from "react-navigation";

import VatPitScreen from "../screens/VatPitScreen";
import VatScreen from "../screens/VatScreen";

const TabNavigator = createBottomTabNavigator({
	"VAT": {
		screen: VatScreen
	},
	/*"VAT/PIT":{
		screen: VatPitScreen
	},*/
});

export default createAppContainer(TabNavigator);