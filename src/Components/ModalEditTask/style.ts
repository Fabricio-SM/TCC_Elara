import { StyleSheet } from 'react-native';
import { THEME } from "../../Themes/index";

export const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
    },

    content: {
        width: 389,
        height: 350,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
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
        alignSelf: 'flex-end',
        margin: 16
    },

    textButton: {
        marginTop: 6,
        color: THEME.COLORS.TEXT,
        fontSize: 18,
    }
});