import * as Speech from 'expo-speech';

export function SpeakModule(message: string): void {
    Speech.speak(message, {
        language: 'pt-br',
        voice: Speech.VoiceQuality.Enhanced
    });
}