import { THEME } from "../../Themes";
import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    view: {
        marginTop: 80,
        width: '90%',       
    },

    rowView: {
        marginLeft: 20,
        flexDirection:'row',
        justifyContent: 'space-between',
    },

    label: {
        color: '#ffffff',
        fontSize: 30,
        textAlign: 'center',
        marginBottom: 20,
    },

    hr:{
        borderBottomColor: 'white',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    
    colView: {
        flexDirection:'column',
        justifyContent: 'center',
    },

    view2: {
        height: '30%',      
    },

    label2: {
        color: '#ffffff',
        marginTop: 10,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },

    text: {
        color: '#ffffff',
        marginTop: 25,
        marginBottom: 5,
        textAlign: 'left',
        fontSize: 18,

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