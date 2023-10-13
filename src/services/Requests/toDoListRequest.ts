import axios from "axios";
import { convertStringToDate } from "../../utils/convertDate";
import { removeWords } from "../../utils/removeWords";
import { initAudioRecordToDo } from "../Record/AudioRecord";
import { getData } from "../Storage/getData";
import { SpeakModule } from "../Voice/SpeakModule";

function sleep(ms: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

export async function chooseRequestEndpoint(phrase: string) {
    const phraseCleaned = removeWords(phrase);
    const splitedPhrase = phraseCleaned.split(" ");

    console.log(splitedPhrase);

    const hasListOrTaskInArray = splitedPhrase.find(el => el == 'tarefa' || el == 'lista');

    if (hasListOrTaskInArray == undefined) {
        return 'Não entendi a sua solicitação';
    }

    if (hasListOrTaskInArray == 'tarefa') {
        SpeakModule("Qual vai ser o nome da tarefa?");

        await sleep(3000);
        console.log('Dps do sleep');

        const taskName = await initAudioRecordToDo();

        SpeakModule('Qual o nome da lista onde a tarefa vai ficar?');
        await sleep(3000);
        console.log('Dps do sleep');
        const listName = await initAudioRecordToDo();

        SpeakModule('Qual é a data de entrega para essa tarefa?');
        await sleep(3000);
        console.log('Dps do sleep');
        const deliveryDate = await initAudioRecordToDo();

        console.log(deliveryDate);

        if (deliveryDate != undefined) {
            const body = {
                nomeTarefa: taskName,
                dataEntrega: convertStringToDate(deliveryDate),
                nomeLista: listName,
            }

            const response = await newRequest(body, 'task');
            return response;
        }

    } else {
        const email = await getData('email');

        if (email == null) {
            return 'Erro'
        }

        const response = await newRequest({}, 'list');
        return response;
    }
}

async function newRequest(body: Object, endpoint: string) {
    try {
        const token = await getData('token');

        const { data, status } = await axios.post(`http://${process.env.EXPO_PUBLIC_IP_ADDRESS}:${process.env.EXPO_PUBLIC_PORT}/${endpoint}/add`, body, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (status == 200) {
            const listOrTask: string = endpoint == 'task' ? 'Tarefa' : 'Lista';
            return `${listOrTask} criado com sucesso`;
        }

    } catch (error) {
        console.error(error);
        return "Houve um erro para ao criar o que foi solicitado, tente novamente depois";
    }
}
