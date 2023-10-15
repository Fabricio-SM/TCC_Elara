import { THEME } from "../../Themes";
import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    label2: {
        color: '#ffffff',
        marginTop: 10,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },

    label: {
        color: '#ffffff',
        fontSize: 30,
        textAlign: 'center',
        marginBottom: 20,
    },

    text: {
        color: '#ffffff',
        marginTop: 25,
        marginBottom: 5,
        textAlign: 'left',
        fontSize: 18,

    },

    view: {
        marginTop: 80,
        width: '90%',       
    },

    view2: {
        height: '30%',      
    },


    rowView: {
        marginLeft: 20,
        flexDirection:'row',
        justifyContent: 'space-between',
    },

    colView: {
        flexDirection:'column',
        justifyContent: 'center',
    },

    hr:{
        borderBottomColor: 'white',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },

    body: {
        marginBottom: '120%',
    },

    pressable: {
        padding: 8,
        flexDirection:'row',
        borderColor: '#ffffff',
    },

    textButton: {
        marginTop: 5,
        color: THEME.COLORS.TEXT,
        fontSize: 18,
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