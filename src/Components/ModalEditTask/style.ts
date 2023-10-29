import { StyleSheet } from 'react-native';
import { THEME } from "../../Themes/index";

export const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
    },

    content: {
        width: "95%",
        height: "42%",
        padding: 5,
        backgroundColor: THEME.COLORS.MODAL_COLOR,
        borderRadius: 8,

    },

    text: {
        fontSize: THEME.FONT_SIZE.MD,
        color: "white"
    },

    button2: {
        marginTop: 20,
        alignSelf: 'center',
        alignItems: 'center',
        width: 210,
        height: 40,
        backgroundColor: THEME.COLORS.BUTTON_COLOR_SUCCESS,
        borderRadius: 7
    },

    closeIcon: {
        alignSelf: 'flex-start',
        margin: 16,
    },

    textButton: {
        marginTop: 6,
        color: THEME.COLORS.TEXT,
        fontSize: 18,
    },

    sizedBox: {
        width: "10%",
    },

    rowView: {
        flexDirection:'row',
        justifyContent: 'space-between',
    },

    rowView2: {
        marginTop: "6%",
        flexDirection:'row',
        justifyContent: 'space-between',
    },

    colView: {
        marginTop: "9%",
        flexDirection:'column',
        justifyContent: 'space-between',
    },
});