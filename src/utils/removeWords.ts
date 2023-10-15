export function removeWords(phrase: string) {
    const cleanedInput: string = phrase.normalize("NFD").replace(/[^\w\s]/gi, '').toLowerCase();

    const wordsToRemove: Array<string> = [
        'pesquisar', 'sobre', 'clima', 'tempo',
        'previsao', 'do', 'em', 'para', 'video',
        'procurar', 'adicionar', 'uma', 'nova',
        'chamada', 'com', 'o', 'criar', 'no',
        'abrir', 'aplicativo'
    ];

    const phraseSplited = cleanedInput.split(' ');
    const filteredWords = phraseSplited.filter((word) => !wordsToRemove.includes(word));

    const newPhrase = filteredWords.join(' ');

    return newPhrase;
}