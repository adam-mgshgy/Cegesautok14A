import Megoldas from "../Megoldas";
import fs from "fs";

describe("Megoldas osztály unit tesztje", () => {
    const megoldas: Megoldas = new Megoldas("autok.txt");
    const autokForgalom = "12:50 CEG303 561 Ki\n19:17 CEG308 552 Be\n";
    const autokStatisztika: string = "CEG300 6751 km" + "\n" + "CEG301 5441 km" + "\n" + "CEG302 5101 km" + "\n" + "CEG303 7465 km" + "\n" + "CEG304 6564 km" + "\n" + "CEG305 5232 km" + "\n" + "CEG306 7165 km" + "\n" + "CEG307 6489 km" + "\n" + "CEG308 6745 km" + "\n" + "CEG309 1252 km\n";

    it("Megoldas osztálypéldány ellenörzése", async () => {
        expect(megoldas).toBeInstanceOf(Megoldas);
    });

    it("Autók száma", async () => {
        expect(megoldas.utolsoAuto).toBe("30. nap, rendszám CEG300");
    });

    it("Forgalom", async () => {
        expect(megoldas.forgalom(4)).toBe(autokForgalom);
    });

    it("Nem visszahozott autók", async () => {
        expect(megoldas.autoSzamolas).toBe(4);
    });

    it("Statisztika", async () => {
        expect(megoldas.stat).toStrictEqual(autokStatisztika);
    });

    it("Legtöbb kilométert tett meg", async () => {
        expect(megoldas.legtobbKilometer).toBe("Leghosszabb út: 1551 km, személy: 506");
    });

    it("Menetlevél állomány összehasonlitás", async () => {
        megoldas.fajlbaIras("CEG304_menetlevel.txt", "CEG304");
        expect(fs.readFileSync("CEG304_menetlevelTest.txt").toString()).toBe(fs.readFileSync("CEG304_menetlevel.txt").toString());
    });
});
