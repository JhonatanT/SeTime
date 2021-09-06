import { getCustomRepository, IsNull } from "typeorm"
import { stringify } from "uuid";
import { HorariosRepositories } from "../repositories/HorariosRepositories";

class ListHorarioByUserService {
    async execute(user_id: string) {

        //instaciando a classe repositories para poder acessar a tabela de horario
        const horariosRepositories = getCustomRepository(HorariosRepositories);

        const FK_ID_usu = user_id;

        //pesquisando se na tabela de horarios todos os horarios do Usuario logado
        const Hor_ByID = await horariosRepositories.find(
            { where: { FK_ID_usu } }
        );
        return Hor_ByID;
    }
}
export { ListHorarioByUserService }