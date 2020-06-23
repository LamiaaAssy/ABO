import React, { Component } from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    FlatList,
} from 'react-native';
import Colors from '../assets/Colors'
import Header from '../components/Header';
import { calcRatio, calcWidth, calcHeight } from '../Dimension';
import ExploreDonnersCard from '../components/Cards/ExploreDonnerCard'

class ExploreDonners extends Component {
    state = {
        DonorData: [
            {
                id: '1',
                name: 'ahmed mohamed',
                BloodType: 'A+',
                adress: '15, Ramsis st. Cairo',
                photo: require('../assets/images/profile_user.png')
            },
            {
                id: '2',
                name: 'ahmed mohamed hassan',
                BloodType: 'O-',
                adress: '15, Ramsis st. Cairo',
                photo: require('../assets/images/profile_user.png')
            },
            {
                id: '3',
                name: 'samar',
                BloodType: 'AB+',
                adress: '15, Ramsis st. Cairo',
                photo: require('../assets/images/profile_user.png')
            },
            {
                id: '4',
                name: 'ahmed mohamed ahmed',
                BloodType: 'B+',
                adress: '15, Ramsis st. Cairo',
                photo: require('../assets/images/profile_user.png')
            },
            {
                id: '5',
                name: 'ahmed mohamed ahmed',
                BloodType: 'B+',
                adress: '15, Ramsis st. Cairo',
                photo: require('../assets/images/profile_user.png')
            },
            {
                id: '6',
                name: 'ahmed mohamed ahmed',
                BloodType: 'B+',
                adress: '15, Ramsis st. Cairo',
                photo: require('../assets/images/profile_user.png')
            },
        ]
    }

    render() {
        return (
            <>
                <View style={styles.container}>

                    <Header title={"Explore donners"} navigation={this.props.navigation} />

                    <ScrollView>
                        <View style={styles.Page}>

                            <FlatList
                                data={this.state.DonorData}
                                renderItem={({ item }) => <ExploreDonnersCard photo={item.photo} name={item.name} BloodType={item.BloodType} adress={item.adress} />} />

                        </View>
                    </ScrollView>
                </View>

            </>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.Whitebackground,
        // padding: 15
    },
    Page: {
        alignItems: 'center',
        marginTop: calcHeight(14),
    },

})

export default ExploreDonners;