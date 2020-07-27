import React, { useState, useEffect, Component } from 'react';
import { View, TouchableOpacity, Text, TextInput, Keyboard, ShadowPropTypesIOS } from 'react-native';
import styles from './styles';
import { strings, setAppLanguage } from '../../assets/Local/localLanguagesController';
import AnimatedLinearGradient from 'react-native-animated-linear-gradient'
import Header from '../../components/Header';
import { calcHeight, calcWidth } from '../../Dimension';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import Colors from '../../assets/Colors';
import moment from 'moment';
import NoDonate from '../../components/NoDonate';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import ImageBackground from '../../components/Background'

export default Calendaar = (props) => {
    // setAppLanguage("en", true);

    //State Hooks  *make it const*

    const [lastDonation, setLastDonation] = useState(null)
    const [tillDonation, setTillDonation] = useState(null)
    const [reqID, setReqID] = useState([])
    const [markedDate, setMarkedDate] = useState({
        [moment().format("YYYY-MM-DD")]: {
            selected: true, marked: false
        },
    })

    useEffect(() => {
        database()
            .ref('/users/' + auth().currentUser.uid)
            .on('value', snapshot => {
                // console.log("Ehab", snapshot.val().informations)
                let informatios = snapshot.val().informations
                let lastDonate = informatios.last_donation
                let newDate = new Date()

                if (lastDonate && lastDonate.day != 0 && lastDonate.month != 0 && lastDonate.year != 0) {
                    newDate.setFullYear(
                        parseInt(lastDonate.year), parseInt(lastDonate.month) - 1, parseInt(lastDonate.day)
                    )
                    // console.log(newDate)
                    setLastDonation(newDate)
                }

                let tillDonate = informatios.next_donation
                let newtillDate = new Date()
                if (tillDonate) {
                    if (tillDonate.year == 0 && tillDonate.month == 0 && tillDonate.day == 0) {
                        setTillDonation(null)
                    }
                    else {
                        newtillDate.setFullYear(
                            parseInt(tillDonate.year), parseInt(tillDonate.month) - 1, parseInt(tillDonate.day)
                        )
                        setTillDonation(newtillDate)
                    }

                }

                //Dates
                let dates = snapshot.val().AcceptedReq
                let markedDateVar = { ...markedDate }
                let reqIDVar = { ...reqID }

                for (key in dates) {
                    if (dates[key].DoneDate) {

                        let calDate = new Date()

                        if (dates[key].DoneDate) {
                            console.log(dates[key].DoneDate)
                            calDate.setFullYear(
                                parseInt(dates[key].DoneDate.Year), parseInt(dates[key].DoneDate.Month) - 1, parseInt(dates[key].DoneDate.Day)
                            )

                            console.log("Ehab data : ", calDate)

                            markedDateVar[moment(calDate).format("YYYY-MM-DD")] = {
                                marked: true,
                                selected:
                                    markedDateVar[moment(calDate).format("YYYY-MM-DD")] && markedDateVar[moment(calDate).format("YYYY-MM-DD")].selected ? true : false
                            }

                            reqIDVar[moment(calDate).format("YYYY-MM-DD")] = key

                            setReqID(reqIDVar)
                            setMarkedDate(markedDateVar)
                            // console.log(markedDate)
                        }


                        // markedDateVar.push()
                    }
                }

            })


    },
        [])

    let changeSelected = (day) => {
        let found = false
        let newMarkedData = { ...markedDate }
        for (var key in newMarkedData) {
            if (day.dateString == key) {

                if (newMarkedData[key]["marked"] === true) {
                    newMarkedData[key] = { selected: true, marked: true }
                }
                else {
                    newMarkedData[key] = { selected: true }
                }
                found = true
            }
            else if (newMarkedData[key]["selected"]) {
                if (newMarkedData[key]["marked"] === true) {
                    newMarkedData[key] = { selected: false, marked: true }
                }
                else {
                    newMarkedData[key] = { selected: false }
                }
            }
        }

        if (!found) {
            newMarkedData[day.dateString] = { selected: true }
        }

        // alert(JSON.stringify(markedDate))
        setMarkedDate(newMarkedData)


    }




    console.log("Ehab : ", reqID)

    //Render
    return (
        <View style={styles.container}>

            <Header title={strings("calendar")} navigation={props.navigation} />
            <ImageBackground>

                <View style={{ marginTop: calcHeight(33), width: calcWidth(363) }}>
                    {/* <AnimatedLinearGradient customColors={["#FD554F", "#DD1107"]} speed={1500} /> */}

                    <Calendar

                        maxDate={new Date()}
                        // Handler which gets executed on day press. Default = undefined
                        onDayLongPress={(day) => {
                            if (reqID[day.dateString]) {
                                props.navigation.navigate("RequestDetails", { ReqID: reqID[day.dateString] })
                            }
                        }}
                        // Handler which gets executed on day long press. Default = undefined
                        // onDayLongPress={(day) => { console.log('selected day', day) }}
                        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                        monthFormat={'MMMM yyyy'}
                        // Handler which gets executed when visible month changes in calendar. Default = undefined
                        onMonthChange={(month) => { console.log('month changed', month) }}

                        // Do not show days of other months in month page. Default = false
                        hideExtraDays={true}
                        // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
                        // day from another month that is visible in calendar page. Default = false
                        disableMonthChange={false}
                        // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
                        firstDay={6}
                        // Hide day names. Default = false
                        hideDayNames={false}
                        // Show week numbers to the left. Default = false
                        showWeekNumbers={false}
                        // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                        onPressArrowLeft={substractMonth => substractMonth()}
                        // Handler which gets executed when press arrow icon right. It receive a callback can go next month
                        onPressArrowRight={addMonth => addMonth()}
                        // Disable left arrow. Default = false
                        disableArrowLeft={false}
                        // Disable right arrow. Default = false
                        disableArrowRight={false}
                        style={{
                            borderRadius: calcHeight(6),
                            overflow: "hidden",
                            paddingVertical: calcHeight(20)
                        }}
                        theme={{
                            backgroundColor: Colors.theme,
                            calendarBackground: Colors.theme,
                            textSectionTitleColor: '#FFFDFD',
                            selectedDayBackgroundColor: '#F5F6F8',
                            selectedDayTextColor: '#DD1107',
                            todayTextColor: '#FFFFFF',
                            dayTextColor: '#FFFFFF',
                            textDisabledColor: '#C7C7CD',
                            dotColor: '#FFFFFF',
                            selectedDotColor: '#DD1107',
                            arrowColor: '#FFFFFF',
                            disabledArrowColor: '#C7C7CD',
                            monthTextColor: '#FFFFFF',
                            textDayFontFamily: 'Roboto-Regular',
                            textMonthFontFamily: 'Roboto-Regular',
                            textDayHeaderFontFamily: 'Roboto-Regular',
                            textDayFontWeight: '300',
                            textMonthFontWeight: 'bold',
                            textDayHeaderFontWeight: '300',
                            textDayFontSize: calcWidth(14),
                            textMonthFontSize: calcWidth(16),
                            textDayHeaderFontSize: calcWidth(14)
                        }}

                        markedDates={
                            markedDate
                        }


                    />
                </View>

                {lastDonation && <View style={styles.noDonate}>
                    <NoDonate
                        lastDonate={moment(lastDonation).format("D MMM")}
                        donateTill={tillDonation ? moment(tillDonation).format("D MMM") : null}
                    />
                </View>
                }

            </ImageBackground>
        </View>
    )

}