import { Response, Request } from "express";
import { ListHorariosConcluidosService } from "../services/ListHorariosConcluidosService";

class ListHorariosConcluidosController {

    async handle(request: Request, response: Response) {

        //criando a instancia da classe services
        const listHorariosConcluidosService = new ListHorariosConcluidosService();

        //enviando a requisição para classe services para executar a função execute, e guardar nessa const
        const HistAllC = await listHorariosConcluidosService.execute();

        //retornando o resultado da função
        return response.json(HistAllC);
    }

}
export { ListHorariosConcluidosController }