import React from "react";
import { Modal, ModalProps, Pressable, Text, View, TouchableOpacity } from "react-native";
import { style } from "./style";
import { Icon } from "react-native-elements";
import { THEME } from "../../Themes";

type Props = ModalProps & {
    message: string;
    onClose: () => void;
    handleApiDelete: () => void;
}


export function ModalExclude({ message, onClose, handleApiDelete, ...rest }: Props) {
    return (
        <Modal
            animationType="fade"
            transparent
            statusBarTranslucent
            {...rest}
        >
            <View style={style.container}>
                <View style={style.content}>
                <TouchableOpacity style={style.closeIcon} onPress={onClose}>
                    <Icon
                        name='close'
                        size={20}
                        color={THEME.COLORS.TEXT}
                    />
                </TouchableOpacity>


                    <Text style={style.text}>{message}</Text>

                    <Pressable style={style.button2} onPress={handleApiDelete}>
                        <Text style={style.textButton}>Excluir</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );


}