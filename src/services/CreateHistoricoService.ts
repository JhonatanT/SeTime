import { getCustomRepository } from "typeorm"
import { HistoricoRepositories } from "../repositories/HistoricoRepositories"
import { HorariosRepositories } from "../repositories/HorariosRepositories";
import { UsersRepositories } from "../repositories/UserRepositories";

interface IHistoricoRequest {
    ID_horario: string;

    FK_ID_usu: string;

    nome_cliente: string;

    descricao_pedido: string;

    preco: Number;

    data_pedido: Date;

    horario: string;

    troco: string;

    concluido: boolean;
}
class CreateHistoricoService {

    async execute({ ID_horario, FK_ID_usu, nome_cliente, descricao_pedido, preco, data_pedido, horario, troco, concluido }: IHistoricoRequest) {

        const historicoRepositories = getCustomRepository(HistoricoRepositories);


        //instaciando a classe repositories para poder acessar a tabela de horario
        const horariosRepositories = getCustomRepository(HorariosRepositories);

        //pesquisando na tabela se o horario existe
        const horarioExist = await horariosRepositories.findOne(ID_horario);

        //caso não exista não salva
        if (!horarioExist) {
            throw new Error("Horario não existe")
        }

        //instaciando a classe repositories para poder acessar a tabela de usuario
        const userRepositories = getCustomRepository(UsersRepositories);

        //pesquisando na tabela se o usuario existe
        const UserExist = await userRepositories.findOne(FK_ID_usu);

        //se não existir não salva
        if (!UserExist) {
            throw new Error("Usuario não cadastrado");
        }


        //caso tudo esteja certo salva
        const his = historicoRepositories.create({
            ID_horario,
            FK_ID_usu,
            nome_cliente,
            descricao_pedido,
            preco, data_pedido,
            horario,
            troco,
            concluido
        });

        await historicoRepositories.save(his);

        //recuperando valores salvos
        return his;

    }

}

export { CreateHistoricoService }