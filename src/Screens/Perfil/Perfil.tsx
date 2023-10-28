import axios from "axios";
import * as yup from "yup";
import DateTimePicker from '@react-native-community/datetimepicker';

import React, { useEffect, useState } from "react";
import { View, Text, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";

import { style } from "./style";
import { Input } from "../../Components/Input/Input";
import { Background } from "../../Components/Background/Background";
import { ModalExclude } from "../../Components/Modal";

import { getData } from "../../services/Storage/getData";
import { saveData } from "../../services/Storage/saveData";
import { convertDateToString, convertTimestampToDate } from "../../utils/convertDate";

type UserData = {
    nome: string;
    email: string;
    dataNascimento: Date;
}

type FormProps = {
    nome: string,
    email: string;
}

const schema = yup.object({
    nome: yup.string().required('Informe o nome'),
    email: yup.string().required('Informe o email').email('Informe um email válido'),
});

export function Perfil() {
    const nav = useNavigation();
    const [date, setDate] = useState<Date>(new Date());
    const [show, setShow] = useState(false);
    const [canEdit, setCanEdit] = useState(false);
    const [data, setData] = useState<UserData>();
    const { control, handleSubmit, formState: { errors } } = useForm<FormProps>({
        resolver: yupResolver(schema),
    });
    const [modalStatus, setModalStatus] = useState<boolean>(false)

    useEffect(() => {
        async function getInfosUser() {
            const [email, token] = await Promise.all([
                getData('email'),
                getData('token')
            ]);

            const { data } = await axios.get(`http://${process.env.EXPO_PUBLIC_IP_ADDRESS}:${process.env.EXPO_PUBLIC_PORT}/user/${email}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setDate(new Date(data.dataNascimento))
            setData(data);
        }

        getInfosUser();
    }, []);

    async function onSubmit({ nome, email }: FormProps) {
        try {
            const body: UserData = {
                nome,
                email,
                "dataNascimento": date
            }

            const [savedEmail, token] = await Promise.all([
                getData("email"),
                getData("access_token")
            ]);

            const { data, status } = await axios.put(`http://${process.env.EXPO_PUBLIC_IP_ADDRESS}:${process.env.EXPO_PUBLIC_PORT}/user/${savedEmail}`, body, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (status == 200) {
                if (email !== savedEmail) {
                    await saveData("email", email);
                }

                Alert.alert("Informações atualizadas", "Informações atualizadas com sucesso, voltando para tela inicial");

                return nav.navigate("home")
            }
        } catch (error) {
            return Alert.alert("Um erro aconteceu", "Houve um erro ao procesar sua solicitacão, por favor tente novamente mais tarde");
        }

    }

    async function handleDeleteHistApi() {
        try {
            const [email, token] = await Promise.all([
                getData("email"),
                getData("access_token")
            ]);

            await axios.delete(`http://${process.env.EXPO_PUBLIC_IP_ADDRESS}:${process.env.EXPO_PUBLIC_PORT}/historic/${email}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        } catch (error) {
            return Alert.alert("Um erro aconteceu", "Houve um erro ao procesar sua solicitacão, por favor tente novamente mais tarde");
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
        setCanEdit(false);
        setDate(new Date(data?.dataNascimento || new Date()));
        setData(data);
    }

    return (
        <Background>
            <SafeAreaView style={[style.view, modalStatus ? { backgroundColor: "black", opacity: 0.5 } : style.view]}>
                <View>
                    <View style={style.rowView}>
                        <Pressable>
                            <Icon color='#ffffff' name="arrow-left-bold" type="material-community" onPress={() => nav.navigate("configs")} />
                        </Pressable>
                        <Text style={style.label}>Perfil</Text>
                        <Pressable>
                            <Icon color="#ffffff" name="pen" type="material-community" onPress={() => { setCanEdit(true) }} />
                        </Pressable>
                    </View>

                    <View style={style.space} />

                    <Controller
                        control={control}
                        name="nome"
                        render={({ field: { onChange } }) => (
                            <Input
                                labelValue="Nome"
                                textContentType="name"
                                placeholder="Nome"
                                inputMode="text"
                                autoComplete="name"
                                editable={canEdit}
                                onChangeText={onChange}
                                errorMessage={errors.nome?.message}
                                defaultValue={data?.nome}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange } }) => (
                            <Input
                                labelValue="Email"
                                textContentType="emailAddress"
                                placeholder="Email"
                                inputMode="email"
                                keyboardType="email-address"
                                autoComplete="email"
                                editable={canEdit}
                                onChangeText={onChange}
                                errorMessage={errors.email?.message}
                                defaultValue={data?.email}
                            />
                        )}
                    />

                    <Input
                        showSoftInputOnFocus={false}
                        labelValue="Data de nascimento"
                        editable={canEdit}
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

                    <View style={style.rowView}>
                        <Text style={style.text}>Excluir histórico de fala</Text>

                        <Pressable style={style.button2} onPress={() => { setModalStatus(true) }}>
                            <Text style={style.textButton}>Excluir</Text>
                        </Pressable>

                        <ModalExclude
                            onClose={() => setModalStatus(false) }
                            handleApiDelete={() => {
                                setModalStatus(false);
                                handleDeleteHistApi();
                            }}
                            message="Tem certeza que deseja excluir o histórico de fala?"
                            visible={modalStatus}
                        />
                    </View>



                    {
                        canEdit &&
                        <View>
                            <Pressable style={style.button} onPress={handleSubmit(onSubmit)}>
                                <Text style={style.textButton}>Salvar</Text>
                            </Pressable>

                            <Pressable style={style.button2} onPress={() => onCancel()}>
                                <Text style={style.textButton}>Cancelar</Text>
                            </Pressable>
                        </View>
                    }
                    {/* <View style={style.space}/> */}

                </View>
            </SafeAreaView>
        </Background>
    );
}

