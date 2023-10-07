export function inputTypeAnalysis(phrase: string) {
    const cleanedInput: string = phrase.normalize("NFD").replace(/[^\w\s]/gi, '').toLowerCase();
    const optionsRegex: any = {
        "pesquisar|procurar": "search",
        "video|pesquisar.+(video)": "searchVideo",
        "clima|previs[ãa]o.+tempo": "weather",
        "abrir|inici.+[ar|lizar]": "open",
        "(criar|colocar|nova|inserir).+(lista|tarefa)": "toDo"
    };

    let data = null;
    for (let key in optionsRegex) {
        if (optionsRegex.hasOwnProperty(key)) {
            const matching = new RegExp(key, "i");

            if (matching.test(cleanedInput)) {
                data = optionsRegex[key];
            }
        }
    }

    if (data == null) {
        return 'input inesperado';
    }
    return data;
}
