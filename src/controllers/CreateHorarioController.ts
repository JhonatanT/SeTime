import { Response, Request } from "express";
import { CreateHorarioService } from "../services/CreateHorarioService"

class CreateHorarioController {
    async handle(request: Request, response: Response) {

        //pegando a requisição, fazendo a desestruturação do que tem dentro do request.body para pegar direto pelo nome do parametro que esta vindo
        const { FK_ID_usu, nome_cliente, descricao_pedido, preco, data_pedido, horario, troco } = request.body

        //criando a instancia da classe services
        const createHorarioService = new CreateHorarioService();

        //enviando a requisição para classe services com os dados necessarios
        //sempre que a função retornar uma promise tem que usar o await, caso não retorne uma promise não precisa ultilizar o await
        const hora = await createHorarioService.execute({ FK_ID_usu, nome_cliente, descricao_pedido, preco, data_pedido, horario, troco });

        return response.json(hora);
    }
}
export { CreateHorarioController }