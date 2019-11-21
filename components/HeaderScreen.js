import React from 'react';
import {Header, Body, Title, Subtitle, Container, Left, Right, Button, Text, Icon} from 'native-base';

import {DrawerActions, withNavigation} from "react-navigation";

import Color from './../settings/Colors';

class HeaderScreen extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.navigation);
  }

  _openMenu = () => {
    this.props.navigation.dispatch(DrawerActions.toggleDrawer());
  }

  render() {
    return (

      <Header style={{backgroundColor: Color.headerBackground, borderBottomWidth: 1, borderBottomColor: Color.accent}}>

        <Body style={{}}>
          <Title style={{color: Color.headerText}}>
            Niezbędnik Przedsiębiorcy
          </Title>
          <Subtitle style={{color: Color.accent}}>
            {this.props.subtitle}
          </Subtitle>
        </Body>
				<Right style={{
					flex:0
				}}>
					<Button dark transparent onPress={this._openMenu}><Icon name="menu"/></Button>
				</Right>
      </Header>
    )
  }

}

export default withNavigation(HeaderScreen);