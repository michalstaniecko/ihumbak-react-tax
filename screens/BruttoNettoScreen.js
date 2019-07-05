import React from 'react';
import {Text, Container, Content, Form, Item, Input, Label, Picker} from "native-base";

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

	render() {
		return (
			<Container>
				<Content>
					<Text>Brutto Netto</Text>
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
				<Content>
					<Content>
						<Text>Kwota brutto</Text><Text>{this.state.brutto}</Text>
					</Content>
					<Content>
						<Text>Kwota netto</Text><Text>{this.state.netto}</Text>
					</Content>
				</Content>
			</Container>
		)
	}

}