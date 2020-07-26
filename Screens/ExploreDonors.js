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
import ExploreDonnersCard from '../components/Cards/ExploreDonnerCard';
import ImageBackground from '../components/Background';

class ExploreDonners extends Component {

    componentDidMount() {
        console.log('data', this.props.navigation.getParam('Users_data'))
    }
    render() {
        return (
            <>
                <View style={styles.container}>

                    <Header title={"Donners"} navigation={this.props.navigation} />

                    <ScrollView>
                        <ImageBackground>
                            <View style={styles.Page}>
                                    <FlatList
                                data={this.props.navigation.getParam('Users_data')}
                                renderItem={({ item }) => <ExploreDonnersCard useId={item.useId} photo={item.image} name={item.name} BloodType={item.bloodType} adress={item.address} />} />

                            </View>
                        </ImageBackground>
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