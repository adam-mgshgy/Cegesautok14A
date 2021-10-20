import Autok from "./Autok";
import fs from "fs";
import { Direction } from "readline";
import { INSPECT_MAX_BYTES } from "buffer";
import { __values } from "tslib";

import { inspect } from "util";
import { stringify } from "querystring";

export default class Megoldas {
    autok: Autok[] = [];

    public get Legtobbkilometer() {
        let maxut = 0;
        let szemely = 0;

        const rendezettautok: Autok[] = this.autok.sort((a, b) => (a.Rendszám > b.Rendszám ? 1 : -1));

        for (let i = 1; i < rendezettautok.length; i++) {
            if (rendezettautok[i].Rendszám == rendezettautok[i - 1].Rendszám && rendezettautok[i].KiBeHajtás == 1) {
                if (maxut < rendezettautok[i].kmSzamlalo - rendezettautok[i - 1].kmSzamlalo) {
                    maxut = rendezettautok[i].kmSzamlalo - rendezettautok[i - 1].kmSzamlalo;
                    szemely = rendezettautok[i].SzemelyAzon;
                }
            }
        }

        return `Leghosszabb út: ${maxut} km, személy: ${szemely}`;
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
    autokTomb: string[] = [];
    public get Stat() {
        const autokKmRndsz: string[] = [];
        const autokKmSzam: number[] = [];
        let maxIndex = 0;
        let minIndex = 0;
        let index = -1;
        this.autok.sort((a, b) => (a.Rendszám > b.Rendszám ? 1 : -1));
        for (const item of this.autok) {
            if (!autokKmRndsz.includes(item.Rendszám)) {
                autokKmRndsz.push(item.Rendszám);
                minIndex = item.kmSzamlalo;
                index++;
            } else {
                maxIndex = item.kmSzamlalo;
            }
            if (index > -1 && maxIndex != 0 && minIndex != 0) {
                autokKmSzam[index] = (maxIndex - minIndex) * -1;
            }
        }
        for (let i = 1; i < autokKmRndsz.length; i++) {
            this.autokTomb.push(autokKmRndsz[i] + ";" + autokKmSzam[i]);
        }
        return this.autokTomb;
    }

    public FajlbaIras(fileName: string, rendszam: string): void {
        let adatsor = "";
        for (const auto of this.autok) {
            if (auto.Rendszám == rendszam) {
                if (auto.KiBeHajtás == 0) {
                    adatsor += auto.SzemelyAzon + "\t" + auto.Nap + ". " + auto.OraPerc + "\t" + auto.kmSzamlalo + " km";
                } else if (auto.KiBeHajtás == 1) {
                    adatsor += "\t" + auto.Nap + ". " + auto.OraPerc + "\t" + auto.kmSzamlalo + " km\n";
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

                this.autok.push(autok);
            });
    }
}
