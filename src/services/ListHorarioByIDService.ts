import { getCustomRepository } from "typeorm"
import { HorariosRepositories } from "../repositories/HorariosRepositories"

class ListHorarioByIDService {
    async execute(id: string) {

        const horariosRepositories = getCustomRepository(HorariosRepositories);

        const HorByIdHor = await horariosRepositories.findOne(id);

        if (!HorByIdHor) {
            throw new Error("Esse Horario não existe");
        }

        return HorByIdHor;
    }
}
export { ListHorarioByIDService }