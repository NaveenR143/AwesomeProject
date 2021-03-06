import React, { Component } from 'react';
import { View } from 'react-native';
import { ListItem } from 'react-native-elements';

export default class StatesList extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        console.log(this.props.states);
        return (

            <View>
                {
                    this.props.states.map((item, i) =>
                        <ListItem key={i}
                            title={item.StateName}
                            onPress={() => this.props.funcFetchStatutes(item.StateID)}
                        >
                        </ListItem>

                    )
                }
            </View>

            // <FlatList

            //     data={this.props.states}
            //     renderItem={({ item }, i) =>

            //         <ListItem key={i}
            //             divider
            //             centerElement={{
            //                 primaryText: item.StateName,
            //             }}
            //             onPress={() => { }}
            //         />

            //     }
            // />

        )
    }
}