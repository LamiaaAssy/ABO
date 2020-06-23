import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, TextInput, StatusBar } from 'react-native';
import styles from './styles';
import Header from '../../components/Header';
import { calcHeight, calcWidth } from '../../Dimension';
import MapView from 'react-native-maps';
import { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import Marker from '../../assets/svgs/Marker';
import { strings } from '../../assets/Local/localLanguagesController';
import Geocoder from 'react-native-geocoding';
import { googleMapKey } from '../../Constants';
import AsyncStorage from '@react-native-community/async-storage';

Geocoder.init(googleMapKey); // use a valid API key

export default Maps = (props) => {

    //State Hooks  *make it const*
    const [haveAccessLocation, setHaveAccessLocation] = useState(false)
    const [currentRegion, setCurrentRegion] = useState(
        null
    )
    const [initRegion, setInitRegion] = useState(
        null
    )

    const [location, setLocation] = useState(
        ""
    )

    useEffect(() => {
        checkPermessions()
    }, [])

    useEffect(() => {
        if (haveAccessLocation) {
            console.log("Test ehab")
            Geolocation.getCurrentPosition(
                (position) => {
                    Geocoder.from(position.coords.latitude, position.coords.longitude)
                        .then(json => {
                            var addressComponent = json.results[0].formatted_address;
                            console.log("Ehab : format ", addressComponent);

                            setLocation(addressComponent)
                        })
                        .catch(error => console.warn(error));

                    let newRegion = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }
                    setInitRegion(newRegion)
                    console.log(position);
                },
                (error) => {
                    // See error code charts below.
                    console.log(error.code, error.message);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
        }
    }, [haveAccessLocation])


    const checkPermessions = () => {
        check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
            .then((result) => {
                switch (result) {
                    case RESULTS.UNAVAILABLE:
                        console.log(
                            'This feature is not available (on this device / in this context)',
                        );
                        break;
                    case RESULTS.DENIED:
                        requestPermession()
                        break;
                    case RESULTS.GRANTED:
                        console.log('The permission is granted');
                        setHaveAccessLocation(true)
                        break;
                    case RESULTS.BLOCKED:
                        requestPermession()
                        break;
                }
            })
            .catch((error) => {
                // …
            });
    }


    const requestPermession = () => {
        request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(() => {
            checkPermessions()
        });
    }


    const updateRegion = (lat, lon, latD = 0.01, LonD = 0.01) => {
        console.log("I anm here now : ", latD, LonD)


        setCurrentRegion({
            latitude: lat,
            longitude: lon,
            latitudeDelta: latD,
            longitudeDelta: LonD,
        })

        Geocoder.from(lat, lon)
            .then(json => {
                var addressComponent = json.results[0].formatted_address;
                console.log("Ehab : format ", addressComponent);
                setLocation(addressComponent)

            })
            .catch(error => console.warn(error));
    }




    //Render
    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor={"transparent"} barStyle={"dark-content"}></StatusBar>


            <View style={styles.mainView}>

                <View style={{ position: "absolute", top: 0, width: "100%", zIndex: 1000 }}>
                    <Header title={strings("map")} navigation={props.navigation} />

                    <TouchableOpacity style={{
                        paddingVertical: calcHeight(5),
                        paddingLeft: calcWidth(20),
                        paddingRight: calcWidth(8),
                        position: "absolute",
                        bottom: 0,
                        right: calcWidth(20),
                        zIndex: 10000001
                    }}
                        onPress={() => {
                            let regionData = {
                                lat: currentRegion.latitude,
                                lon: currentRegion.longitude,
                                text: location
                            }
                            props.navigation.state.params.callBack(regionData)
                            props.navigation.goBack()
                        }}
                    >
                        <Text numberOfLines={1} style={styles.titleText}>{strings("done")}</Text>

                    </TouchableOpacity>
                </View>

                <TextInput
                    selection={{ start: 0 }}
                    style={styles.textInputStyle}
                    placeholder={strings("loc")}
                    value={location}
                    onFocus={() => {
                        props.navigation.navigate("LocationList", { updateRegion, location })
                    }}
                />

                <MapView
                    initialRegion={initRegion}
                    region={currentRegion}
                    style={{ width: "100%", height: "100%" }}
                    onRegionChangeComplete={(region) => {
                        updateRegion(
                            region.latitude, region.longitude, region.latitudeDelta, region.longitudeDelta
                        )
                    }
                    }
                />

                <View style={{ position: "absolute" }}>
                    <Marker />
                </View>

            </View>


        </View>
    )

}
