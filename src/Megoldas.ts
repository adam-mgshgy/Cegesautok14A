import Autok from "./Autok";
import fs from "fs";
import { Direction } from "readline";
import { __values } from "tslib";

export default class Megoldas {
    autok: Autok[] = [];

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
