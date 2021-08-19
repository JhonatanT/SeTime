import { Request, Response } from "express"
import { CreateUserService } from "../services/CreateUserService";


class CreateUserController {

    async handle(request: Request, response: Response) {

        //pegando a requisição, fazendo a desestruturação do que tem dentro do request.body para pegar direto pelo nome do parametro que esta vindo
        const { usuario, senha, admin } = request.body;

        //criando a instancia da classe services
        const createUserService = new CreateUserService();

        //enviando a requisição para classe services com os dados necessarios
        const user = await createUserService.execute({ usuario, senha, admin });

        return response.json(user);

    }

}

export { CreateUserController }