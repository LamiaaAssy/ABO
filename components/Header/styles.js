import { StyleSheet } from 'react-native';
import { calcHeight, calcWidth } from '../../Dimension';
import Colors from '../../assets/Colors';
import { color } from 'react-native-reanimated';



const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: calcHeight(70),
        justifyContent: 'flex-end',
        zIndex: 10001,
        backgroundColor: Colors.theme,
        justifyContent: "center"
    },

    child: {
        flexDirection: "row",
        alignItems: 'flex-end',
        width: "100%",
    },

    leftButton: {
        paddingVertical: calcWidth(10),
        paddingLeft: calcWidth(20),
        paddingRight: calcWidth(8),
        color: Colors.Whitebackground
    },
    titleText: {
        fontFamily: "Roboto-Medium",
        fontSize: calcWidth(18),
        color: Colors.Whitebackground,
        alignSelf: "center",
        maxWidth: calcWidth(300),

    }


});

export default styles;
