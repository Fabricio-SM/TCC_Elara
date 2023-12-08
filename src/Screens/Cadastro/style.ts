import { THEME } from "../../Themes";
import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    view: {
        marginTop: 80,
        width: '70%',
        
    },

    label: {
        color: '#ffffff',
        fontSize: 30,
        textAlign: 'center',
        marginBottom: 20,
    },

    rowView: {
        flexDirection:'row',
        justifyContent: 'space-around',
    },

    button: {
        marginTop: 20,
        alignSelf: 'center',
        alignItems: 'center',
        width: 100,
        height: 40,
        backgroundColor: THEME.COLORS.BUTTON_COLOR_SUCCESS,
        borderRadius: 7,
    },

    textButton: {
        marginTop: 6,
        color: THEME.COLORS.TEXT,
        fontSize: 18,
    },

    button2: {
        marginTop: 20,
        alignSelf: 'center',
        alignItems: 'center',
        width: 100,
        height: 40,
        backgroundColor: THEME.COLORS.BUTTON_COLOR_ALERT,
        borderRadius: 7,
    },
    
});