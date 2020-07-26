import { StyleSheet } from 'react-native';
import Colors from "../../assets/Colors"
import { calcHeight, calcWidth } from '../../Dimension';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Colors.Graybackground,
    },
    mainView: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    textInputStyle: {
        position: "absolute",
        width: "90%",
        paddingVertical: calcHeight(10),
        paddingHorizontal: calcWidth(20),
        top: calcHeight(80),
        zIndex: 10000,
        backgroundColor: "white",
        borderRadius: calcWidth(30),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    titleText: {
        fontFamily: "Roboto-Medium",
        fontSize: calcWidth(18),
        color: Colors.Whitebackground,
        alignSelf: "center",
        maxWidth: calcWidth(300)
    }


});

export default styles;
