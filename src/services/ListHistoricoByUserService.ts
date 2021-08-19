import { getCustomRepository } from "typeorm"
import { HistoricoRepositories } from "../repositories/HistoricoRepositories";


class ListHistoricoByUserService {
    async execute(user_id: string) {

        //instaciando a classe repositories para poder acessar a tabela de horario
        const historicoRepositories = getCustomRepository(HistoricoRepositories);

        //pesquisando se na tabela de historico todos os horarios ja concluidos do Usuario logado
        const Hist_ByID = await historicoRepositories.find({
            where: {
                FK_ID_usu: user_id
            }
        });

        return Hist_ByID;
    }
}
export { ListHistoricoByUserService }