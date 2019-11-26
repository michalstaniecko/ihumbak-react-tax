import React from 'react';
import {Text, Container, Content, Input, Picker, Item, Label, Form, H3} from "native-base";
import HeaderScreen from "../components/HeaderScreen";
import Salary from "../Calculators/Salary";
import FooterScreen from "../components/FooterScreen";
import Color from "../settings/Colors";
import Labels from "../settings/Labels";
import {View} from "react-native";

const salary = new Salary();

export default class SalaryScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			countedTax: 0,
			type: "brutto",
			costs: null
		};
		salary.salary = 0;
	}

	onChangeHandler = (value) => {
		salary.salary = parseFloat(value);
		//salary.salary = 2250;
		//salary.typeOfEmployment = 'business';
		this.setState({
			salary: value,
			costs: salary.count()
		});
	}

	onTypeChange = (type) => {

		salary.salary = salary.countNettoToBrutto();
		this.setState({
			type: type,
			costs: salary.count(),
			salary: salary.salary
		});
	}

	renderCostItem = (type,item) => {
		return (

			<View style={{
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'space-between',
				borderBottomWidth: 1,
				borderBottomColor: Color.border,
				paddingBottom: 5
			}}>
				<Text style={{color: Color.text}}>{Labels.costs[item]}</Text>
				<Text style={{color: Color.text}}>{this.state.costs[item][type].toFixed(2)}</Text>
			</View>
		)
	}

	renderEmployeeCosts = () => {
		return (

			<Content style={{
				padding: 15,
				marginTop: 40
			}}>
				<H3>Koszty pracownika</H3>
				<View style={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
					borderBottomWidth: 1,
					borderBottomColor: Color.border,
					marginBottom: 15,
					paddingBottom: 5
				}}>
					<Text style={{color: Color.text, fontWeight: 'bold'}}>kwota netto</Text>
					<Text style={{color: Color.text, fontWeight: 'bold'}}>{this.state.costs.netto.employee}</Text>
				</View>

				{ this.renderCostItem('employee','pension') }
				{ this.renderCostItem('employee','disability') }
				{ this.renderCostItem('employee','medical') }
				{ this.renderCostItem('employee','health') }
				{ this.renderCostItem('employee','tax') }

				<View style={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
					borderBottomWidth: 1,
					borderBottomColor: Color.border,
					marginBottom: 15,
					paddingBottom: 5
				}}>
					<Text style={{color: Color.text, fontWeight: 'bold'}}>kwota brutto</Text>
					<Text style={{color: Color.text, fontWeight: 'bold'}}>{this.state.salary}</Text>
				</View>
			</Content>
		)
	}


	renderEmployerCosts = () => {
		return (

			<Content style={{
				padding: 15,
				marginTop: 40
			}}>
				<H3>Koszty pracodawcy</H3>
				<View style={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
					borderBottomWidth: 1,
					borderBottomColor: Color.border,
					marginBottom: 15,
					paddingBottom: 5
				}}>
					<Text style={{color: Color.text, fontWeight: 'bold'}}>kwota brutto</Text>
					<Text style={{color: Color.text, fontWeight: 'bold'}}>{this.state.salary}</Text>
				</View>

				{ this.renderCostItem('employer','pension') }
				{ this.renderCostItem('employer','disability') }
				{ this.renderCostItem('employer','accident') }
				{ this.renderCostItem('employer','laborFound') }
				{ this.renderCostItem('employer','fgsp') }

				<View style={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
					borderBottomWidth: 1,
					borderBottomColor: Color.border,
					marginBottom: 15,
					paddingBottom: 5
				}}>
					<Text style={{color: Color.text, fontWeight: 'bold'}}>koszty pracodawcy</Text>
					<Text style={{color: Color.text, fontWeight: 'bold'}}>{this.state.costs.employerCosts.employer}</Text>
				</View>
			</Content>
		)
	}

	render() {
		return (
			<Container>
				<HeaderScreen subtitle="Kalkulator wynagrodzenia"/>
				<Content>
					<Form>
						<Item>
							<Label>Miesięczne wynagrodzenie</Label>
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

					{this.state.costs ? this.renderEmployeeCosts() : null}
					{this.state.costs ? this.renderEmployerCosts() : null}

				</Content>
				<FooterScreen/>
			</Container>
		)
	}

}