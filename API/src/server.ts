import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors"
import { router } from "./routes";
import cors from "cors"
//por padrão o js quando utiliza import "./nome da classe" se estiver dentro da classe um arquivo index ele ja identifica (quando o arquivo é index n precisa colocar no import)
import "./database";

const app = express();

//cors habilita outras fontes que não seja aplicações back end acesse essa aplicação 
app.use(cors());
//app.use(cors({
//origin:"" caso eu queira q somente um ip tenha acesso ao back end
//}));


//passando para o express habilitar o json
app.use(express.json());

//inserindo todas minhas rotas no express
app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {

    //verificando se o erro é uma instancia da classe Error se for retorna um Status
    if (err instanceof Error) {
        return response.status(400).json({
            error: err.message
        });
    }

    return response.status(500).json({
        status: "error",
        message: "erro interno"
    });

})

//http://localhost:3030
app.listen(3030, () => console.log("Server is route 3030"));

