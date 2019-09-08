import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { Header, ThemeProvider } from 'react-native-elements';
import ApiCallsService from './../../Api/index';
import axios from './../../Api/axios';
import StatesList from './../../Components/StatesList';
import StatutesList from './../../Components/StatutesList';
import RNFetchBlob from 'rn-fetch-blob';

export default class HomeScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            viewtype: 'states',
            loading: true,
            states: {},
            statutes: {},
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

    fetchStatutes = id => {
        console.log("Fetch Statutes - State Id " + id);

        axios.get('Statutes', {
            params: {
                iStateId: id
            }
        }).then(response => {
            console.log(response.data);
            this.setState({
                statutes: response.data,
                viewtype: 'statutes',
                title: 'Statutes'
            })
        });
    }

    fetchStatutesDb = downloadurl => {
        console.log("download " + downloadurl);
        downloadurl = encodeURI('http://45.113.136.124:8880/smb/file-manager/download?currentDir=%2Fsqlite.stocksclue.com%2Fandroid&file=CaliforniaEvidenceCode');

        console.log("download " + downloadurl);

        RNFetchBlob.config({
            // add this option that makes response data to be stored as a file,
            // this is much more performant.
            fileCache: true,
            // path : RNFS.DocumentDirectoryPath + '/CaliforniaEvidenceCode.sqlite'
            path : '/CaliforniaEvidenceCode.sqlite'
        }).

        // // send http request in a new thread (using native code)
        fetch('GET', "https://drive.google.com/uc?export=download&id=11noPBgs5NV6cFnGpLT2iXupGYj2yAmTP", {
            // Authorization: 'Bearer access-token...',
            // more headers  ..
        })
            .then((res) => {
                let status = res.info().status;

                console.log(status);
                console.log('The file saved to ', res.path())


                // if (status == 200) {
                //     // the conversion is done in native code
                //     let base64Str = res.base64()
                //     // the following conversions are done in js, it's SYNC
                //     let text = res.text()
                //     let json = res.json()
                // } else {
                //     // handle other status codes
                // }
            })
            // Something went wrong:
            .catch((errorMessage, statusCode) => {
                // error handling
                console.log(errorMessage);
            })
    }

    render() {
        let homeview;

        if (this.state.loading) {
            homeview = <Text>loading...</Text>;
        } else {
            if (this.state.viewtype == 'states') {
                console.log(this.state.states);
                //homeview = this.state.states.map((d, i) => <View key={i}><Text>{d.StateName}</Text></View>);
                homeview = <StatesList states={this.state.states} funcFetchStatutes={this.fetchStatutes}></StatesList>
            } else {
                console.log(this.state.statutes);
                homeview = <StatutesList statutes={this.state.statutes} funcFetchStatutesDB={this.fetchStatutesDb}></StatutesList>
            }
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