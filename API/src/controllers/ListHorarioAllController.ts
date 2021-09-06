import { Response, Request } from "express";
import { ListHorariosPendentesService } from "../services/ListHorariosPendentesService"

class ListHorarioAllController {

    async handle(request: Request, response: Response) {

        //criando a instancia da classe services
        const listHorariosPendentesService = new ListHorariosPendentesService();

        //enviando a requisição para classe services para executar a função execute, e guardar nessa const
        const HorAllC = await listHorariosPendentesService.execute();

        //retornando o resultado da função
        return response.json(HorAllC);

    }

}
export { ListHorarioAllController }


