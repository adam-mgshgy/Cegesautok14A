export default class Autok {
    #nap: number;
    #oraPerc: string;
    #rendszam: string;
    #szemelyAzon: number;
    #kmSzamlalo: number;
    #kiBeHajtas: number;
    autok: string[];

    constructor(sor: string) {
        this.autok = sor.split(" ");
        this.#nap = parseInt(this.autok[0]);
        this.#oraPerc = this.autok[1];
        this.#rendszam = this.autok[2];
        this.#szemelyAzon = parseInt(this.autok[3]);
        this.#kmSzamlalo = parseInt(this.autok[4]);
        this.#kiBeHajtas = parseInt(this.autok[5]);
    }

    public get nap() {
        return this.#nap;
    }

    public get rendszam() {
        return this.#rendszam;
    }
    public get kiBeHajtás() {
        return this.#kiBeHajtas;
    }
    public get oraPerc() {
        return this.#oraPerc;
    }
    public get szemelyAzon() {
        return this.#szemelyAzon;
    }
    public get kmSzamlalo() {
        return this.#kmSzamlalo;
    }
}
