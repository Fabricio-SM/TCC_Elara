export function validInput(input: string): boolean {
    const optionsRegex: Array<string> = [
        "^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,4}$"
    ];

    const isValid: (boolean | undefined)[] = optionsRegex.map((regex: string) => {
        const matching = new RegExp(regex, "i");

        if (matching.test(input)) {
            return true;
        }
    });

    return isValid ? true : false;
}