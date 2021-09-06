import { Request, Response } from "express"
import { CreateHistoricoService } from "../services/CreateHistoricoService"

class CreateHistoricoController {

    async handle(request: Request, response: Response) {

        const { ID_horario, FK_ID_usu, nome_cliente, descricao_pedido, preco, data_pedido, horario, troco, concluido } = request.body

        const createHorarioService = new CreateHistoricoService();

        //caso eu queira salvar com id logado seria assim
        //const {user_id} = request;
        //const hist = await createHorarioService.execute({FK_ID_usu:user_id}); assim n precisaria enviar pelo post, pois aqui ja pegaria o logado

        const hist = await createHorarioService.execute({ ID_horario, FK_ID_usu, nome_cliente, descricao_pedido, preco, data_pedido, horario, troco, concluido });

        return response.json(hist);

    }
}

export { CreateHistoricoController }