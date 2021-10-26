export default class Autok {
    #nap: number;
    #oraPerc: string;
    #rendszam: string;
    #szemelyAzon: number;
    #kmSzamlalo: number;
    #kiBeHajtas: number;

    constructor(sor: string) {
        const autok = sor.split(" ");
        this.#nap = parseInt(autok[0]);
        this.#oraPerc = autok[1];
        this.#rendszam = autok[2];
        this.#szemelyAzon = parseInt(autok[3]);
        this.#kmSzamlalo = parseInt(autok[4]);
        this.#kiBeHajtas = parseInt(autok[5]);
    }

    public get nap(): number {
        return this.#nap;
    }

    public get rendszam(): string {
        return this.#rendszam;
    }
    public get kiBeHajtás(): number {
        return this.#kiBeHajtas;
    }
    public get oraPerc(): string {
        return this.#oraPerc;
    }
    public get szemelyAzon(): number {
        return this.#szemelyAzon;
    }
    public get kmSzamlalo(): number {
        return this.#kmSzamlalo;
    }
}
