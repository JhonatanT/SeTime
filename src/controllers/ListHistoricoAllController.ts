import { Response, Request } from "express";
import { ListHistoricoAllServices } from "../services/ListHistoricoAllServices";

class ListHistoricoAllController {

    async handle(request: Request, response: Response) {

        //criando a instancia da classe services
        const listHistoricoAllService = new ListHistoricoAllServices();

        //enviando a requisição para classe services para executar a função execute, e guardar nessa const
        const HistAllC = await listHistoricoAllService.execute();

        //retornando o resultado da função
        return response.json(HistAllC);
    }

}
export { ListHistoricoAllController }