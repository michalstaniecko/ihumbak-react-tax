import React from 'react';
import {Image, Linking, TouchableWithoutFeedback, View} from "react-native";
import {Text} from "native-base";
import Color from "../settings/Colors";

export default class FooterScreen extends React.Component {
	constructor(props) {
		super(props);

	}


	_goToURL() {
		const url = "https://sardynkibiznesu.pl/?gae=kalkulatorPodatkowy";
		Linking.canOpenURL(url).then(supported => {
			if (supported) {
				Linking.openURL(url);
			} else {
				console.log('Don\'t know how to open URI: ' + url);
			}
		});
	}


	render() {
		return (
			<View elevation={1} style={{paddingVertical: 5, paddingHorizontal: 30,borderTopWidth:1, borderTopColor: '#fff'}}>
				<View style={{alignItems: 'center'}}>
					<TouchableWithoutFeedback onPress={this._goToURL}>
						<Image source={require('./../images/logo_sardynki_biznesu.png')}
						       style={{
							       width: 200,
							       height: 60,
							       resizeMode: 'contain'
						       }}

						/>
					</TouchableWithoutFeedback>
				</View>
			</View>
		)
	}

}