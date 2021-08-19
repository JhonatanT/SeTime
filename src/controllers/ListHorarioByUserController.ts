import { Response, Request } from "express";
import { ListHorarioByUserService } from "../services/ListHorarioByUserService";

class ListHorarioByUserController {

    async handle(request: Request, response: Response) {

        //pegando a requisição, fazendo a desestruturação do que tem dentro do request.body para pegar direto pelo nome do parametro que esta vindo
        const { user_id } = request;

        //criando a instancia da classe services
        const listHorarioByUserService = new ListHorarioByUserService();

        //enviando a requisição para classe services com os dados necessarios, para executar a função execute, e guardar nessa const
        const Horario_byID = await listHorarioByUserService.execute(user_id);

        //retornando o resultado da função
        return response.json(Horario_byID);

    }
}
export { ListHorarioByUserController }