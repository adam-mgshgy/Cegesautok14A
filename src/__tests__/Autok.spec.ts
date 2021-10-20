import Autok from "../Autok";
import fs from "fs";

describe("Megoldas osztály unit tesztje", () => {
    const autok: Autok = new Autok("1 08:45 CEG306 501 23989 0");
    const autok2: Autok = new Autok("25 18:23 CEG300 888 15236 1");

    it("Nap ellenőrzése", async () => {
        expect(autok.Nap).toBe(1);
    });
    it("Rendszám ellenőrzése", async () => {
        expect(autok.Rendszám).toBe("CEG306");
    });
    it("Ki- és behajtás ellenőrzése", async () => {
        expect(autok.KiBeHajtás).toBe(0);
    });
    it("Idő ellenőrzése", async () => {
        expect(autok.OraPerc).toBe("08:45");
    });
    it("Személyazonosító ellenőrzése", async () => {
        expect(autok.SzemelyAzon).toBe(501);
    });
    it("Km számláló ellenőrzése", async () => {
        expect(autok.kmSzamlalo).toBe(23989);
    });

    it("Nap ellenőrzése 2", async () => {
        expect(autok2.Nap).toBe(25);
    });
    it("Rendszám ellenőrzése 2", async () => {
        expect(autok2.Rendszám).toBe("CEG300");
    });
    it("Ki- és behajtás ellenőrzése 2", async () => {
        expect(autok2.KiBeHajtás).toBe(1);
    });
    it("Idő ellenőrzése 2", async () => {
        expect(autok2.OraPerc).toBe("18:23");
    });
    it("Személyazonosító ellenőrzése 2", async () => {
        expect(autok2.SzemelyAzon).toBe(888);
    });
    it("Km számláló ellenőrzése 2", async () => {
        expect(autok2.kmSzamlalo).toBe(15236);
    });
});
