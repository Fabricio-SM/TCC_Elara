import React, { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm ,Controller } from "react-hook-form";
import DateTimePicker from "@react-native-community/datetimepicker";
import Checkbox from "expo-checkbox";
import { Icon } from "react-native-elements";
import { Modal, ModalProps, Pressable, Text, View, TouchableOpacity } from "react-native";

import { style } from "./style";
import { THEME } from "../../Themes";
import { Input } from "../Input/Input";
import { convertDateToString, convertTimestampToDate } from "../../utils/convertDate";


type Props = ModalProps & {
    onClose: () => void;
    updateTask: (body: any) => void;
    nomeTarefa: string;
    dataEntrega: Date;
    concluido: boolean;
}

type FormProps = {
    nome: string,
}

const schema = yup.object({
    nome: yup.string().required('Informe um nome válido'),
});

export function ModalEditTask({ onClose, nomeTarefa, dataEntrega, concluido, updateTask, ...rest }: Props) {
    const [show, setShow] = useState<boolean>(false);
    const [date, setDate] = useState<Date | null>(dataEntrega || null);
    const [isChecked, setIsChecked] = useState<boolean>(concluido);

    const { control, handleSubmit, formState: { errors } } = useForm<FormProps>({
        resolver: yupResolver(schema),
    });
    

    function verifyIfDateIsNull() {
        if (date == null) {
            return new Date();
        }
        else {
            return new Date(date);
        }
    }

    const onChange = (selectedDate: any) => {
        setShow(false);

        const timestamp = selectedDate.nativeEvent.timestamp;
        const timeStampConverted = convertTimestampToDate(timestamp);

        setDate(timeStampConverted);
    };

    function handleRequestToUpdateTask({nome}: FormProps) {
        const body = {
            nomeTarefa: nome,
            dataEntrega: date,
            concluida: isChecked
        }

        updateTask(body);
    }

    return (
        <Modal
            animationType="fade"
            transparent
            statusBarTranslucent
            {...rest}
        >
            <View style={style.container}>
                <View style={style.content}>
                    <TouchableOpacity 
                        style={style.closeIcon} 
                        onPress={() => {
                            onClose();
                            setDate(dataEntrega || null);
                            setIsChecked(concluido);
                        }}
                    >
                        <Icon
                            name='close'
                            size={20}
                            color={THEME.COLORS.TEXT}
                        />
                    </TouchableOpacity>

                    <Controller
                        control={control}
                        name="nome"
                        render={({ field: { onChange } }) => (
                            <Input
                                labelValue="Nome da tarefa"
                                textContentType="name"
                                placeholder="Nome da tarefa"
                                inputMode="text"
                                autoComplete="name"
                                onChangeText={onChange}
                                errorMessage={errors.nome?.message}
                                defaultValue={nomeTarefa}
                            />
                        )}
                    />

                    <Input
                        labelValue="Data de entrega: "
                        showSoftInputOnFocus={false}
                        value={date != null ? convertDateToString(date) : "Sem data de entrega"}
                        onPressIn={() => setShow(true)}
                    />
                    {
                        show &&
                        <DateTimePicker
                            testID="datePicker"
                            value={verifyIfDateIsNull()}
                            mode="date"
                            onChange={onChange}
                        />
                    }

                    <View>
                        <Text style={style.text}>Tarefa concluída: </Text>
                        <Checkbox value={isChecked} onValueChange={setIsChecked} color={isChecked ? "#4630EB" : undefined}/>
                    </View>

                    <Pressable style={style.button2} onPress={handleSubmit(handleRequestToUpdateTask)}>
                        <Text style={style.textButton}>Salvar alterações</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
}