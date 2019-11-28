import React from 'react';

import {
  Container,
  Content,
  Text,
  H3
} from 'native-base';

import HeaderScreen from "../components/HeaderScreen";
import FooterScreen from "../components/FooterScreen";

export default class AdsConversionCount extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <Container>
        <HeaderScreen title="Kalkulator reklam google" backIcon={true} />
        <Content>
          <H3>Obliczenia</H3>
        </Content>
        <FooterScreen/>
      </Container>
    )
  }

}