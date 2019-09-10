import React from 'react';
import {View, ScrollView, Image, StyleSheet} from "react-native";
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

const DELAY = 10;

export default class BruttoNettoScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			vat: 23,
			type: 'brutto',
			brutto: 0,
			netto: 0,
			amount: null,
			errorDisplay: 'none'
		}
	}

	onTypeChange(value) {
		this.setState({
			type: value
		});
		setTimeout(() => {

			this.count();
		}, DELAY);
	}

	onVatChange(value) {
		this.setState({
			vat: value
		});

		setTimeout(() => {

			this.count();
		}, DELAY);
	}

	validateInput(value) {
		var patt = new RegExp("^[0-9]+(\\.[0-9]{1,2})?$");
		var valid = patt.test(value);
		if (valid) {
			this.setState({
				errorDisplay: 'none'
			});
			return true;
		} else {
			this.setState({
				errorDisplay: 'flex'
			});
			return false;
		}
	}

	count(valueValid = true) {
		let amount = parseFloat(this.state.amount),
			type = this.state.type,
			vat = this.state.vat;

		if (valueValid == false) {

			this.setState({
				brutto: 0,
				netto: 0,
			});
			return false;
		}
		switch (type) {
			case 'brutto':
				this.setState({
					brutto: amount.toFixed(2),
					netto: (amount / (1 + (vat / 100))).toFixed(2),
				});
				break;
			case 'netto':
				this.setState({
					brutto: (amount * (1 + (vat / 100))).toFixed(2),
					netto: amount.toFixed(2)
				});
				break;
		}
	}

	onChangeHandler = (value) => {
		console.log('before', value);
		value = value.replace(',', '.');
		console.log('after', value);
		var valueValid = this.validateInput(value);
		this.setState({
			amount: value
		});
		setTimeout(() => {

			this.count(valueValid);
		}, DELAY);
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

						<Content style={{paddingHorizontal: 15}}>

							<Form>
								<Item style={{marginLeft: 0}}>
									<Input keyboardType="numeric" placeholder="Kwota"
									       onChangeText={this.onChangeHandler}
									       value={this.state.amount}
									/>
								</Item>
								<Text style={[styles.error, {display: this.state.errorDisplay}]}>Wprowadź kwotę w formacie: <Text
									style={[styles.error, {fontWeight: 'bold'}]}>0,00</Text></Text>
								<Item style={{marginLeft: 0}}>
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
								<Item style={{marginLeft: 0}}>
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
								marginBottom: 15,
								paddingBottom: 5
							}}>
								<H3 style={{color: Color.text}}>Kwota brutto</H3><H3
								style={{color: Color.text}}>{this.state.brutto}</H3>
							</View>
							<View style={{
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'space-between',
								borderBottomWidth: 1,
								borderBottomColor: Color.border,
								paddingBottom: 5
							}}>
								<H3 style={{color: Color.text}}>Kwota netto</H3><H3 style={{color: Color.text}}>{this.state.netto}</H3>
							</View>
						</Content>
					</Content>
					<FooterScreen/>
				</Container>
			</Container>
		)
	}

}

const styles = StyleSheet.create({
	error: {
		color: Color.accent,
		fontSize: 12
	}
})