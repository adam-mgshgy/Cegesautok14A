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
        this.#kmElozoAllas = 0;
    }

    #kmElozoAllas: number;
    public kmElözőÁllás(value: number) {
        if (value > this.#kmElozoAllas) {
        } else {
            this.#kmElozoAllas = value;
        }
    }

    public get Nap() {
        return this.#nap;
    }

    public get megtettKm() {
        return this.#kmSzamlalo - this.#kmElozoAllas;
    }

    public get Rendszám() {
        return this.#rendszam;
    }
    public get KiBeHajtás() {
        return this.#kiBeHajtas;
    }
    public get OraPerc() {
        return this.#oraPerc;
    }
    public get SzemelyAzon() {
        return this.#szemelyAzon;
    }
    public get kmSzamlalo() {
        return this.#kmSzamlalo;
    }
}
