import { EntityRepository, Repository } from "typeorm"
import { Horarios } from "../entities/Horarios"

@EntityRepository(Horarios)
class HorariosRepositories extends Repository<Horarios>{

}

export { HorariosRepositories }