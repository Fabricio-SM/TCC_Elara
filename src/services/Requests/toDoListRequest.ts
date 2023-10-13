import { convertStringToDate } from "../../utils/convertDate";
import { removeWords } from "../../utils/removeWords";
import { getData } from "../Storage/getData";

type TaskBody = {
    nomeTarefa: string;
    nomeLista: string;
    dataEntrega?: Date;
}

type ListBody = {
    emailUsuario: string;
    nomeLista: string;
    dataEntrega?: Date;
}

type InfosBody = {
    nomeLista?: string;
    nomeTarefa?: string;
    data?: Date;
}

export async function chooseRequestEndpoint(phrase: string) {
    const phraseCleaned = removeWords(phrase);
    const splitedPhrase = phraseCleaned.split(" ");
    const infoBody = getInfosForMountBodyRequest(splitedPhrase);

    console.log(splitedPhrase);

    const hasListOrTaskInArray = splitedPhrase.find(el => el == 'tarefa' || el == 'lista');

    let body: TaskBody | ListBody;

    if (hasListOrTaskInArray == undefined) {
        return 'Não entendi a sua solicitação';
    }

    if (hasListOrTaskInArray == 'tarefa') {
        const { nomeTarefa, nomeLista, data } = infoBody;

        body = {
            nomeTarefa: nomeTarefa || '',
            nomeLista: nomeLista || '',
            dataEntrega: data
        };

        const response = await newRequest(body, 'task');
        return response;

    } else {
        const email = await getData('email');

        if (email == null) {
            return 'Erro'
        }

        body = {
            emailUsuario: email,
            nomeLista: infoBody.nomeLista || '',
            dataEntrega: infoBody.data
        };

        const response = await newRequest(body, 'list');
        return response;
    }
}

async function newRequest(body: TaskBody | ListBody, endpoint: string) {
    return body;
}


function getInfosForMountBodyRequest(phraseSplited: Array<string>): InfosBody {
    const generalRegex = 'nome|data|de|entrega|para|lista|tarefa|dia';
    const numbersRegex = '^(0[1-9]|[12][0-9]|3[01])(0[1-9]|1[0-2])(\\d{4})$'
    const onlyInformations: InfosBody = {
        nomeLista: "",
        nomeTarefa: "",
        data: new Date()
    }

    phraseSplited.forEach(word => {
        const generalMatch = new RegExp(generalRegex, 'i');
        const numbersMatch = new RegExp(numbersRegex, 'i');

        if (!generalMatch.test(word)) {
            if (numbersMatch.test(word)) {
                onlyInformations.data = convertStringToDate(word);
            }
            else {
                if (word == 'lista') {
                    console.log(word);
                    onlyInformations.nomeLista = word;
                } else {
                    onlyInformations.nomeTarefa = word;
                }
            }
        }
    });

    console.log("infos - ", onlyInformations);

    return onlyInformations;
}
