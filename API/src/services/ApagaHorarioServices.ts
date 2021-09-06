import { getCustomRepository } from "typeorm"
import { HorariosRepositories } from "../repositories/HorariosRepositories"


class ApagaHorarioServices {
    async execute(id: string) {

        const horariosRepositories = getCustomRepository(HorariosRepositories);

        const horarioExist = await horariosRepositories.findOne(id);

        if (!horarioExist) {
            throw new Error("Horario não existe")
        }

        return await horariosRepositories.delete({ id });

    }

}
export { ApagaHorarioServices }