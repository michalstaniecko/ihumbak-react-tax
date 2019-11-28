import React from 'react';

import {
  Text,
  Container,
  Content,
  Input,
  Picker,
  Item,
  Label,
  Form,
  H3,
  Button,
  List,
  ListItem,
} from "native-base";
import {SwipeListView} from 'react-native-swipe-list-view';
import HeaderScreen from "../components/HeaderScreen";
import FooterScreen from "../components/FooterScreen";
import Color from "../settings/Colors";
import Labels from "../settings/Labels";
import styles from "../styles/List";
import Icon from 'react-native-vector-icons/FontAwesome';

export default class AdsConversionScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goals: [{key: '1'}]
    }
  }

  _addNextGoal = () => {
    //console.log(this.state.goals[this.state.goals.length])
    let key = parseFloat(this.state.goals[this.state.goals.length - 1].key) + 1;
    this.setState((prevState) => ({
      goals: [...prevState.goals, {key: `${key}`}]
    }));
    console.log(this.state.goals);
  }
  onGoalChange = (value, rowKey, type) => {
    const newGoals = [...this.state.goals];
    const idx = this.state.goals.findIndex(
      item => item.key === rowKey
    );
    newGoals[idx][type] = value;
    this.setState({
      goals: newGoals
    });
  }

  renderListItem = (rowKey) => {
    let goalId = `goal-${rowKey}`, budgetId = `budget-${rowKey}`;
    return (
      <ListItem key={rowKey} style={[styles.rowFront]}>
        <Content style={{position: 'relative'}}>
          <Content style={{position: 'absolute', width: 3, top: 30, bottom: 0, backgroundColor: Color.accent}}/>
          <Form style={{width: '100%', display: 'flex', flexDirection: 'row', marginTop: 0, paddingTop: 0}}>
            <Item floatingLabel style={{width: '50%'}}>
              <Label style={[styles.label]}>Nazwa celu</Label>
              <Input key={goalId} onChangeText={(text) => this.onGoalChange(text, rowKey, 'name')}
                     style={[styles.input]}/>
            </Item>

            <Item floatingLabel style={{width: '50%'}}>
              <Label style={styles.label}>Budżet celu</Label>
              <Input key={budgetId} keyboardType="numeric" style={styles.input}
                     onChangeText={(text) => this.onGoalChange(text, rowKey, 'budget')}/>
            </Item>
          </Form>
          <Form style={{width: '100%', display: 'flex', flexDirection: 'row'}}>
            <Item floatingLabel style={{width: '50%'}}>
              <Label style={styles.label}>Zysk z celu netto</Label>
              <Input key={goalId} onChangeText={(text) => this.onGoalChange(text, rowKey, 'profit')}
                     style={styles.input}/>
            </Item>

            <Item floatingLabel style={{width: '50%'}}>
              <Label style={styles.label}>Pozyskani klienci</Label>
              <Input key={budgetId} keyboardType="numeric"
                     onChangeText={(text) => this.onGoalChange(text, rowKey, 'conversion')} style={styles.input}/>
            </Item>
          </Form>
        </Content>
      </ListItem>
    )
  }

  closeRow(rowMap, rowKey) {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  }

  _deleteRow = (rowKey, rowMap) => {
    this.closeRow(rowMap, rowKey);
    const newGoals = [...this.state.goals];
    const prevIndex = this.state.goals.findIndex(
      item => item.key === rowKey
    );
    newGoals.splice(prevIndex, 1);
    this.setState({
      goals: newGoals
    });
  }

  countBudget = () => {
    let budget = 0;
    this.state.goals.map((item, index) => {
      if (item.budget)
        budget += parseFloat(item.budget);
    });
    return budget;
  }

  renderHiddenItem = (data, rowMap) => (
    <Button style={[styles.backRightBtn, styles.backRightBtnRight]}
            onPress={() => this._deleteRow(data.item.key, rowMap)}>
      <Icon color="#fff" size={20} active name="trash"></Icon>
    </Button>
  );

  countConversion = () => {
    console.log(this.props.navigation)
    this.props.navigation.navigate('CountConversion')
  }

  render() {
    let {goals} = this.state;
    let data = this.state.goals;
    let goalsCount = this.state.goals.length;
    return (
      <Container>
        <HeaderScreen subtitle="Kalkulator reklam Google"/>
        <Content>
          <SwipeListView

            data={this.state.goals}
            rightOpenValue={-75}
            renderItem={data => {
              return this.renderListItem(data.item.key);
            }


            }
            renderHiddenItem={(data, rowMap) =>
              this.renderHiddenItem(data, rowMap)
            }
          />
          <Button onPress={this._addNextGoal}><Text><Icon name="plus" size={16}   /> Dodaj kolejny cel</Text></Button>
          <Content>
            <Text>Ilość celów: {goalsCount}</Text>
            <Text>Budżet wszystkich celów: {this.countBudget()}</Text>
          </Content>
          <Content>
            <Button style={{backgroundColor: Color.accent}} onPress={this.countConversion}><Text>Oblicz skuteczność konwersji</Text></Button>
          </Content>
        </Content>
        <FooterScreen/>
      </Container>
    )
  }

}