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
			<View style={{marginBottom: 15}}>

				<View style={{}}>
					<Text style={{textAlign: 'center', color: Color.text}}>Więcej informacji na temat prowadzenia małego biznesu znajdziesz na:</Text>
				</View>
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