import Autok from "../Autok";
import fs from "fs";

describe("Megoldas osztály unit tesztje", () => {
    const autok: Autok = new Autok("1 08:45 CEG306 501 23989 0");

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
});
