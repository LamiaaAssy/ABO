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


export default Calendaar = (props) => {
    // setAppLanguage("en", true);

    //State Hooks  *make it const*

    const [markedDate, setMarkedDate] = useState({ [moment().format("YYYY-MM-DD")]: { selected: true, marked: true } })


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






    //Render
    return (
        <View style={styles.container}>

            <Header title={strings("calendar")} navigation={props.navigation} />


            <View style={{ marginTop: calcHeight(33), width: calcWidth(363) }}>
                {/* <AnimatedLinearGradient customColors={["#FD554F", "#DD1107"]} speed={1500} /> */}

                <Calendar

                    maxDate={new Date()}
                    // Handler which gets executed on day press. Default = undefined
                    onDayPress={(day) => { changeSelected(day) }}
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

            <View style={styles.noDonate}>
                <NoDonate
                    lastDonate={"06 June"}
                    donateTill={"07 Sep"}
                />
            </View>


        </View>
    )

}
