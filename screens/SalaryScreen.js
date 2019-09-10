import React from 'react';
import {Text, Container, Content, Input, Picker} from "native-base";
import HeaderScreen from "../components/HeaderScreen";
import Salary from "../Calculators/Salary";

const salary = new Salary();

export default class SalaryScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			countedTax: 0,
			type: "brutto"
		};
		salary.salary=0;
		salary.type='brutto';
	}

	onChangeHandler = (value) => {
		salary.salary=parseFloat(value);
		this.setState({
			countedTax: salary.countTax()
		});
	}

	onTypeChange = (type) => {
		salary.type = type;
		this.setState({
			countedTax: salary.countTax(),
			type: type
		});
	}

	render() {
		return (
			<Container>
				<HeaderScreen subtitle="Kalkulator wynagrodzenia"/>
				<Content>
					<Text>podatek do zapłacenia od 10000</Text>
					<Input keyboardType="numeric" placeholder="0" onChangeText={this.onChangeHandler} />
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
					<Text>{this.state.countedTax ? this.state.countedTax : ''} podatek</Text>
				</Content>
			</Container> 
		)
	}

}