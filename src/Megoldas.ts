import Autok from "./Autok";
import fs from "fs";

export default class Megoldas {
    autok: Autok[] = [];

    public get legtobbKilometer(): string {
        let maxut = 0;
        let szemely = 0;

        const rendezettautok: Autok[] = this.autok.sort((a, b) => (a.rendszam > b.rendszam ? 1 : -1));

        for (let i = 1; i < rendezettautok.length; i++) {
            if (rendezettautok[i].rendszam == rendezettautok[i - 1].rendszam && rendezettautok[i].kiBeHajtás == 1) {
                if (maxut < rendezettautok[i].kmSzamlalo - rendezettautok[i - 1].kmSzamlalo) {
                    maxut = rendezettautok[i].kmSzamlalo - rendezettautok[i - 1].kmSzamlalo;
                    szemely = rendezettautok[i].szemelyAzon;
                }
            }
        }

        return `Leghosszabb út: ${maxut} km, személy: ${szemely}`;
    }

    public get autoSzamolas(): number {
        let autokszama = 0;
        const autokrendszammal: { [rendszam: string]: number } = {};
        for (let index = 0; index < this.autok.length; index++) {
            autokrendszammal[this.autok[index].rendszam] = this.autok[index].kiBeHajtás;
        }
        for (const value in autokrendszammal) {
            if (autokrendszammal[value] == 0) {
                autokszama++;
            }
        }
        return autokszama;
    }

    public get utolsoAuto(): string {
        let maxNap = 0;
        let rendszam = "";
        for (const auto of this.autok) {
            if (auto.nap > maxNap && auto.kiBeHajtás == 0) {
                maxNap = auto.nap;
            }
        }
        let maxIdo = 0;
        for (const auto of this.autok) {
            if (parseInt(auto.oraPerc) > maxIdo && auto.kiBeHajtás == 0) {
                maxIdo = parseInt(auto.oraPerc);
                rendszam = auto.rendszam;
            }
        }
        return `${maxNap}. nap, rendszám ${rendszam}`;
    }

    public forgalom(nap: number): string {
        const autokForgalom: string[] = [];
        for (const item of this.autok) {
            if (item.nap == nap) {
                if (item.kiBeHajtás == 1) {
                    autokForgalom.push(item.oraPerc + ";" + item.rendszam + ";" + item.szemelyAzon + ";" + "Be");
                } else {
                    autokForgalom.push(item.oraPerc + ";" + item.rendszam + ";" + item.szemelyAzon + ";" + "Ki");
                }
            }
        }
        let autokString = "";
        for (const item of autokForgalom) {
            autokString += item.split(`;`)[0] + " " + item.split(`;`)[1] + " " + item.split(`;`)[2] + " " + item.split(`;`)[3] + `\n`;
        }
        return autokString;
    }

    public get stat(): string {
        const autokTomb: string[] = [];
        const autokKmRndsz: string[] = [];
        const autokKmSzam: number[] = [];
        let maxIndex = 0;
        let minIndex = 0;
        let index = -1;
        this.autok.sort((a, b) => (a.rendszam > b.rendszam ? 1 : -1));
        for (const item of this.autok) {
            if (!autokKmRndsz.includes(item.rendszam)) {
                autokKmRndsz.push(item.rendszam);
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
            autokTomb.push(autokKmRndsz[i] + ";" + autokKmSzam[i]);
        }
        let autokString = "";
        for (const item of autokTomb) {
            autokString += item.split(";")[0] + " " + item.split(";")[1] + " km" + "\n";
        }
        return autokString;
    }

    public fajlbaIras(fileName: string, rendszam: string): boolean {
        let adatsor = "";
        for (const auto of this.autok) {
            if (auto.rendszam == rendszam) {
                if (auto.kiBeHajtás == 0) {
                    adatsor += auto.szemelyAzon + "\t" + auto.nap + ". " + auto.oraPerc + "\t" + auto.kmSzamlalo + " km";
                } else if (auto.kiBeHajtás == 1) {
                    adatsor += "\t" + auto.nap + ". " + auto.oraPerc + "\t" + auto.kmSzamlalo + " km\n";
                }
            }
        }
        this._fajlkiiras = adatsor;
        try {
            fs.writeFileSync(fileName, adatsor);
        } catch (error) {
            console.log((error as Error).message);
            return false;
        }
        return true;
    }

    _fajlkiiras = "";
    public fajlKiiras(): string {
        return this._fajlkiiras;
    }

    constructor(forras: string) {
        fs.readFileSync(forras)
            .toString()
            .split("\n")
            .forEach(i => {
                const aktSor: string = i.trim();
                const autok = new Autok(aktSor);
                this._fajlkiiras += aktSor + "\n";
                this.autok.push(autok);
            });
    }
}
