import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { ListItem, Text } from 'react-native-elements';



export default class SectionsList extends Component {

    constructor(props) {
        super(props)
    }

    styles = StyleSheet.create({
        subtitleView: {
            flexDirection: 'row',
            paddingLeft: 10,
            paddingTop: 5
        },
        ratingImage: {
            height: 19.21,
            width: 100
        },
        ratingText: {
            paddingLeft: 10,
            color: 'grey'
        }
    })

    render() {
        console.log(this.props.sections);
        return (

            <View>
                {
                    this.props.sections.map((item, i) =>
                        <ListItem key={i}
                            title={item.Description}
                            subtitle={
                                <View>
                                    <Text>{item.Section}</Text>
                                </View>}
                            bottomDivider
                            chevron
                        >
                        </ListItem>

                    )
                }
            </View>



        )
    }
}