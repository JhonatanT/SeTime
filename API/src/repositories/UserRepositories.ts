import { EntityRepository, Repository } from "typeorm"
import { User } from "../entities/User"

@EntityRepository(User)

//quando eu extendo minha classe Repository tenho acesso a todos os metodos da classe (extend permite que extenda metodos de outras classes) (implement precisa importar os metodos da interface porem eu consigo manipular e alterar esses dados do jeito que quiser)
class UsersRepositories extends Repository<User> {

}

export { UsersRepositories }