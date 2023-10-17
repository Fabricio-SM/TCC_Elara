import React, { useEffect, useState } from "react";
import { View, Text, Pressable, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CheckBox, Icon } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";

import { useNavigation } from "@react-navigation/native";
import { style } from "./style";
import { Background } from "../../Components/Background/Background";
import { PlanetImage } from "../../Components/Image";
import { Input } from "../../Components/Input/Input";
import { convertDateToString } from "../../utils/convertDate";
import { date } from "yup";
import { Controller } from "react-hook-form/dist/controller";
import { Tarefas } from "../../Components/Tarefas/Tarefas";
import axios from "axios";
import { getData } from "../../services/Storage/getData";

interface TaskData {
    nomeTarefa: string;
    dataEntrega: Date;
    concluida: boolean;
}

interface ListData {
    dataEntrega: Date;
    dataCriacao: Date;
    conlcuido: boolean;
}

export function Lista({ route }: any) {
    const listName: string = route.params.nomeLista;
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [listInformation, setListInformation] = useState<ListData>()
    const [tasks, setTasks] = useState<TaskData[]>([]);
    const nav = useNavigation();

    const onChange = (selectedDate: any) => {
        setShow(false);

        const timeStampConverted = new Date(selectedDate.nativeEvent.timestamp);

        setDate(timeStampConverted);
    };

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
                        conlcuido: data.concluida
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

                            <Pressable>
                                <Icon
                                    color="#ffffff"
                                    name="pen"
                                    type="material-community"
                                    onPress={() => nav.navigate("configs")}
                                />
                            </Pressable>
                        </View>
                        <View style={style.hr} />
                        <View style={style.rowView}>
                            <View style={style.colView}>
                                <Input
                                    labelValue="Criado em: "
                                    defaultValue={convertDateToString(listInformation?.dataCriacao || new Date())}
                                />
                            </View>
                            <View style={style.colView}>
                                <Input
                                    labelValue="Entregar em: "
                                    defaultValue={convertDateToString(listInformation?.dataEntrega || new Date())}
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
                                <CheckBox center={true} checked={listInformation?.conlcuido}/>
                            </View>
                        </View>
                    </View>

                    <Text style={style.label2}>Tarefas</Text>
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
                    </View>
                    <View>
                        <View style={style.hr} />
                        <View style={style.rowView}>
                            <Text style={style.text}>Excluir lista</Text>

                            <Pressable style={style.button2} onPress={() => { }}>
                                <Text style={style.textButton}>Excluir</Text>
                            </Pressable>
                        </View>

                        <View style={style.rowView}>
                            <Pressable style={style.button} onPress={() => { }}>
                                <Text style={style.textButton}>Salvar</Text>
                            </Pressable>

                            <Pressable style={style.button2} onPress={() => { }}>
                                <Text style={style.textButton}>Cancelar</Text>
                            </Pressable>
                        </View>
                    </View>
                    <View style={{ opacity: 0.5 }}>
                        <PlanetImage />
                    </View>
                </View>
            </SafeAreaView>
        </Background>
    );
}
