import Autok from "./Autok";
import fs from "fs";
import { Direction } from "readline";

export default class Megoldas {
    autok: Autok[] = [];

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
