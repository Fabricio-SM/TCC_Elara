import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, Pressable, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CheckBox, Icon } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";

import { style } from "./style";
import { Background } from "../../Components/Background/Background";
import { PlanetImage } from "../../Components/Image";
import { Input } from "../../Components/Input/Input";
import { convertDateToString, convertTimestampToDate } from "../../utils/convertDate";
import { Tarefas } from "../../Components/Tarefas/Tarefas";
import { getData } from "../../services/Storage/getData";

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

    const [editMode, setEditMode] = useState<boolean>(false);
    const [show, setShow] = useState<boolean>(false);

    const [listInformation, setListInformation] = useState<ListData>();
    const [listIsChecked, setListIsChecked] = useState<boolean>(false);
    const [tasks, setTasks] = useState<TaskData[]>([]);
    const [date, setDate] = useState<Date>(new Date());

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

    useEffect(() => {
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
                    setDate(new Date(listInfo.dataEntrega));
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
                }
            } catch (error) {
                return error;
            }
        }

        getListInformations();
    }, [])


    return (
        <Background>
            <SafeAreaView style={style.view}>
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
                                    labelValue="Data de entrega"
                                    editable={editMode}
                                    value={convertDateToString(date)}
                                    onPressIn={() => setShow(true)}
                                />
                                {
                                    show &&
                                    <DateTimePicker
                                        testID="datePicker"
                                        value={date}
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
                            keyExtractor={(item, index) => index.toString()}
                        />

                        {
                            tasks.length == 0 && <Text style={{'flex': 1, 'textAlign': 'center' , 'justifyContent': 'center', 'color': '#ffffff'}}>Não há tarefas nessa lista</Text>
                        }
                    
                        <View style={style.hr} />
                        <View style={style.rowView}>
                            <Text style={style.text}>Excluir lista</Text>

                            <Pressable style={style.button2} onPress={() => { }}>
                                <Text style={style.textButton}>Excluir</Text>
                            </Pressable>
                        </View>

                        {
                            editMode &&
                                <View style={style.rowView}>
                                    <Pressable style={style.button} onPress={() => { }}>
                                        <Text style={style.textButton}>Salvar</Text>
                                    </Pressable>

                                    <Pressable style={style.button2} onPress={() => { onCancel() }}>
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
