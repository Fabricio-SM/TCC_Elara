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
        height: "21%",
        alignItems: 'center',
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
        width: 80,
        height: 40,
        backgroundColor: THEME.COLORS.BUTTON_COLOR_ALERT,
        borderRadius: 7
    },

    closeIcon: {
        alignSelf: 'flex-start',
        margin: 1
    },

    textButton: {
        marginTop: 6,
        color: THEME.COLORS.TEXT,
        fontSize: 18,
    },

    rowView: {
        marginTop: "6%",
        flexDirection:'row',
        justifyContent: 'space-between',
    },

    colView: {
        marginTop: "8%",
        flexDirection:'column',
        justifyContent: 'space-between',
    },
});