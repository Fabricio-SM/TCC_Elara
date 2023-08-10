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
        width: '90%',       
    },

    rowView: {
        marginLeft: 20,
        flexDirection:'row',
        justifyContent: 'space-between',
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
        marginLeft: 8,
        color: THEME.COLORS.TEXT,
        fontSize: 18,
    },
});