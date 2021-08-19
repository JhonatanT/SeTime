import { Response, Request } from "express";
import { ListHorarioAllService } from "../services/ListHorarioAllService"

class ListHorarioAllController {

    async handle(request: Request, response: Response) {

        //criando a instancia da classe services
        const listHorarioAllService = new ListHorarioAllService();

        //enviando a requisição para classe services para executar a função execute, e guardar nessa const
        const HorAllC = await listHorarioAllService.execute();

        //retornando o resultado da função
        return response.json(HorAllC);

    }

}
export { ListHorarioAllController }


