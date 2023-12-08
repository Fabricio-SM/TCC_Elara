import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, Pressable, FlatList, Alert, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CheckBox, Icon } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";

import { style } from "./style";
import { Background } from "../../Components/Background/Background";
import { Input } from "../../Components/Input/Input";
import { convertDateToString, convertTimestampToDate } from "../../utils/convertDate";
import { Tarefas } from "../../Components/Tarefas/Tarefas";
import { getData } from "../../services/Storage/getData";
import { useNavigation } from "@react-navigation/native";
import { ModalExclude } from "../../Components/Modal";

interface TaskData {
    nomeTarefa: string;
    dataEntrega: Date;
    concluida: boolean;
}

interface ListData {
    dataEntrega: Date;
    dataCriacao: Date;
    concluido: boolean;
}

export function Lista({ route }: any) {
    const listName: string = route.params.nomeLista;

    const nav = useNavigation();
    const [refreshing, setRefreshing] = useState(true);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [show, setShow] = useState<boolean>(false);
    const [modalStatus, setModalStatus] = useState<boolean>(false);

    const [listInformation, setListInformation] = useState<ListData>();
    const [listIsChecked, setListIsChecked] = useState<boolean>(false);
    const [tasks, setTasks] = useState<TaskData[]>([]);
    const [date, setDate] = useState<Date | null>(null);

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

    /**
    * Reset all useState onPress the button cancel
    */
    const onCancel = () => {
        setEditMode(false);
        setListIsChecked(listInformation?.concluido || false);
        setDate(new Date(listInformation?.dataEntrega || new Date()));
        setListInformation(listInformation);
    }

    async function handleUpdateList() {
        const token = await getData("access_token");

        try {
            const body = {
                "nomeLista": listName,
                "dataEntrega": date,
                "concluida": listIsChecked
            }


            const { data, status } = await axios.put(`http://${process.env.EXPO_PUBLIC_IP_ADDRESS}:${process.env.EXPO_PUBLIC_PORT}/list/${listName}`, body, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            if (status == 200) {
                Alert.alert("Informações atualizadas", "Informações atualizadas com sucesso");
                setEditMode(false);
                getListInformations();
            }
        } catch (error) {
            return error;
        }
    }

    async function handleDeleteList() {
        const token = await getData("access_token");

        try {
            const { data, status } = await axios.delete(`http://${process.env.EXPO_PUBLIC_IP_ADDRESS}:${process.env.EXPO_PUBLIC_PORT}/list/${listName}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            if (status == 200) {
                Alert.alert("Lista deletada com sucesso", "Lista deletada com sucesso, voltando para a tela inicial");
                nav.navigate('home');
            }
        } catch (error) {
            return error;
        }
    }

    async function getListInformations() {
        const token = await getData("access_token");

        try {
            const { data, status } = await axios.get(`http://${process.env.EXPO_PUBLIC_IP_ADDRESS}:${process.env.EXPO_PUBLIC_PORT}/list/${listName}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (status == 200) {
                const listInfo: ListData = {
                    dataEntrega: data.dataEntrega,
                    dataCriacao: data.dataCriacao,
                    concluido: data.concluida
                }

                setListIsChecked(listInfo.concluido);

                if (listInfo.dataEntrega != null) {
                    setDate(new Date(listInfo.dataEntrega));
                }
                setListInformation(listInfo);

                const tasks = data.Tarefa.map((el: any) => {
                    const task: TaskData = {
                        nomeTarefa: el.nomeTarefa,
                        dataEntrega: el.dataEntrega,
                        concluida: el.concluida
                    }

                    return task;
                });

                setTasks(tasks);
                setRefreshing(false);
            }
        } catch (error) {
            return error;
        }
    }

    useEffect(() => { getListInformations(); }, []);


    return (
        <Background>
            <SafeAreaView style={[style.view, modalStatus ? { backgroundColor: "black", opacity: 0.5 } : style.view]}>
                <View>
                    <View>
                        <View style={style.rowView}>
                            <Text style={style.label}>{listName}</Text>

                            <Pressable style={style.icon}>
                                <Icon
                                    color="#ffffff"
                                    name="pen"
                                    type="material-community"
                                    onPress={() => setEditMode(true)}
                                />
                            </Pressable>
                        </View>
                        <View style={style.hr} />
                        <View style={style.rowView}>
                            <View style={style.colView}>
                                <Input
                                    editable={false}
                                    labelValue="Criado em: "
                                    defaultValue={convertDateToString(listInformation?.dataCriacao || new Date())}
                                />
                            </View>
                            <View style={style.colView}>
                                <Input
                                    showSoftInputOnFocus={false}
                                    labelValue="Data de entrega:"
                                    editable={editMode}
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

                            </View>
                            <View style={style.colView}>
                                <Text style={style.text}>Concluido</Text>
                                <CheckBox
                                    disabled={!editMode}
                                    center={true}
                                    checked={listIsChecked}
                                    onPress={() => setListIsChecked(!listIsChecked)}
                                />
                            </View>
                        </View>
                    </View>

                    <Text style={style.label2}>Tarefas</Text>
                    <View style={style.hr} />
                    <View style={style.view2}>
                        <FlatList
                            data={tasks}
                            renderItem={({ item }) => (
                                <Tarefas
                                    nomeTarefa={item.nomeTarefa}
                                    dataEntrega={item.dataEntrega}
                                    concluida={item.concluida}
                                />
                            )}
                            ListEmptyComponent={
                                <Text style={{ 'flex': 1, 'textAlign': 'center', 'justifyContent': 'center', 'color': '#ffffff' }}>Não há tarefas nessa lista</Text>
                            }
                            refreshControl={
                                <RefreshControl refreshing={refreshing} onRefresh={getListInformations} />
                            }
                            keyExtractor={(item, index) => index.toString()}
                        />

                        <View style={style.hr} />
                        <View style={style.rowView}>
                            <Text style={style.text}>Excluir lista</Text>

                            <Pressable style={style.button2} onPress={() => { setModalStatus(true) }}>
                                <Text style={style.textButton}>Excluir</Text>
                            </Pressable>

                            <ModalExclude
                                onClose={() => setModalStatus(false)}
                                handleApiDelete={() => {
                                    setModalStatus(false);
                                    handleDeleteList();
                                }}
                                message="Tem certeza que deseja excluir a lista de tarefas?"
                                visible={modalStatus}
                            />
                        </View>

                        {
                            editMode &&
                            <View style={style.rowView}>
                                <Pressable style={style.button} onPress={handleUpdateList}>
                                    <Text style={style.textButton}>Salvar</Text>
                                </Pressable>

                                <Pressable style={style.button2} onPress={onCancel}>
                                    <Text style={style.textButton}>Cancelar</Text>
                                </Pressable>
                            </View>
                        }
                    </View>
                </View>
            </SafeAreaView>
        </Background>
    );
}
