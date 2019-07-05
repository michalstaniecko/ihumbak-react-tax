import React from 'react';
import {createBottomTabNavigator, createAppContainer} from "react-navigation";

import VatPitScreen from "../screens/VatPitScreen";
import BruttoNettoScreen from "../screens/BruttoNettoScreen";

const TabNavigator = createBottomTabNavigator({
	"Brutto/Netto": {
		screen: BruttoNettoScreen
	},
	"VAT/PIT":{
		screen: VatPitScreen
	},
});

export default createAppContainer(TabNavigator);