import { EntityRepository, Repository } from "typeorm"
import { Historico } from "../entities/Historico"

@EntityRepository(Historico)
class HistoricoRepositories extends Repository<Historico> {

}

export { HistoricoRepositories }