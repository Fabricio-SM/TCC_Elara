import { StyleSheet } from 'react-native';
import { THEME } from '../../Themes/index';

export const style = StyleSheet.create({
    input: {
        width: '100%',
        height: 40,
        alignSelf: "center",
        backgroundColor: THEME.COLORS.INPUT_BACKGROUND,
        color: THEME.COLORS.TEXT,
        borderRadius: 7,
        padding: 10,
    }
});