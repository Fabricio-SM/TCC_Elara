import React from "react";
import { Modal, ModalProps, Pressable, Text, View, TouchableOpacity } from "react-native";
import { style } from "./style";
import { Icon } from "react-native-elements";
import { THEME } from "../../Themes";
import { Input } from "../Input/Input";
import Checkbox from "expo-checkbox";

type Props = ModalProps & {
    onClose: () => void;
    updateTask: () => void;
}


export function ModalEditTask({ onClose, updateTask ,...rest }: Props) {
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

                    <Input labelValue="Nome da tarefa: " />
                    <Input labelValue="Data de entrega: " />

                    <View>
                        <Text style={style.text}>Tarefa concluída: </Text>
                        <Checkbox />
                    </View>

                    <Pressable style={style.button2} onPress={updateTask}>
                        <Text style={style.textButton}>Salvar alteracões</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );


}