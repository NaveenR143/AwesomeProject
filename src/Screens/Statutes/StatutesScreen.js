import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Header, ThemeProvider } from 'react-native-elements';
import SectionsList from './../../Components/SectionsList';

// sqlite related imports
import { openDatabase } from 'react-native-sqlite-storage';

//Connction to access the pre-populated user_db.db
// var db = openDatabase({ name: 'CaliforniaEvidenceCode.sqlite', createFromLocation: 1 });

export default class StatutesScreen extends Component {

    db;


    constructor(props) {
        super(props);

        this.state = {
            parentID: 0,
            sections: [],
            loading: true,
            title: 'loading...',
            viewtype: 'states',

        }


    }

    loadDatabase = () => {

        console.log('Execute sql query');
        sqlQuery = 'SELECT * FROM Codes WHERE ParentID = ' + this.state.parentID;


        db.transaction(tx => {
            tx.executeSql(
                sqlQuery,
                [],
                function (tx, res) {
                    console.log('list:', res.rows.length);

                }
            );
        });
    }

    openCB() {
        console.log("Database OPENED");
        // console.log(db);


        // sqlQuery = 'SELECT * FROM Codes WHERE ParentID = ' + parentId;

        // console.log(sqlQuery);

        // db.transaction(tx => {
        //     tx.executeSql(
        //         sqlQuery,
        //         [],
        //         function (tx, res) {
        //             console.log('list:', res.rows.length);

        //         }
        //     );
        // });
    }

    errorCB(err) {
        console.log("SQL Error: " + err);

    }

    componentDidMount() {

        console.log('component loaded, load database');

        var dbOpen = openDatabase({ name: 'CaliforniaEvidenceCode.sqlite', createFromLocation: 1, location: 'Library' }, (db) => {
            sqlQuery = 'SELECT * FROM Codes WHERE ParentID = ' + this.state.parentID;

            console.log(sqlQuery);

            db.transaction((tx) => {
                tx.executeSql(sqlQuery, [], (tx, res) => {
                    console.log("Query completed");
                    console.log('list:', res.rows.length);

                    if (res.rows.length > 0) {
                        this.sections = [];
                        this.parentID = res.rows.item(0).ParentID;

                        let newSections = [];

                        for (let i = 0; i < res.rows.length; i++) {
                            newSections.push({
                                ID: res.rows.item(i).ID,
                                HeadingType: res.rows.item(i).HeadingType,
                                Section: res.rows.item(i).Section,
                                SectionHeading: res.rows.item(i).SectionHeading,
                                Description: res.rows.item(i).Description,
                                IsBookmarked: res.rows.item(i).IsBookmarked,
                                ParentID: res.rows.item(i).ParentID
                            });
                        }

                        this.setState({
                            sections: newSections,
                            loading: false,
                            title: 'Sections',
                            viewtype: 'sections'
                        })

                        console.log(this.state.sections)

                    }
                });
            });

            db.transaction(tx => {
                console.log('execute query');


                // tx.executeSql(
                //     sqlQuery,
                //     [],
                //     function (tx, res) {
                //         console.log('query executed')
                //         console.log('list:', res.rows.length);

                //     }
                // );
            });
        }, this.errorCB);



        // this.loadDatabase();
    }



    render() {
        let sectionsview;

        if (this.state.loading) {
            sectionsview = <Text>loading...</Text>;
        } else {
            if (this.state.viewtype == 'sections') {
                console.log(this.state.sections);
                //homeview = this.state.states.map((d, i) => <View key={i}><Text>{d.StateName}</Text></View>);
                sectionsview = <SectionsList sections={this.state.sections}></SectionsList>
            } else {
                console.log(this.state.viewtype);
                // sectionsview = <StatutesList statutes={this.state.statutes} funcFetchStatutesDB={this.fetchStatutesDb}></StatutesList>
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
                {sectionsview}

            </ThemeProvider>
        )
    }
}