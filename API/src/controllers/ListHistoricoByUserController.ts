import { Response, Request } from "express";
import { ListHistoricoByUserService } from "../services/ListHistoricoByUserService";

class ListHistoricoByUserController {

    async handle(request: Request, response: Response) {
        //pegando a requisição, fazendo a desestruturação do que tem dentro do request.body para pegar direto pelo nome do parametro que esta vindo
        const { user_id } = request;

        //criando a instancia da classe services
        const listHistoricoByUserService = new ListHistoricoByUserService();

        //enviando a requisição para classe services com os dados necessarios, para executar a função execute, e guardar nessa const
        const Historico_byID = await listHistoricoByUserService.execute(user_id);

        //retornando o resultado da função
        return response.json(Historico_byID);

    }
}
export { ListHistoricoByUserController }