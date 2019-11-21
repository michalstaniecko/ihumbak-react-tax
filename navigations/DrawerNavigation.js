import React from 'react';
import {createAppContainer, createDrawerNavigator} from "react-navigation";
import SalaryCalcNavigator from "./SalaryCalcNavigation";
import AdsConversionScreen from "../screens/AdsConversionScreen";


const DrawerNavigator  = createDrawerNavigator(
  {
    "Kalkulator wynagrodzeń": {
      screen: SalaryCalcNavigator
    },
    "Kalkulator konwersji reklam": {
      screen: AdsConversionScreen,
    }
  },
  {

  }
);

export default createAppContainer(DrawerNavigator);