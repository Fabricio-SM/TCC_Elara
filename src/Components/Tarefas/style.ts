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
        marginTop: 5,
        marginBottom: 5,
        fontSize: 15,
    },

    icon: {
        marginTop: '6.5%',
    },

    hr:{
        borderBottomColor: 'white',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
})