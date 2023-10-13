import * as FileSystem from 'expo-file-system';
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from "expo-av";
import { Alert } from 'react-native';
import { useState } from 'react';

let recordingGlobal: Audio.Recording | null = null

Audio.requestPermissionsAsync()
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


async function handleRecordStart() {
    const { granted } = await Audio.getPermissionsAsync();

    if (!granted) {
        console.log("Permissã́o necessária");
        Alert.alert("Conceda a permissã́o do uso do microfone")
        return
    }

    try {
        const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
        recordingGlobal = recording;
    } catch (error) {
        console.log(error);
    }
}

async function handleRecordStop() {
    try {
        if (recordingGlobal) {
            await recordingGlobal.stopAndUnloadAsync();
            const fileUri = recordingGlobal.getURI();

            recordingGlobal = null;

            if (fileUri !== null) {
                try {
                    const response = await FileSystem.uploadAsync(`http://${process.env.EXPO_PUBLIC_IP_ADDRESS}:5000/transcript`, fileUri, {
                        fieldName: 'file',
                        httpMethod: 'POST',
                        uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
                    });

                    return response.body;
                } catch (error) {
                    console.log(error);
                }
            }
        }
    } catch (error) {
        console.log(error);
    }
}

export async function initAudioRecordToDo(): Promise<string | undefined> {
    try {
        const sleep: Promise<Number> = new Promise(resolve => setTimeout(resolve, 5000))

        handleRecordStart();

        await sleep;

        const audioTranscribed: string | undefined = await handleRecordStop();

        return audioTranscribed;
    } catch (error) {
        console.log(error);
        return "Houve um erro, tente novamente depois";
    }
}