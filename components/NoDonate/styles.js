import { StyleSheet } from 'react-native';
import { calcHeight, calcWidth } from '../../Dimension';
import Colors from '../../assets/Colors';



const styles = StyleSheet.create({
    container: {
        width: calcWidth(325),
        alignItems: "center",
        backgroundColor: Colors.Whitebackground,
        borderRadius: calcWidth(10),

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
        paddingVertical: calcHeight(14)
    },
    topView: {
        height: calcHeight(58),

        // backgroundColor: "red",
        width: calcWidth(285),
        flexDirection: "row",
        alignItems: "center"
    },
    lastDonateTextView: {
        justifyContent: "center",
        height: "100%",
        width: calcWidth(185),
        marginRight: calcWidth(5),
        // backgroundColor: "green"
    },
    lastDonateText: {
        fontFamily: "Montserrat-Bold",
        paddingHorizontal: calcWidth(10),
        fontSize: calcWidth(20),
        color: "#FD554F",
        alignSelf: "flex-start"
    },
    tillText: {
        fontFamily: "Montserrat-Regular",
        color: "#7C7C7C",
        marginLeft: calcWidth(10),
    }




});

export default styles;