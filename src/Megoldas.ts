import Autok from "./Autok";
import fs from "fs";
import { Direction } from "readline";
import { INSPECT_MAX_BYTES } from "buffer";
import { __values } from "tslib";
import { inspect } from "util";

export default class Megoldas {
    autok: Autok[] = [];

    public get Legtobbkilometer() {
        interface SzemelyKilometerNaponta {
            [id: number]: number;
        }

        return ``;
    }

    public get Autoszamolas() {
        let autokszama = 0;
        const autokrendszammal: { [rendszam: string]: number } = {};
        for (let index = 0; index < this.autok.length; index++) {
            autokrendszammal[this.autok[index].Rendszám] = this.autok[index].KiBeHajtás;
        }
        for (const value in autokrendszammal) {
            if (autokrendszammal[value] == 0) {
                autokszama++;
            }
        }
        return autokszama;
    }

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
    autokForgalom: string[] = [];
    public Forgalom(nap: number) {
        for (const item of this.autok) {
            if (item.Nap == nap) {
                if (item.KiBeHajtás == 1) {
                    this.autokForgalom.push(item.OraPerc + ";" + item.Rendszám + ";" + item.SzemelyAzon + ";" + "Be");
                } else {
                    this.autokForgalom.push(item.OraPerc + ";" + item.Rendszám + ";" + item.SzemelyAzon + ";" + "Ki");
                }
            }
        }
        return this.autokForgalom;
    }

    constructor(forras: string) {
        fs.readFileSync(forras)
            .toString()
            .split("\n")
            .forEach(i => {
                const aktSor: string = i.trim();
                const autok = new Autok(aktSor);

                if (autok.KiBeHajtás == 1) {
                    autok.kmElözőÁllás(autok.kmSzamlalo);
                }
                this.autok.push(autok);
            });
    }
}
