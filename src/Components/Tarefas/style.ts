import { StyleSheet } from 'react-native';

export const style = StyleSheet.create({
    rowView: {
        marginLeft: 20,
        flexDirection:'row',
        justifyContent: 'space-between',
    },

    colView: {
        flexDirection:'column',
        justifyContent: 'space-between',
    },

    labeltext: {
        color: '#ffffff',
        marginTop: 10,
        fontSize: 18,
    },

    checkbox: {
        margin: 8,
    },

    hr:{
        borderBottomColor: 'white',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
})