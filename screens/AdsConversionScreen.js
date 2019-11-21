import React from 'react';

import {Text, Container, Content, Input, Picker, Item, Label, Form, H3} from "native-base";
import HeaderScreen from "../components/HeaderScreen";
import FooterScreen from "../components/FooterScreen";

export default class AdsConversionScreen extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <Container>
        <HeaderScreen subtitle="Kalkulator reklam Google"/>
        <Content>
          <H3>
            Adsense
          </H3>
        </Content>
        <FooterScreen/>
      </Container>
    )
  }

}