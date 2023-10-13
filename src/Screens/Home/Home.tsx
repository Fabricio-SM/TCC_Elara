import * as FileSystem from 'expo-file-system';
import React, { useEffect, useState } from "react";
import { Text, View, Pressable, Alert, ActivityIndicator, Linking } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Icon } from 'react-native-elements'
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from "expo-av";

import { style } from "./style"
import { Background } from "../../Components/Background/Background";
import { PlanetImage } from "../../Components/Image";

import { inputTypeAnalysis } from "../../utils/inputAnalysis";
import { weatherRequest } from '../../services/Requests/weatherRequest';
import { videoRequest, webRequest } from '../../services/Requests/searchRequest';
import { chooseRequestEndpoint } from '../../services/Requests/toDoListRequest';
import { SpeakModule } from '../../services/Voice/SpeakModule';

export function Home() {
    const [recording, setRecording] = useState<Audio.Recording | null>(null);
    const [activateService, setActivateService] = useState<boolean>(false);
    const [audioTranscribed, setAudioTranscribed] = useState<string | null>(null);
    const nav = useNavigation();

    useEffect(() => {
        Audio
            .requestPermissionsAsync()
            .then(({ granted }) => {
                if (granted) {
                    Audio.setAudioModeAsync({
                        allowsRecordingIOS: true,
                        interruptionModeIOS: InterruptionModeIOS.DoNotMix,
                        playsInSilentModeIOS: true,
                        shouldDuckAndroid: true,
                        interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
                        playThroughEarpieceAndroid: true
                    });
                    Audio.RecordingOptionsPresets.HIGH_QUALITY = {
                        isMeteringEnabled: true,
                        android: {
                            extension: '.mp3',
                            outputFormat: Audio.AndroidOutputFormat.MPEG_4,
                            audioEncoder: Audio.AndroidAudioEncoder.AAC,
                            sampleRate: 44100,
                            numberOfChannels: 2,
                            bitRate: 128000,
                        },
                        ios: {
                            extension: '.mp3',
                            outputFormat: Audio.IOSOutputFormat.MPEG4AAC,
                            audioQuality: Audio.IOSAudioQuality.MAX,
                            sampleRate: 44100,
                            numberOfChannels: 2,
                            bitRate: 128000,
                            linearPCMBitDepth: 16,
                            linearPCMIsBigEndian: false,
                            linearPCMIsFloat: false,
                        },
                        web: {
                            mimeType: 'audio/webm',
                            bitsPerSecond: 128000,
                        },
                    }
                }
            });
    }, []);

    useEffect(() => {
        async function requests() {
            if (activateService && audioTranscribed) {
                const intention = inputTypeAnalysis(audioTranscribed);
                let message = undefined;

                switch (intention) {
                    case 'toDo':
                        message = await chooseRequestEndpoint(audioTranscribed);

                        console.log('Message - ', message);

                        break;
                    case 'search':
                    case 'searchVideo':
                        if (intention == 'search') {
                            message = await webRequest(audioTranscribed);
                            console.log('Message - ', message);
                        } else {
                            const { apiMessage, video } = await videoRequest(audioTranscribed);

                            message = apiMessage;

                            if (video != null) {
                                console.log('Message - ', apiMessage);
                                Linking.openURL(video);
                            }
                        }

                        break;

                    case 'open':
                        break;

                    case 'weather':
                        message = await weatherRequest(audioTranscribed.replace("\"", ""));
                        console.log('Message -', message);

                        break;
                    default:
                        message = 'Não entendi a sua solicitação';
                        break;

                }

                SpeakModule(message);

                setActivateService(false);
                setAudioTranscribed(null);
            }
        }

        requests();
    });

    async function handleRecordStart() {
        const { granted } = await Audio.getPermissionsAsync();

        if (!granted) {
            console.log("Permissã́o necessária");
            Alert.alert("Conceda a permissã́o do uso do microfone")
            return
        }

        try {
            const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
            setRecording(recording);
        } catch (error) {
            console.log(error);
        }
    }

    async function handleRecordStop() {
        try {
            if (recording) {
                await recording.stopAndUnloadAsync();
                const fileUri = recording.getURI();

                setRecording(null);

                if (fileUri !== null) {
                    try {
                        setActivateService(true);

                        const response = await FileSystem.uploadAsync(`http://${process.env.EXPO_PUBLIC_IP_ADDRESS}:5000/transcript`, fileUri, {
                            fieldName: 'file',
                            httpMethod: 'POST',
                            uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
                        });

                        setAudioTranscribed(response.body);
                    } catch (error) {
                        console.log(error);
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Background>
            <View style={style.view}>
                <View style={style.rowView}>
                    <Text style={style.label}>Elara</Text>

                    <Pressable>
                        <Icon color='#851397' size={40} name="settings" onPress={() => nav.navigate("configs")} />
                    </Pressable>
                </View>
                <View style={style.hr} />

                <Pressable disabled={activateService} style={style.pressable} onPressIn={handleRecordStart} onPressOut={handleRecordStop}>
                    <View style={{ opacity: 0.5 }}>
                        <PlanetImage />
                    </View>

                    {
                        activateService == true
                            ? <ActivityIndicator color='#851397' size={80} />
                            : <Icon color='#851397' size={80} name='microphone' type="material-community" />
                    }
                </Pressable>

                <View style={style.rowView2}>
                    <Pressable>
                        <Icon color='#ffffff' size={30} name="clock-time-three-outline" type="material-community" onPress={() => { }} />
                    </Pressable>
                    <Pressable>
                        <Icon color='#ffffff' size={30} name="help-circle-outline" type="material-community" onPress={() => { }} />
                    </Pressable>
                </View>

                <View style={style.view2}></View>

            </View>
        </Background>
    );
}