import React from 'react';
import {Text, Container, Content, Input, Picker, Item, Label, Form, H3} from "native-base";
import HeaderScreen from "../components/HeaderScreen";
import Salary from "../Calculators/Salary";
import FooterScreen from "../components/FooterScreen";
import Color from "../settings/Colors";
import {View} from "react-native";

const salary = new Salary();

export default class SalaryScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			countedTax: 0,
			type: "brutto"
		};
		salary.salary = 0;
		salary.type = 'brutto';
	}

	onChangeHandler = (value) => {
		salary.salary = parseFloat(value);
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
					<Form>
						<Item>
							<Label>Kwota</Label>
							<Input keyboardType="numeric" placeholder="0" onChangeText={this.onChangeHandler}/>
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
					</Form>

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
							<H3 style={{color: Color.text}}>Podatek</H3>
							<H3 style={{color: Color.text}}>{this.state.countedTax ? this.state.countedTax : '0'}</H3>
						</View>

						<View style={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-between',
							borderBottomWidth: 1,
							borderBottomColor: Color.border,
							paddingBottom: 5
						}}>
							<Text style={{color: Color.text}}>Kwota wolna od podatku</Text>
							<Text style={{color: Color.text}}>{salary.taxFree ? salary.taxFree : ''}</Text>
						</View> 
					</Content>
				</Content>
				<FooterScreen/>
			</Container>
		)
	}

}