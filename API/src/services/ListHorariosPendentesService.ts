import { getCustomRepository } from "typeorm";
import { HorariosRepositories } from "../repositories/HorariosRepositories"
import { classToPlain } from "class-transformer"

class ListHorariosPendentesService {
    async execute() {

        //instaciando a classe repositories para poder acessar a tabela de horario
        const horarioRepositories = getCustomRepository(HorariosRepositories)

        //pesquisando se na tabela de horario todos os horarios
        const HorAll = await horarioRepositories.find();

        //a propriedade classToPlain vai dentro da entidade de horario, ela vai criar novos objetos a partir dos objeto ja existentes no typeorm
        //e adionar o objeto algoCustom que coloquei na entidade Historico
        return classToPlain(HorAll);
    }
}
export { ListHorariosPendentesService }