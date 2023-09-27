import { THEME } from "../../Themes";
import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    label2: {
        color: '#ffffff',
        marginTop: 10,
        textAlign: 'left',
        fontSize: 18,
    },

    label: {
        color: '#ffffff',
        fontSize: 30,
        textAlign: 'center',
        marginBottom: 20,
    },

    text: {
        marginTop: 25,
        color: '#ffffff',

    },

    view: {
        marginTop: 80,
        width: '100%',       
    },

    view2: {
        height: '50%',
        width: '100%',   
        backgroundColor: '#2c2c2c',  
    },

    rowView: {
        marginLeft: 20,
        flexDirection:'row',
        justifyContent: 'space-between',
    },

    rowView2: {
        padding: 5,
        flexDirection:'row',
        justifyContent: 'space-between',
        backgroundColor : '#464545',
    },

    hr:{
        borderBottomColor: 'white',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },

    body: {
        marginBottom: '120%',
    },

    pressable: {
        borderColor: '#ffffff',
    },

    button: {
        marginTop: 20,
        alignSelf: 'center',
        alignItems: 'center',
        width: 100,
        height: 40,
        backgroundColor: THEME.COLORS.BUTTON_COLOR_LINK,
        borderRadius: 7,
    },

    hIcon: {
        color: '#ffffff',
        size: 18,
    },
});