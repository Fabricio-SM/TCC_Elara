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
    const hasListOrTaskInArray = splitedPhrase.find(el => el == 'tarefa' || el == 'lista');

    if (hasListOrTaskInArray == undefined) {
        return 'Não entendi a sua solicitação';
    }

    if (hasListOrTaskInArray == 'tarefa') {
        SpeakModule("Qual o nome da tarefa?");
        await sleep(3000);
        const taskName = await initAudioRecordToDo();

        SpeakModule('Em qual lista a tarefa será inserida?');
        await sleep(3000);
        const listName = await initAudioRecordToDo();

        SpeakModule('Qual a data de entrega desta tarefa?');
        await sleep(3000);
        const deliveryDate = await initAudioRecordToDo();

        if (deliveryDate != undefined) {
            const body = {
                nomeTarefa: taskName?.replace(/[^\w\s]/gi, "").toLowerCase(),
                dataEntrega: convertStringToDate(deliveryDate),
                nomeLista: listName?.replace(/[^\w\s]/gi, '').toLowerCase(),
            }

            const response = await newRequest(body, 'task');
            return response;
        }

    } else {
        const email = await getData('email');

        if (email == null) {
            return 'Erro'
        }

        SpeakModule("Qual o nome da lista?");
        await sleep(3000);
        const listName = await initAudioRecordToDo();


        SpeakModule('Qual a data de entrega desta lista?');
        await sleep(3000);
        const deliveryDate = await initAudioRecordToDo();

        if (deliveryDate != undefined) {
            const body = {
                nomeLista: listName?.replace(/[^\w\s]/gi, "").toLowerCase(),
                dataEntrega: convertStringToDate(deliveryDate),
                emailUsuario: email
            }
            
            const response = await newRequest(body, 'list');
            return response;
        }

    }
}

async function newRequest(body: Object, endpoint: string) {
    try {
        const token = await getData('access_token');

        console.log(body);


        const resp = await axios.post(`http://${process.env.EXPO_PUBLIC_IP_ADDRESS}:${process.env.EXPO_PUBLIC_PORT}/${endpoint}/add`, body, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (resp.status == 400) {
            if (resp.data.code == 'listNotFound') {
                return `${resp.data.message}, crie uma lista para associar a tarefa.`
            }

            return resp.data;
        }

        const listOrTask: string = endpoint == 'task' ? 'Tarefa' : 'Lista';
        return `${listOrTask} criada com sucesso`;


    } catch (error) {
        console.error(error);
        return "Houve um erro para ao criar o que foi solicitado, tente novamente depois";
    }
}
