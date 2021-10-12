export default class Autok {
    #nap: number;
    #oraPerc: string;
    #rendszam: string;
    #szemelyAzon: number;
    #kmSzamlalo: number;
    #kiBeHajtas: number;

    constructor(sor: string) {
        const m: string[] = sor.split(" ");
        this.#nap = parseInt(m[0]);
        this.#oraPerc = m[1];
        this.#rendszam = m[2];
        this.#szemelyAzon = parseInt(m[3]);
        this.#kmSzamlalo = parseInt(m[4]);
        this.#kiBeHajtas = parseInt(m[5]);
    }
}
