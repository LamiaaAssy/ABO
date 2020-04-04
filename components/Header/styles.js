import { StyleSheet } from 'react-native';
import { calcHeight, calcWidth } from '../../assets/metrics';
import Colors from '../../assets/Colors';



const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: calcHeight(70),
        justifyContent: 'flex-end',
        zIndex: 10001,
        // backgroundColor: Colors.Graybackground
    },

    child: {
        flexDirection: "row",
        alignItems: 'flex-end',
        width: "100%",
    },

    leftButton: {
        paddingVertical: calcWidth(10),
        paddingLeft: calcWidth(20),
        paddingRight: calcWidth(8)
    },
    titleText: {
        fontFamily: "Roboto-Medium",
        fontSize: calcWidth(18),
        color: Colors.theme,
        alignSelf: "center",
        maxWidth: calcWidth(300)
    }


});

export default styles;
