import React from 'react';
import {createAppContainer, createDrawerNavigator} from "react-navigation";
import SalaryCalcNavigator from "./SalaryCalcNavigation";
import AdsConversionScreen from "../screens/AdsConversionScreen";
import GoogleAdsCalsNavigator from "./GoogleAdsCalcNavigation";


const DrawerNavigator  = createDrawerNavigator(
  {
    SalaryCalc: {
      screen: SalaryCalcNavigator,
      navigationOptions: {
        title: 'Kalkulator wyngrodzeń'
      },
    },
    adsConversionCals: {
      screen: GoogleAdsCalsNavigator,
      navigationOptions: {

        title: 'Kalkulator konwersji reklam'
      }
    }
  },
  {
    initialRouteName: 'adsConversionCals'
  }
);

export default createAppContainer(DrawerNavigator);