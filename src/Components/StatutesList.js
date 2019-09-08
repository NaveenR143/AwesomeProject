import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';

export default class StatutesList extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        console.log(this.props.statutes);
        return (

            <ScrollView>
                {
                    this.props.statutes.map((item, i) =>
                        <ListItem key={i}
                            title={item.StatuteName}
                            onPress={() => this.props.funcFetchStatutesDB(item.StatuteShortName)}
                        >
                        </ListItem>


                    )
                }
            </ScrollView>
        )
    }
}