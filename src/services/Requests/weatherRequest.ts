import axios from "axios";
import { removeWords } from "../../utils/removeWords";
import { getData } from "../Storage/getData";

export async function weatherRequest(phrase: string) {
    try {
        const token = await getData('token');

        const phraseCleaned = removeWords(phrase);

        const body = {
            cityName: phraseCleaned,
            countryCode: "br"
        }

        const { data, status } = await axios.post(`http://${process.env.EXPO_PUBLIC_IP_ADDRESS}:${process.env.EXPO_PUBLIC_PORT}/search/weather`, body, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (status != 200) {
            return "Não foi possivel realizar a solicitação";
        }

        return data.response.completeMessage;

    } catch (error) {
        return error;
    }
}