import fs from "fs"; //  https://nodejs.org/docs/latest-v14.x/api/fs.html
import http from "http"; //  https://nodejs.org/docs/latest-v14.x/api/http.html
import url from "url"; //  https://nodejs.org/docs/latest-v14.x/api/url.html
import Megoldas from "./Megoldas";

export default class Content {
    public static content(req: http.IncomingMessage, res: http.ServerResponse): void {
        // favicon.ico kérés kiszolgálása:
        if (req.url === "/favicon.ico") {
            res.writeHead(200, { "Content-Type": "image/x-icon" });
            fs.createReadStream("favicon.ico").pipe(res);
            return;
        }
        // Weboldal inicializálása + head rész:
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write("<!DOCTYPE html>");
        res.write("<html lang='hu'>");
        res.write("<head>");
        res.write("<meta charset='utf-8'>");
        res.write("<style>input, pre {font-family:monospace; font-size:1em; font-weight:bold;}</style>");
        res.write("<meta name='viewport' content='width=device-width, initial-scale=1.0'>");
        res.write("<title>Jedlik Ts Template</title>");
        res.write("</head>");
        res.write("<body><form><pre>");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const params = new url.URL(req.url as string, `http://${req.headers.host}/`).searchParams;

        // Kezd a kódolást innen -->

        const megoldas: Megoldas = new Megoldas("autok.txt");

        res.write(`4. feladat: A hónap végén ${megoldas.Autoszamolas} autót nem hoztak vissza!\n`);

        res.write(`2. feladat:${megoldas.UtolsoAuto} \n`);

        const nap = parseInt(params.get("nap") as string);
        res.write(`<label>3. feladat:\n Nap: <input type='number' name='nap' value=${nap} style='max-width:100px;' onChange='this.form.submit();'></label>\n`);
        res.write(`Forgalom a ${nap}. napon\n`);
        for (const item of megoldas.Forgalom(nap)) {
            res.write(item.split(`;`)[0] + " " + item.split(`;`)[1] + " " + item.split(`;`)[2] + " " + item.split(`;`)[3] + `\n`);
        }
        res.write(`5. feladat\n`);
        for (const adat of megoldas.Statisztika) {
            res.write(adat.rendszam + " " + adat.km + `\n`);
        }

        /*res.write("Egyszerű Hello World! (2021/2022)\n");

        // Tetszőleges html teg-ek és attribútumok beépítése:
        res.write("<span style='color: blue;'><i>Színes és dőlt Hello World!'</i></span>\n");

        
        // Próbáljuk számra konvertálni a "kor" paraméter (http://localhost:8080/?kor=16) értékét:
        let korod = parseInt(params.get("kor") as string);
        // Ha nincs "kor" paraméter megadva, vagy nem lehet számra konvertálni értékét,
        // akkor a "korod" változóba NaN érték kerül, ilyenkor legyen 18 év az értéke:
        if (isNaN(korod)) korod = 18;

        res.write(`<label>Kérem a korod: <input type='number' name='kor' value=${korod} style='max-width:100px;' onChange='this.form.submit();'></label>\n`);
        res.write(`Te ${korod} éves vagy!\n`);*/

        // <---- Fejezd be a kódolást

        res.write("</pre></form></body></html>");
        res.end();
    }
}
