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

    text: {
        marginTop: 25,
        color: '#ffffff',
    },

    body: {
        marginBottom: '120%',
    },
});