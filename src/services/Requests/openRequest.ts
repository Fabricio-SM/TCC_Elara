import { removeWords } from "../../utils/removeWords";

export async function openApplication(phrase: string) {
    try {
        const urlApps: Record<string, string> = {
            instagram: 'https://www.instagram.com/',
            spotify: 'https://open.spotify.com/',
            facebook: 'https://www.facebook.com/',
        }

        const phraseCleaned: string = removeWords(phrase);
        
        if (urlApps.hasOwnProperty(phraseCleaned)) {
            const urlApp: string = urlApps[phraseCleaned];
            return {
                openMessage: 'Aplicação aberta com sucesso',
                urlApp: urlApp
            }
        } else {
            return {
                openMessage: 'Infelizmente não consigo abrir esse aplicativo',
                urlApp: null
            }
        }
    } catch (error) {
        console.log(error);
        return {
            openMessage: 'Erro',
            urlApp: null
        }
    }
}