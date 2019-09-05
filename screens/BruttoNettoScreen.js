import React from 'react';
import {View, ScrollView, Image, Linking, TouchableWithoutFeedback} from "react-native";
import {
	Text,
	Container,
	Content,
	Form,
	Item,
	Input,
	Label,
	Picker,
	Header,
	Left,
	Right,
	Body,
	Title,
	Subtitle,
	Icon,
	H1,
	H2,
	H3,
} from "native-base";

import Color from './../settings/Colors';

import HeaderScreen from './../components/HeaderScreen';
import FooterScreen from "../components/FooterScreen";

export default class BruttoNettoScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			vat: 23,
			type: 'brutto',
			brutto: 0,
			netto: 0,
			amount: null
		}
	}

	onTypeChange(value) {
		this.setState({
			type: value
		});
		setTimeout(() => {

			this.count();
		}, 100);
	}

	onVatChange(value) {
		this.setState({
			vat: value
		});

		setTimeout(() => {

			this.count();
		}, 100);
	}

	count() {
		let amount = this.state.amount,
			type = this.state.type,
			vat = this.state.vat;
		console.log(amount);
		switch (type) {
			case 'brutto':
				this.setState({
					brutto: amount,
					netto: amount / (1 + (vat / 100)),
				})
				break;
			case 'netto':
				this.setState({
					brutto: amount * (1 + (vat / 100)),
					netto: amount
				});
				break;
		}
	}

	onChangeHandler = (value) => {
		console.log('value', value);
		this.setState({
			amount: value
		});
		setTimeout(() => {

			this.count();
		}, 100);
	}

	_goToURL() {
		const url = "https://sardynkibiznesu.pl";
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
			<Container>
				<HeaderScreen subtitle="Brutto / Netto"/>
				<Container style={{
					'display': 'flex',
					'flex': 1,
					'justifyContent': 'space-between'
				}}>
					<Content>

						<Content>

							<Form>
								<Item>
									<Input keyboardType="numeric" placeholder="Kwota"
									       onChangeText={this.onChangeHandler}
									       value={this.state.amount}
									/>
								</Item>
								<Item>
									<Label>Typ kwoty</Label>
									<Picker
										mode="dropdown"
										style={{width: undefined}}
										placeholder="Typ kwoty"
										selectedValue={this.state.type}
										onValueChange={this.onTypeChange.bind(this)}
									>
										<Picker.Item label="Brutto" value="brutto"/>
										<Picker.Item label="Netto" value="netto"/>
									</Picker>
								</Item>
								<Item>
									<Label>Stawka VAT</Label>
									<Picker
										mode="dropdown"
										style={{width: undefined}}
										placeholder="Stawka VAT"
										selectedValue={this.state.vat}
										onValueChange={this.onVatChange.bind(this)}
									>
										<Picker.Item label="23%" value={23}/>
										<Picker.Item label="8%" value={8}/>
										<Picker.Item label="5%" value={5}/>
									</Picker>
								</Item>

							</Form>
						</Content>
						<Content style={{
							padding: 15,
							marginTop: 40
						}}>
							<View style={{
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'space-between',
								borderBottomWidth: 1,
								borderBottomColor: Color.border,
								marginBottom: 15
							}}>
								<H3 style={{color:Color.text}}>Kwota brutto</H3><H3 style={{color:Color.text}}>{this.state.brutto}</H3>
							</View>
							<View style={{
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'space-between',
								borderBottomWidth: 1,
								borderBottomColor: '#afafaf'
							}}>
								<H3 style={{color:Color.text}}>Kwota netto</H3><H3 style={{color:Color.text}}>{this.state.netto}</H3>
							</View>
						</Content>
					</Content>
					<FooterScreen />
				</Container>
			</Container>
		)
	}

}