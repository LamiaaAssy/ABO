import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, TextInput, Keyboard, ShadowPropTypesIOS, StatusBar } from 'react-native';
import styles from './styles';
import Header from '../../components/Header';
import { calcHeight, calcWidth } from '../../Dimension';
import MapView, { Marker, AnimatedRegion } from 'react-native-maps';
import { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';


export default Maps = (props) => {


    //State Hooks  *make it const*
    const [haveAccessLocation, setHaveAccessLocation] = useState(false)
    const [currentRegion, setCurrentRegion] = useState(
        {
            region: new AnimatedRegion({
                latitude: 30.033333,
                longitude: 31.233334,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            })
        }
    )
    const [markerPlace, setMarkerPlace] = useState({
        latitude: 30.033333,
        longitude: 31.233334,
    })


    useEffect(() => {
        checkPermessions()
    }, [])

    useEffect(() => {
        if (haveAccessLocation) {
            Geolocation.getCurrentPosition(
                (position) => {
                    let newRegion = {
                        region: new AnimatedRegion({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                            latitudeDelta: 0.05,
                            longitudeDelta: 0.05,
                        })
                    }

                    let newMarkerPlace = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    }

                    setCurrentRegion(newRegion)
                    setMarkerPlace(newMarkerPlace)
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




    //Render
    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor={"transparent"} barStyle={"dark-content"}></StatusBar>

            <Header title={"Map"} navigation={props.navigation} />

            <MapView
                region={currentRegion}
                style={{ width: "100%", height: "86.5%", marginTop: calcHeight(25) }}
            >
                <Marker
                    coordinate={markerPlace}
                // title={marker.title}
                // description={marker.description}
                />
            </MapView>


        </View>
    )

}
