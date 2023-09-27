import React, { useEffect, useState } from "react";
import * as FileSystem from 'expo-file-system';
import { Text, View, Pressable, Alert } from "react-native";
import { Background } from "../../Components/Background/Background";
import { useNavigation } from "@react-navigation/native";
import { style } from "./style"
import { Icon } from 'react-native-elements'
import { PlanetImage } from "../../Components/Image";
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from "expo-av";

export function Home() {
    const [recording, setRecording] = useState<Audio.Recording | null>(null);
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
                        const response = await FileSystem.uploadAsync(`http://192.168.0.213:5000/transcript`, fileUri, {
                            fieldName: 'file',
                            httpMethod: 'POST',
                            uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
                        });
                        console.log(JSON.stringify(response, null, 4));
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

                <Pressable style={style.pressable} onPressIn={handleRecordStart} onPressOut={handleRecordStop}>
                    <View style={{ opacity: 0.5 }}>
                        <PlanetImage />
                    </View>


                    <Icon color='#851397' size={80} name="microphone" type="material-community" />
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