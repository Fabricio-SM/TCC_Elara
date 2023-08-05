import { StyleSheet } from 'react-native';
import { THEME } from '../../Themes/index';

export const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.COLORS.BACKGROUND,
        color: THEME.COLORS.TEXT,
        alignItems: 'center',
        justifyContent: 'center',
    },
    
    image: {
        width: 250,
        height: 200,
    }
})