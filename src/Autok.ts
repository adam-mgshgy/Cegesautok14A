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

    public get utolsoAuto() {
        const index = 0;
        for (let i = 0; i < this.autok.length; i++) {
            if (this.#kiBeHajtas == 1) {
            }
        }

        return 0;
    }
}
