import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import Colors from '../assets/Colors';
import { calcWidth } from '../Dimension';
class matching extends Component {
    constructor(props) {
        super(props)
        this.state = {
            patientlocation: {
                'name': 'fesal',
                'lon': 30.013487,
                'lat': 31.198405
            },
            donnerlocation: [{
                'name': 'manial',
                'lon': 30.019825,
                'lat': 31.225536
            }, {
                'name': 'october',
                'lon': 29.931172,
                'lat': 30.881183
            },
            {
                'name': 'westElbalad',
                'lon': 30.047556,
                'lat': 31.234143
            },
            {
                'name': 'dokki',
                'lon': 30.03836,
                'lat': 31.202611
            },
            ],

        }
    }

    componentDidMount() {
        console.log(this.state.donnerlocation.length)
        this.getdef()
    }
    getdef() {
        let def = []
        for (let index = 0; index < this.state.donnerlocation.length; index++) {
            def.push({
                'name': this.state.donnerlocation[index]['name'],
                'lat': Math.abs(this.state.patientlocation['lat'] - this.state.donnerlocation[index]['lat']),
                'lon': Math.abs(this.state.patientlocation['lon'] - this.state.donnerlocation[index]['lon'])
            })
        }
        //console.log(def)
        let Outcomes = []
        for (let index = 0; index < def.length; index++) {
            Outcomes.push({
                'name': def[index]['name'],
                'Outcome': (Math.sqrt(Math.pow(def[index]['lat'], 2) + Math.pow(def[index]['lon'], 2)))
            })
            //console.log('hhh' + Outcomes)
        }
        Outcomes.sort(function (a, b) {
            return a.Outcome - b.Outcome;
        })
        console.log(Outcomes)
    }

    render() {
        return (
            <View>
                <Text style={{ fontSize: calcWidth(20), marginBottom: 30 }}>patient location: </Text>
                <TouchableOpacity style={{ backgroundColor: Colors.theme, }}><Text style={{ fontSize: calcWidth(20) }}>search donner</Text></TouchableOpacity>
                <Text style={{ fontSize: calcWidth(20), marginTop: 30 }}>donner location:</Text>
            </View>
        )
    }
}

export default matching;