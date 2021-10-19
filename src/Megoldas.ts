import Autok from "./Autok";
import fs from "fs";
import { Direction } from "readline";
import { INSPECT_MAX_BYTES } from "buffer";
import { __values } from "tslib";
import { inspect } from "util";

export default class Megoldas {
    autok: Autok[] = [];

    public get Legtobbkilometer() {
        const rendezettautok: Autok[] = this.autok;

        let item;
        for (let index = 0; index < this.autok.length - 1; index++) {
            for (let j = 0; j < this.autok.length - 1; j++) {
                if (rendezettautok[j].Rendszám > rendezettautok[j + 1].Rendszám) {
                    item = rendezettautok[j + 1];
                    rendezettautok[j + 1] = rendezettautok[j];
                    rendezettautok[j] = item;
                }
            }
        }
        let max = 0;
        let szemely = 0;
        for (let index = 1; index < rendezettautok.length; index++) {
            if (rendezettautok[index].Rendszám == rendezettautok[index - 1].Rendszám && rendezettautok[index].KiBeHajtás == 1) {
                if (max < rendezettautok[index].kmSzamlalo - rendezettautok[index - 1].kmSzamlalo) {
                    max = rendezettautok[index].kmSzamlalo - rendezettautok[index - 1].kmSzamlalo;
                    szemely = rendezettautok[index].SzemelyAzon;
                }
            }
        }

        return `Leghosszabb út: ${max} km, személy: ${szemely}`;
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

    public FajlbaIras(fileName: string, rendszam: string): void {
        let adatsor = "";
        for (const auto of this.autok) {
            if (auto.Rendszám == rendszam) {
                if (auto.KiBeHajtás == 0) {
                    adatsor += auto.SzemelyAzon + "\t" + auto.Nap + ".\t" + auto.OraPerc + "\t \t" + auto.kmSzamlalo + " km";
                } else if (auto.KiBeHajtás == 1) {
                    adatsor += "\t \t" + auto.Nap + ".\t" + auto.OraPerc + "\t \t" + auto.kmSzamlalo + " km\n";
                }
            }
        }
        try {
            fs.writeFileSync(fileName, adatsor);
        } catch (error) {
            console.log((error as Error).message);
        }
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
