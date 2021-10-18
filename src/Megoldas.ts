import Autok from "./Autok";
import fs from "fs";
import { Direction } from "readline";

export default class Megoldas {
    autok: Autok[] = [];

    public get UtolsoAuto() {
        let maxNap = 0;
        let rendszam = "";
        for (const auto of this.autok) {
            if (auto.Nap > maxNap && auto.KiBeHajtás == 0) {
                maxNap = auto.Nap;
            }
        }
        let maxIdo = 0;
        for (const auto of this.autok) {
            if (parseInt(auto.OraPerc) > maxIdo && auto.KiBeHajtás == 0) {
                maxIdo = parseInt(auto.OraPerc);
                rendszam = auto.Rendszám;
            }
        }
        return `${maxNap}. nap, rendszám ${rendszam}`;

    }
    constructor(forras: string) {
        fs.readFileSync(forras)
            .toString()
            .split("\n")
            .forEach(i => {
                const aktSor: string = i.trim();
                this.autok.push(new Autok(aktSor));
            });
    }
}
