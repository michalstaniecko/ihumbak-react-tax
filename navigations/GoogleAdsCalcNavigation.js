import React from 'react';
import {createAppContainer, createMaterialTopTabNavigator, createStackNavigator} from "react-navigation";
import AdsConversionScreen from "../screens/AdsConversionScreen";
import Colors from "../settings/Colors";
import AdsConversionCount from "../screens/AdsConversionCountScreen";

const GoogleAdsCalsNavigator = createStackNavigator(
  {
    "AdsConversionScreen": {
      screen: AdsConversionScreen,
      navigationOptions: {
        title: "Kalkulator konwersji reklam"
      }
    },
    'CountConversion': {
      screen: AdsConversionCount
    }
  },
  {
    headerMode: 'none',
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