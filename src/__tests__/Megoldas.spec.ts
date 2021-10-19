import Megoldas from "../Megoldas";
import fs from "fs";

describe("Megoldas osztály unit tesztje", () => {
    const megoldas: Megoldas = new Megoldas("autok.txt");
    const autokForgalom: string[] = ["12:50;CEG303;561;Ki", "19:17;CEG308;552;Be"];

    it("Megoldas osztálypéldány ellenörzése", async () => {
        expect(megoldas).toBeInstanceOf(Megoldas);
    });

    it("Autók száma", async () => {
        expect(megoldas.UtolsoAuto).toBe("30. nap, rendszám CEG300");
    });

    it("Forgalom", async () => {
        expect(megoldas.Forgalom(4)).toStrictEqual(autokForgalom);
    });

    it("Nem visszahozott autók", async () => {
        expect(megoldas.Autoszamolas).toBe(4);
    });

    it("Legtöbb kilométert tett meg", async () => {
        expect(megoldas.Legtobbkilometer).toBe("Leghosszabb út: 1551 km, személy: 506");
    });

    it("Menetlevél állomány összehasonlitás", async () => {
        megoldas.FajlbaIras("CEG304_menetlevel.txt", "CEG304");
        expect(fs.readFileSync("CEG304_menetlevelTest.txt").toString()).toBe(fs.readFileSync("CEG304_menetlevel.txt").toString());
    });
});
