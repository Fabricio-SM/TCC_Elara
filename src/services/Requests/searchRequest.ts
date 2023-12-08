import axios from "axios";
import { getData } from "../Storage/getData";
import { removeWords } from "../../utils/removeWords";

export async function webRequest(phrase: string) {
    try {
        const token = await getData('access_token');
        const phraseCleaned = removeWords(phrase);

        console.log('Frase - ', phraseCleaned);


        const { data, status } = await axios.get(`http://${process.env.EXPO_PUBLIC_IP_ADDRESS}:${process.env.EXPO_PUBLIC_PORT}/search/${phraseCleaned}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (status != 200) {
            return "Não foi possivel realizar a solicitação";
        }

        return data.response.summary;
    } catch (error) {
        return error;
    }
}

export async function videoRequest(phrase: string): Promise<any> {
    try {
        const token = await getData('access_token');
        const phraseCleaned = removeWords(phrase);

        console.log('Frase - ', phraseCleaned);


        const { data, status } = await axios.get(`http://${process.env.EXPO_PUBLIC_IP_ADDRESS}:${process.env.EXPO_PUBLIC_PORT}/search/video/${phraseCleaned}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (status != 200) {
            return {
                apiMessage: `Não foi possível processar sua solicitação`,
                video: null
            }
        }

        return {
            apiMessage: `Isso foi o que encontrei sobre ${data.request} no canal ${data.response.channel}`,
            video: data.response.videoUrl
        };
    } catch (error) {
        return error;
    }
}