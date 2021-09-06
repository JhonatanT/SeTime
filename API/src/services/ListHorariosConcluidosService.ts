import { getCustomRepository } from "typeorm"
import { HistoricoRepositories } from "../repositories/HistoricoRepositories";

class ListHorariosConcluidosService {
    async execute() {

        //instaciando a classe repositories para poder acessar a tabela de historico 
        const historicoRepositories = getCustomRepository(HistoricoRepositories);

        //pesquisando se na tabela de historico todos os horarios ja concluidos
        const HistAll = await historicoRepositories.find();

        return HistAll;

    }
}
export { ListHorariosConcluidosService }