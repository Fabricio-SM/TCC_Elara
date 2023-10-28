import React, { useState } from "react";
import { Pressable, View, Text, Alert } from "react-native";
import { style } from "./style";
import { Icon } from "react-native-elements";
import { convertDateToString } from "../../utils/convertDate";
import Checkbox from "expo-checkbox";
import { ModalExclude } from "../Modal";
import { getData } from "../../services/Storage/getData";
import axios from "axios";
import { ModalEditTask } from "../ModalEditTask/ModalEditTask";

interface TarefaProps {
    nomeTarefa: string;
    dataEntrega: Date;
    concluida: boolean;
}

export function Tarefas(props: TarefaProps) {
    const [modalExcludeStatus, setModalExcludeStatus] = useState<boolean>(false);
    const [modalEditStatus, setModalEditStatus] = useState<boolean>(false);

    async function updateTask(body: TarefaProps) {
        try {
            const token = await getData("access_token");
            
            const { data, status } = await axios.put(`http://${process.env.EXPO_PUBLIC_IP_ADDRESS}:${process.env.EXPO_PUBLIC_PORT}/task/${props.nomeTarefa}`, body, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (status == 200) {
                Alert.alert("Tarefa atualizada com sucesso", "Sua tarefa foi atualizada com sucesso, atualize a página para ver as alterações");
                setModalEditStatus(false);
            }
        } catch (error) {
            return error;
        }
    }

    async function handleDeleteTask() {
        const token = await getData("access_token");

        console.log(props.nomeTarefa);
        

        try {
            const { data, status } = await axios.delete(`http://${process.env.EXPO_PUBLIC_IP_ADDRESS}:${process.env.EXPO_PUBLIC_PORT}/task/${props.nomeTarefa}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            if (status == 200) {
                Alert.alert("Tarefa deletada com sucesso");
            }
        } catch (error) {
            return error;
        }
    }

    return (
        <View>
            <View style={style.hr} />
            <View style={style.rowView}>
                <View style={style.rowView2}>
                    <Checkbox
                        style={style.icon}
                        value={props.concluida}
                        color={props.concluida ? "#4630EB" : undefined}
                        onChange={() => { }}
                    />
                    <View style={style.space}></View>
                    <View style={style.colView}>
                        <Text style={style.labeltext}>{props.nomeTarefa}</Text>
                        {
                            props.dataEntrega != null
                                ? <Text style={style.labelTextSub}>Data de entrega: {convertDateToString(props.dataEntrega)}</Text>
                                : <Text style={style.labelTextSub}>Sem data de entrega</Text>
                        }
                    </View>
                </View>

                <View style={style.rowView2}>
                    <Pressable style={style.icon}>
                        <Icon
                            size={32}
                            color="#ffffff"
                            name="pen"
                            type="material-community"
                            onPress={() => setModalEditStatus(true)}
                        />
                    </Pressable>
                    <ModalEditTask
                        nomeTarefa={props.nomeTarefa}
                        dataEntrega={props.dataEntrega}
                        concluido={props.concluida}
                        updateTask={updateTask}
                        visible={modalEditStatus}
                        onClose={() => setModalEditStatus(false)}
                    />
                    <View style={style.space} />
                    <Pressable style={style.icon}>
                        <Icon
                            size={32}
                            color="#ffffff"
                            name="trash-can"
                            type="material-community"
                            onPress={() => setModalExcludeStatus(true) }
                        />
                    </Pressable>

                    <ModalExclude
                        onClose={() => setModalExcludeStatus(false)}
                        handleApiDelete={() => {
                            setModalExcludeStatus(false);
                            handleDeleteTask();
                        }}
                        message="Tem certeza que deseja excluir a tarefa?"
                        visible={modalExcludeStatus}
                    />
                </View>
            </View>
        </View>
    );
}
