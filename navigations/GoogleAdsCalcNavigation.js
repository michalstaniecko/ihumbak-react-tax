import React from 'react';
import {createAppContainer, createMaterialTopTabNavigator} from "react-navigation";
import AdsConversionScreen from "../screens/AdsConversionScreen";
import Colors from "../settings/Colors";

const GoogleAdsCalsNavigator = createMaterialTopTabNavigator(
  {
    "Adsense": {
      screen: AdsConversionScreen
    }
  },
  {
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
  }
)

export default GoogleAdsCalsNavigator;