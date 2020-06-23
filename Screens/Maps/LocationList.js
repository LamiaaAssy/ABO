import React, { useState, useEffect } from 'react';
import { View, StatusBar } from 'react-native';
import styles from './styles';
import Header from '../../components/Header';
import { calcHeight, calcWidth } from '../../Dimension';
import { strings, getAppLanguage } from '../../assets/Local/localLanguagesController';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { googleMapKey } from '../../Constants';


export default LocationList = (props) => {

    //State Hooks  *make it const*
    useEffect(() => {
        console.log("beeeeb", props.navigation.getParam("location"))
    }, [])


    //Render
    return (
        <View style={styles.container}>

            <StatusBar translucent backgroundColor={"transparent"} barStyle={"dark-content"}></StatusBar>

            <Header title={strings("loc")} navigation={props.navigation} />

            <GooglePlacesAutocomplete
                placeholder={strings('loc')}
                // minLength={2} // minimum length of text to search
                autoFocus={true}
                value={"Ehab"}
                returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                listViewDisplayed='auto'  // true/false/undefined
                fetchDetails={true}
                renderDescription={row => row.description} // custom description render
                textInputProps={{ clearButtonMode: 'while-editing' }}
                onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                    if (details != null) {
                        props.navigation.state.params.updateRegion(details.geometry.location.lat, details.geometry.location.lng)
                        props.navigation.goBack()
                    }
                }}
                query={{
                    key: googleMapKey,
                    language: getAppLanguage(), // language of the results
                    region: "EG",
                }}
                styles={{
                    container: {
                        marginTop: calcHeight(10)
                    },
                    textInputContainer: {
                        width: '100%',
                        backgroundColor: "#fff"
                    },
                    description: {
                        fontWeight: 'bold'
                    },
                    description: {
                        color: "#000"
                    },
                    predefinedPlacesDescription: {
                        color: "#000"
                    },
                }}
                renderDescription={(row) => row.description || row.formatted_address || row.name}
                nearbyPlacesAPI='GoogleReverseGeocoding' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                GoogleReverseGeocodingQuery={{
                    key: googleMapKey,
                    language: getAppLanguage(),
                    region: "EG",
                }}
                GooglePlacesSearchQuery={{
                    rankby: 'distance',
                    types: 'establishment',
                    language: getAppLanguage(),
                    region: "EG",
                }}

                debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
            />



        </View>
    )

}
