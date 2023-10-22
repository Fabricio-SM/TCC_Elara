import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    view: {
        marginTop: 80,
        width: '100%',       
    },

    rowView: {
        marginLeft: 20,
        flexDirection:'row',
        justifyContent: 'space-between',
    },

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

    hr:{
        borderBottomColor: 'white',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },

    rowView2: {
        padding: 5,
        flexDirection:'row',
        justifyContent: 'space-between',
        backgroundColor : '#464545',
    },

    pressable: {
        borderColor: '#ffffff',
    },

    view2: {
        height: '50%',
        width: '100%',   
        backgroundColor: '#2c2c2c',  
    },

});