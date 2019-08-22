import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { Header, ThemeProvider } from 'react-native-elements';
import ApiCallsService from './../../Api/index';
import axios from './../../Api/axios';
import StatesList from './../../Components/StatesList';

export default class HomeScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            states: {},
            title: 'loading...'
        }


    }

    GetStates() {

        axios.get('States').then(response => {
            console.log(response.data[0]);
            this.setState({
                states: response.data,
                loading: false,
                title: 'States'
            })


        });


    }

    componentDidMount() {
        this.GetStates();
    }

    render() {
        let homeview;

        if (this.state.loading) {
            homeview = <Text>loading...</Text>;
        } else {
            console.log(this.state.states);
            //homeview = this.state.states.map((d, i) => <View key={i}><Text>{d.StateName}</Text></View>);
            homeview = <StatesList states={this.state.states}></StatesList>


        }
        return (
            <ThemeProvider>

                <Header
                    // leftComponent={{ icon: 'menu', color: '#fff' }}
                    centerComponent={{ text: this.state.title, style: { color: '#fff' } }}
                // rightComponent={{ icon: 'home', color: '#fff' }}
                />
                {/* <Text>Home</Text> */}
                {/* <Button onPress={() => this.props.navigation.navigate('Statutes')} title="Statutes"></Button> */}
                {/* <Button onPress={this.GetStates} title="States"></Button> */}
                {homeview}

            </ThemeProvider>
        )
    }
}