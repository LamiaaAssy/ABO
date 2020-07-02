import { StyleSheet } from 'react-native';
import Colors from "../../assets/Colors"
import { calcHeight } from '../../Dimension';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Colors.Graybackground,
    },
    noDonate: {
        marginTop: calcHeight(50),
        justifyContent: "center",
        alignItems: "center",
        width: "100%"
    }


});

export default styles;