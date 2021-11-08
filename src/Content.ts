import fs from "fs"; //  https://nodejs.org/docs/latest-v14.x/api/fs.html
import http from "http"; //  https://nodejs.org/docs/latest-v14.x/api/http.html
import url from "url"; //  https://nodejs.org/docs/latest-v14.x/api/url.html
import Megoldas from "./Megoldas";

export default class Content {
    public static content(req: http.IncomingMessage, res: http.ServerResponse): void {
        if (req.url === "/favicon.ico") {
            res.writeHead(200, { "Content-Type": "image/x-icon" });
            fs.createReadStream("favicon.ico").pipe(res);
            return;
        }

        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write("<!DOCTYPE html>");
        res.write("<html lang='hu'>");
        res.write("<head>");
        res.write("<meta charset='utf-8'>");
        res.write("<style>input, pre {font-family:monospace; font-size:1em; font-weight:bold;}</style>");
        res.write("<meta name='viewport' content='width=device-width, initial-scale=1.0'>");
        res.write("<title>Céges autók</title>");
        res.write("</head>");
        res.write("<body><form><pre>");

        const params = new url.URL(req.url as string, `http://${req.headers.host}/`).searchParams;

        const megoldas: Megoldas = new Megoldas("autok.txt");

        res.write(`0. feladat:\n${megoldas.fajlKiiras()}`);

        res.write(`2. feladat:${megoldas.utolsoAuto} \n`);

        let nap = parseInt(params.get("nap") as string);
        if (isNaN(nap)) nap = 4;
        res.write(`<label>3. feladat:\n Nap: <input type='number' name='nap' value=${nap} style='max-width:100px;' onChange='this.form.submit();'></label>\n`);
        res.write(`Forgalom a ${nap}. napon\n`);

        res.write(megoldas.forgalom(nap));

        res.write(`4. feladat: A hónap végén ${megoldas.autoSzamolas} autót nem hoztak vissza!\n`);
        res.write(`5. feladat:\n`);
        res.write(megoldas.stat);
        res.write(`6. feladat: ${megoldas.legtobbKilometer} \n`);

        let rendszam = params.get("rendszam") as string;
        if (rendszam == null) rendszam = "CEG304";
        res.write(`<label>7. feladat: Rendszám: <input type='text' name='rendszam' value=${rendszam} style='max-width:100px;' onChange='this.form.submit();'></label>\n`);
        if (megoldas.fajlbaIras(rendszam + "_menetlevel.txt", rendszam)) {
            res.write(`Menetlevél kész!\n`);
        }
        res.write(`8. feladat:\n${megoldas.fajlKiiras()}`);
        res.write("</pre></form></body></html>");
        res.end();
    }
}
