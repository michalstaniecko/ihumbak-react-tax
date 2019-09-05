import React from 'react';
import {Header, Body, Title, Subtitle, Container} from 'native-base';

import Color from './../settings/Colors';
export default class HeaderScreen extends React.Component {
	constructor(props) {
		super(props);

	}

	render() {
		return (

			<Header style={{backgroundColor: Color.headerBackground, borderBottomWidth: 1, borderBottomColor: Color.accent}}>
				<Body style={{
					alignItems: 'center'
				}}>
					<Title style={{color: Color.headerText}}>
						Kalkulator podatkowy
					</Title>
					<Subtitle style={{color: Color.accent}}>
						{this.props.subtitle}
					</Subtitle>
				</Body>
			</Header>
		)
	}

}