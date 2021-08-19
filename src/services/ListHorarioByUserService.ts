import { getCustomRepository } from "typeorm"
import { HorariosRepositories } from "../repositories/HorariosRepositories";

class ListHorarioByUserService {
    async execute(user_id: string) {

        //instaciando a classe repositories para poder acessar a tabela de horario
        const horariosRepositories = getCustomRepository(HorariosRepositories);

        //pesquisando se na tabela de horarios todos os horarios do Usuario logado
        const Hor_ByID = await horariosRepositories.find({
            where: {
                FK_ID_usu: user_id
            }
        });

        return Hor_ByID;
    }
}
export { ListHorarioByUserService }